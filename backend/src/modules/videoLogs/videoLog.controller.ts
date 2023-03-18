import { BadRequestException, Body, Post } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { ApiController, AllowedFor, AccessEnum } from 'src/tools';
import { EmptyResponseDTO } from 'src/types';
import { DataSource } from 'typeorm';

@ApiController('videoLog')
export class VideoLogController {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  @Post('createNew')
  @AllowedFor(AccessEnum.SYSTEM_ADMIN)
  async createVideoLog(
    @Body()
    body: {
      path: string;
    },
  ): Promise<EmptyResponseDTO> {
    const date = parseDateFromRawFilePath(body.path);
    await this.dataSource.query(`
      insert into videos("cam_id","vid_beg","vid_end")
      values (1, '${date.toISOString()}', '${date.toISOString()}')
    `);
    return {};
  }
}

function parseDateFromRawFilePath(rawFilePathOfVideo: string): Date {
  // example of rawFilePathOfVideo is '/home/pi/motion/IPCAM_20230301103014.mp4';
  const regexpForGettingDateParts =
    /_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})(?<hours>\d{2})(?<minutes>\d{2})(?<seconds>\d{2})/;

  const matchResults = rawFilePathOfVideo.match(regexpForGettingDateParts);
  if (!matchResults?.groups)
    throw new BadRequestException(
      'Given http path parameter does not have a date',
    );

  const groups = matchResults.groups;
  if (
    !(
      groups['year'] &&
      groups['month'] &&
      groups['day'] &&
      groups['hours'] &&
      groups['minutes'] &&
      groups['seconds']
    )
  )
    throw new BadRequestException('asd');

  const year = parseInt(groups['year'], 10),
    monthIndex = parseInt(groups['month'], 10) - 1,
    day = parseInt(groups['day'], 10),
    hours = parseInt(groups['hours'], 10),
    minutes = parseInt(groups['minutes'], 10),
    seconds = parseInt(groups['seconds'], 10);

  return new Date(year, monthIndex, day, hours, minutes, seconds);
}
