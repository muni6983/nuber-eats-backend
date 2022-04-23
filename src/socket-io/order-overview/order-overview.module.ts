import { Module } from '@nestjs/common';
import { OrderOverviewGateway } from './order-overview.gateway';

@Module({
  providers: [OrderOverviewGateway],
})
export class OrderOverviewModule {}
