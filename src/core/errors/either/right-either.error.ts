import { Either, Right } from '.';

const right = <R>(value: R): Either<never, R> => {
  return new Right(value);
};

export default right;
