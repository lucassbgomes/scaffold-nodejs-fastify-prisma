import { UseCaseError } from '@/core/types/use-case-error';

class InvalidCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('Invalid credentials');
  }
}

export default InvalidCredentialsError;
