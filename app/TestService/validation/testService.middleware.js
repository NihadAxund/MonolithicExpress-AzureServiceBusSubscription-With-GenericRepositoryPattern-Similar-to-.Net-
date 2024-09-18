

import { validationHandlerMiddleware } from "../../../shared/core/validation-handler-middleware.js";
import testServiceSchema from "./testService.schema.js";



export const testServiceSchemaMiddleware = async (
    request,
    response,
    next
) =>
    validationHandlerMiddleware(testServiceSchema, request, response, next);
