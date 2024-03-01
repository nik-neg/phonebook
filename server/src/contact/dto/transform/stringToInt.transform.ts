import { TransformFnParams } from 'class-transformer';

export const stringToIntTransform = ({ value }: TransformFnParams): any => {
  const val = parseInt(value.value, 10);
  return !isNaN(val) ? val : 0;
};
