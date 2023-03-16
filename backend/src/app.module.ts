import { MiddlewareConsumer, Module } from '@nestjs/common';
import * as MockServices from './mock';
import { MockDataController } from './mock/mockData.controller';
import { AccessLogMiddleware } from './tools';

import { TypedConfigModule } from './config';
import {
  AccessScopeModule,
  AuthModule,
  EventTypeModule,
  FishKindModule,
  InfrastructureModule,
  PredictModule,
  ReservoirModule,
  SensorMeasurementModule,
  UserModule,
  VideoLogModule,
  FishBatchModule,
  BehaviorTypeModule,
} from './modules';

@Module({
  imports: [
    AccessScopeModule,
    AuthModule,
    FishKindModule,
    InfrastructureModule,
    PredictModule,
    ReservoirModule,
    SensorMeasurementModule,
    TypedConfigModule,
    UserModule,
    VideoLogModule,
    EventTypeModule,
    FishBatchModule,
    BehaviorTypeModule,
  ],
  controllers: [MockDataController],
  providers: [...Object.values(MockServices)],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AccessLogMiddleware).forRoutes('*');
  }
}
