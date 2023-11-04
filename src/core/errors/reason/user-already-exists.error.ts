import { UseCaseError } from '@/core/types/use-case-error';

class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('E-mail already exists');
  }
}

export default UserAlreadyExistsError;
