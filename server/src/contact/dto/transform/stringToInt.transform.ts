import { TransformFnParams } from 'class-transformer';

export const stringToIntTransform = ({ value }: TransformFnParams): any => {
  return parseInt(value.value, 10);
};
