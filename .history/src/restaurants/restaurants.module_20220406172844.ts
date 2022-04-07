import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';

@Module({
  // imports: [TypeOrmModule.forFeature([User])],
  providers: [RestaurantsService],
  // exports: [UserService],
})
export class RestaurantsModule {}
