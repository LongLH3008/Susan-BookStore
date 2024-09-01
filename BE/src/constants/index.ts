export enum StatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER_ERROR = 500,
}

export enum ReasonStatusCode {
    OK = 'Success',
    CREATED = 'Created',
    NO_CONTENT = 'No Content',
    BAD_REQUEST = 'Bad Request Error',
    UNAUTHORIZED = 'Unauthorized Error',
    FORBIDDEN = 'Forbidden Error',
    NOT_FOUND = 'Not Found Error',
    CONFLICT = 'Conflict Error',
    VALIDATION_ERROR = 'Validation Error',
    INTERNAL_SERVER_ERROR = 'Internal Server Error',
}