import { MiddlewareConsumer, Module } from '@nestjs/common';
import * as MockServices from './mock';
import { MockDataController } from './mock/mockData.controller';
import { AccessLogMiddleware } from './tools';

import { TypedConfigModule } from './config';
import {
  AccessScopeModule,
  AuthModule,
  InfrastructureModule,
  PredictModule,
  SensorMeasurementModule,
  UserModule,
  VideoLogModule,
} from './modules';
import { ReservoirModule } from './modules/reservoir';

@Module({
  imports: [
    AccessScopeModule,
    AuthModule,
    InfrastructureModule,
    PredictModule,
    ReservoirModule,
    SensorMeasurementModule,
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
