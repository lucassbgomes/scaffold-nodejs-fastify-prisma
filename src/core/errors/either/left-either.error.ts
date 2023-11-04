import { Either, Left } from '.';

const left = <L>(value: L): Either<L, never> => {
  return new Left(value);
};

export default left;
