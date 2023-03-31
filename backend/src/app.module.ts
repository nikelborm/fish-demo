import { MiddlewareConsumer, Module } from '@nestjs/common';
import * as MockServices from './mock';
import { MockDataController } from './mock/mockData.controller';
import { AccessLogMiddleware } from './tools';

import { TypedConfigModule } from './config';
import {
  AccessScopeModule,
  AlertModule,
  AlertTypeModule,
  AuthModule,
  BehaviorModule,
  BehaviorTypeModule,
  EventModule,
  EventTypeModule,
  FishBatchModule,
  FishKindModule,
  InfrastructureModule,
  PredictModule,
  ReservoirModule,
  SensorMeasurementModule,
  TaskModule,
  TaskTimeModule,
  TaskToReservoirModule,
  UserModule,
  VideoLogModule,
} from './modules';
import { FishInfoModule } from './modules/fishInfo';

@Module({
  imports: [
    AccessScopeModule,
    AlertModule,
    AlertTypeModule,
    AuthModule,
    BehaviorModule,
    BehaviorTypeModule,
    EventModule,
    EventTypeModule,
    FishBatchModule,
    FishInfoModule,
    FishKindModule,
    InfrastructureModule,
    PredictModule,
    ReservoirModule,
    SensorMeasurementModule,
    TaskModule,
    TaskTimeModule,
    TaskToReservoirModule,
    TypedConfigModule,
    UserModule,
    VideoLogModule,
  ],
  controllers: [MockDataController],
  providers: [...Object.values(MockServices)],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AccessLogMiddleware).forRoutes('*');
  }
}
