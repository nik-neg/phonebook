import { TransformFnParams } from 'class-transformer';

export const phoneNumbersTransform = ({ value }: TransformFnParams): any => {
  return value[0].split(',').map((phoneNumber: string) => phoneNumber.trim());
};
