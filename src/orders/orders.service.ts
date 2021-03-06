import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from 'src/restaurants/entities/dish.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User, UserRole } from 'src/users/entites/users.entiy';
import { Repository } from 'typeorm';
import {
  CreateOrderDto,
  CreateOrderOutput,
  EditOrderDto,
  EditOrderOutput,
  GetOrderOutput,
  GetOrdersOutput,
} from './dtos/order.dto';
import { OrderItem } from './entities/order-item.entity';
import { Order, OrderStatus } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemOrderItemRepository: Repository<OrderItem>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,
  ) {}

  async getOrders(user: User, status: OrderStatus): Promise<GetOrdersOutput> {
    let orders: Order[];
    try {
      if (user.role === UserRole.CLIENT) {
        orders = await this.orderRepository.find({
          where: { customer: user, ...(status && { status }) },
        });
      } else if (user.role === UserRole.DELIVERY) {
        orders = await this.orderRepository.find({
          where: { driver: user, ...(status && { status }) },
        });
      } else if (user.role === UserRole.OWNER) {
        const restaurants = await this.restaurantRepository.find({
          where: { owner: user },
          relations: ['orders'],
        });
        orders = restaurants.map((restaurant) => restaurant.orders).flat(1);
        if (status) {
          orders = orders.filter((order) => order.status === status);
        }
      }
      return { ok: true, orders };
    } catch (error) {
      return { ok: false, error: "Couldn't load orders" };
    }
  }

  canSeeOrder(user: User, order: Order): boolean {
    let canSee = true;
    if (user.role === UserRole.CLIENT && order.customerId !== user.id) {
      canSee = false;
    }
    if (user.role === UserRole.DELIVERY && order.driverId !== user.id) {
      canSee = false;
    }
    if (user.role === UserRole.OWNER && order.restaurant.ownerId !== user.id) {
      canSee = false;
    }
    return canSee;
  }

  async getOrder(orderId: number, user: User): Promise<GetOrderOutput> {
    try {
      const order = await this.orderRepository.findOne(orderId, {
        relations: ['restaurant'],
      });
      if (!order) {
        return { ok: false, error: 'Order not found' };
      }

      if (!this.canSeeOrder(user, order)) {
        return { ok: false, error: "You can't see that." };
      }
      return { ok: true, order };
    } catch (error) {
      return { ok: false, error: "Couldn't load order'" };
    }
  }

  async createOrder(
    customer: User,
    { restaurantId, items }: CreateOrderDto,
  ): Promise<CreateOrderOutput> {
    try {
      const restaurant = await this.restaurantRepository.findOne(restaurantId);
      if (!restaurant) {
        return {
          ok: false,
          error: 'Restaurant not found',
        };
      }
      let orderFinalPrice = 0;
      const orderItems: OrderItem[] = [];
      for (const item of items) {
        const dish = await this.dishRepository.findOne(item.dishId);
        if (!dish) {
          return { ok: false, error: 'Dish not found' };
        }
        let dishFinalPrice = dish.price;
        for (const itemOption of item.options) {
          const dishOption = dish.options.find(
            (dishOption) => dishOption.name === itemOption.name,
          );
          if (dishOption) {
            if (dishOption.extra) {
              dishFinalPrice += dishOption.extra;
            } else {
              const dishOptionChoice = dishOption.choices.find(
                (optionChoice) => optionChoice.name === itemOption.choice,
              );
              if (dishOptionChoice.extra) {
                dishFinalPrice += dishOptionChoice.extra;
              }
            }
          }
        }
        orderFinalPrice += dishFinalPrice;

        const orderItem = await this.orderItemOrderItemRepository.save(
          this.orderItemOrderItemRepository.create({
            ...dish,
            options: item.options,
          }),
        );
        orderItems.push(orderItem);
      }

      const order = await this.orderRepository.save(
        this.orderRepository.create({
          customer,
          restaurant,
          items: orderItems,
          total: orderFinalPrice,
        }),
      );
      return { ok: true };
    } catch (error) {
      return { ok: false, error: "Couldn't create order'" };
    }
  }

  async editOrder(
    orderId: number,
    user: User,
    { status }: EditOrderDto,
  ): Promise<EditOrderOutput> {
    try {
      const order = await this.orderRepository.findOne(orderId);
      if (!order) {
        return { ok: false, error: 'Order not found' };
      }
      if (!this.canSeeOrder(user, order)) {
        return { ok: false, error: "You can't see that." };
      }
      let canEdit = true;
      if (user.role === UserRole.CLIENT) {
        canEdit = false;
      }
      if (user.role === UserRole.OWNER) {
        if (status !== OrderStatus.COOKING && status !== OrderStatus.COOKED) {
          canEdit = false;
        }
      }
      if (user.role === UserRole.DELIVERY) {
        if (
          status !== OrderStatus.PICKEDUP &&
          status !== OrderStatus.DELIVERED
        ) {
          canEdit = false;
        }
      }
      if (!canEdit) {
        return { ok: false, error: "You can't edit this'" };
      }
      await this.orderRepository.save([
        {
          id: orderId,
          status,
        },
      ]);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: "Couldn't edit order'" };
    }
  }

  // driver??? order ???????????? ?????? order??? driver ????????? ???????????????
}
