import { Controller, Get } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

@Controller('')
// extends RestController(UserService)
export class RestaurantsController {
  // constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  getAll() {
    // return this.restaurantsService.getAll)
  }

  // @Get('/:id')
  // getUserById(@Param('id') id: string) {
  //   return this.service.getUserById(+id);
  // }
}
