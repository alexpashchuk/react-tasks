import { ValidationError } from 'yup';

export const isValidationError = (e: unknown): e is ValidationError => e instanceof ValidationError;

export const getValidationMessages = (errors: ValidationError): Record<string, string> => {
  const validationErrors: Record<string, string> = {};

  if (errors.inner.length === 0 && errors.path) {
    validationErrors[errors.path] = errors.message;
    return validationErrors;
  }

  errors.inner.forEach((error) => {
    const { path, message } = error;

    if (message.startsWith('no-unknown-keys:') && !path) validationErrors['unknown-fields'] = message;

    if (path) validationErrors[path] = message;
  });

  return validationErrors;
};
