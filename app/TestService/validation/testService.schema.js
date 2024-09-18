import Joi from "joi";

const testServiceSchema = Joi.object({
      user_Id: Joi.string().allow(null).messages({
        "string.base": "User ID must be a string",
        "any.only": "User ID can only be a string or null",
    }),
  
    operation: Joi.string().min(3).max(1800).allow(null).messages({
        "string.base": "Operation must be a string",
        "string.min": "Operation must be at least {#limit} characters long",
        "string.max": "Operation cannot exceed {#limit} characters",
        "any.only": "Operation can only be a string or null",
    }),
}).options({ abortEarly: false, allowUnknown: false });

export default testServiceSchema;
