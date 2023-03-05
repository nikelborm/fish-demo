import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { Column, ColumnOptions } from 'typeorm';

export function NestedDTO<T>(
  DTOClassConstructor: () => {
    new (): T;
  },
): PropertyDecorator {
  return applyDecorators(
    IsDefined(),
    ValidateNested(),
    Type(DTOClassConstructor),
  );
}
