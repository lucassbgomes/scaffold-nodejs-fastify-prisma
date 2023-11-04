import { UseCaseError } from '@/core/types/use-case-error';

class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found');
  }
}

export default ResourceNotFoundError;
