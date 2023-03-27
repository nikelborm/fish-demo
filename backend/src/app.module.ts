import { MiddlewareConsumer, Module } from '@nestjs/common';
import * as MockServices from './mock';
import { MockDataController } from './mock/mockData.controller';
import { AccessLogMiddleware } from './tools';

import { TypedConfigModule } from './config';
import {
  AccessScopeModule,
  AuthModule,
  AlertModule,
  AlertTypeModule,
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
  EventModule,
  TaskModule,
  TaskTimeModule,
  BehaviorModule,
} from './modules';
import { FishInfoModule } from './modules/fishInfo';

@Module({
  imports: [
    AccessScopeModule,
    AuthModule,
    AlertModule,
    AlertTypeModule,
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
    EventModule,
    TaskModule,
    TaskTimeModule,
    BehaviorModule,
    FishInfoModule,
  ],
  controllers: [MockDataController],
  providers: [...Object.values(MockServices)],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AccessLogMiddleware).forRoutes('*');
  }
}
