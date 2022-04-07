// import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
// import { Restaurant } from './entities/restaurant.entity';

// @Resolver((of) => Restaurant)
// export class RestaurantResolver {
//   @Query((returns) => [Restaurant])
//   restaurant(@Args('veganOnly') veganOnly: Boolean): Restaurant[] {
//     return [];
//   }

//   @Mutation((returns) => Boolean)
//   createRestaurant(@Args() createRestaurantDto: CreateRestaurantDto): boolean {
//     console.log('createRestaurantDto : ', createRestaurantDto);
//     return true;
//   }
// }
