/**
 * Common error type to use instead of 'any'
 */
export interface ErrorWithMessage {
  message: string;
  [key: string]: unknown;
}

/**
 * Helper function to ensure an error has a message property
 */
export function ensureErrorWithMessage(error: unknown): ErrorWithMessage {
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error as ErrorWithMessage;
  }
  
  return { message: String(error) };
}