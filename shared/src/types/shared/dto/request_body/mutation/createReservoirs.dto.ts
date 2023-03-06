import { IsString, MaxLength, MinLength } from 'class-validator';
import * as sas from '../../../../../types';
import { join} from 'path';
import { readFileSync } from 'fs';

export class CreateReservoirDTO {
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  name!: string;
}
console.log();
console.log('sas: ', sas);
console.log('CreateReservoirDTO: ', CreateReservoirDTO);
// console.log('NestedArrayDTO: ', NestedArrayDTO);
console.log('__dirname: ', __dirname);
console.log('join(__dirname, "../../../../../tools/shared"): ', join(__dirname, "../../../../../tools/shared"));

const sdf = readFileSync(join(__dirname, "../../../../../tools/shared/index.js"));
console.log('sdf: ', sdf.toString());

const asd = require(join(__dirname, "../../../../../tools/shared/index.js"));
console.log('asd : ', asd );

export class CreateReservoirsDTO {
  // @NestedArrayDTO(() => CreateReservoirDTO)
  reservoirs!: CreateReservoirDTO[];
}
