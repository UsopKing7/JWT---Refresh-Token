export const formatError = (error: unknown): string => 
  error instanceof Error 
    ? error.message || error.stack || error.name 
    : String(error)

