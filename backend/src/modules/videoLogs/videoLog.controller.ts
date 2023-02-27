import { Body, Post } from '@nestjs/common';
import { ApiController } from 'src/tools';
import { EmptyResponseDTO } from 'src/types';

@ApiController('video')
export class VideoLogController {
  @Post('new')
  // @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createVideoLog(
    @Body()
    body: string,
  ): Promise<EmptyResponseDTO> {
    console.log(body);
    return body;
  }
}
