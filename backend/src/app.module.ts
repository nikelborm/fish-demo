import { MiddlewareConsumer, Module } from '@nestjs/common';
import * as MockServices from './mock';
import { MockDataController } from './mock/mockData.controller';
import { AccessLogMiddleware } from './tools';

import { TypedConfigModule } from './config';
import {
  AccessScopeModule,
  AuthModule,
  InfrastructureModule,
  SensorMeasurementModule,
  UserModule,
} from './modules';

@Module({
  imports: [
    InfrastructureModule,
    TypedConfigModule,
    AccessScopeModule,
    AuthModule,
    UserModule,
    SensorMeasurementModule,
  ],
  controllers: [MockDataController],
  providers: [...Object.values(MockServices)],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AccessLogMiddleware).forRoutes('*');
  }
}
