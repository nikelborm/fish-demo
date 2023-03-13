export enum SensorParameterValueTypenameEnum {
  NUMBER = 'number',
  STRING = 'string',
}

type SimpleNumberType = {
  __typename: SensorParameterValueTypenameEnum.NUMBER;
  value: number;
};

type SimpleStringType = {
  __typename: SensorParameterValueTypenameEnum.STRING;
  value: string;
};

export type SensorParameterValueTypeHolder =
  | SimpleNumberType
  | SimpleStringType;

export type SensorParameterValueType = SensorParameterValueTypeHolder['value'];
