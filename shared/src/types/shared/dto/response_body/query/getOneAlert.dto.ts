import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class GetOneAlertByIdResponceDTO {
@IsNumber()
id!: number;

@IsNumber()
reservoir_id!: number;

@IsNumber()
alert_type_id!: number;

@IsNumber()
importance!: number;

@Type(() => Date)
@IsDate()
createdAt!: Date;

@Type(() => Date)
@IsDate()
updatedAt!: Date;

}
