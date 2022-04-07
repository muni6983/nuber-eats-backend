import { Controller, Get } from '@nestjs/common';

@Controller('/')
// extends RestController(UserService)
export class RestaurantsController {
  @Get()
  getAll() {
    return this.service.getAll();
  }

  // @Get('/:id')
  // getUserById(@Param('id') id: string) {
  //   return this.service.getUserById(+id);
  // }
}
