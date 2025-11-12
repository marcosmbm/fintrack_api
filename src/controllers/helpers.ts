export function makeHttpResponse<T = unknown>(statusCode: number, body: T) {
  return { statusCode, body };
}

export function badRequest(body: unknown) {
  return makeHttpResponse(400, body);
}

export function internalServerError(body: unknown) {
  return makeHttpResponse(500, body);
}

export function errorHandler(error: unknown) {
  if (error instanceof Error) return badRequest({ message: error.message });

  return internalServerError({ message: "Internal server error." });
}

export function created<T = unknown>(body: T) {
  return makeHttpResponse(201, body);
}

export function ok<T = unknown>(body: T) {
  return makeHttpResponse(200, body);
}
