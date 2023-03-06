import { Type } from 'class-transformer';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { combineDecorators } from '../combineDecorators';

function NestedArrayDTO<T>(
  DTOClassConstructor: () => {
    new (): T;
  },
): PropertyDecorator {
  return combineDecorators(
    IsDefined(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(DTOClassConstructor),
  );
}
console.log('NestedArrayDTO: ', NestedArrayDTO);

export {NestedArrayDTO};
