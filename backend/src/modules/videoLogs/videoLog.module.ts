import { Module } from '@nestjs/common';
import { VideoLogController } from './videoLog.controller';

@Module({
  controllers: [VideoLogController],
})
export class VideoLogModule {}
