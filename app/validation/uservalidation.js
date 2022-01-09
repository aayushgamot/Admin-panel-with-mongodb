const Joi = require("@hapi/joi");

function loginValidate(req) {
  const schema = Joi.object({
    email: Joi.string().required().empty().email().messages({
      "string.base": `email should be a type of 'text'`,
      "string.empty": `email cannot be an empty field`,
      "string.email": `email format not valid`,
      "any.required": `email is a required field`,
    }),
    password: Joi.string().required().empty().min(6).max(16).messages({
      "string.base": `password should be a type of 'text'`,
      "string.empty": `password cannot be an empty field`,
      "string.min": "password should be of minimum 6 characters",
      "string.max": "password should be of maximum 16 characters",
      "any.required": `password is a required field`,
    }),
  });
  const options = {
    abortEarly: false, // include all errors
  };
  return schema.validate(req, options);
}
function ragister(req12) {
  const schema = Joi.object({
    surname: Joi.string().empty().required().messages({
      "string.base": `surname should be a type of 'text'`,
      "string.empty": `surname cannot be an empty field`,
      "any.required": `surname is a required field`,
    }),
    name: Joi.string().empty().required().messages({
      "string.base": `name should be a type of 'text'`,
      "string.empty": `name cannot be an empty field`,
      "any.required": `name is a required field`,
    }),
    number: Joi.string()
      .pattern(/^[0-9]+$/)
      .length(10)
      .required()
      .empty()
      .messages({
        "string.base": `number should be a type of 'text'`,
        "string.empty": `number cannot be an empty field`,
        "any.required": `number is a required field`,
        "string.pattern.base": `enter only numbers`,
      }),
    email: Joi.string().required().empty().email().messages({
      "string.base": `email should be a type of 'text'`,
      "string.empty": `email cannot be an empty field`,
      "string.email": `email format not valid`,
      "any.required": `email is a required field`,
    }),
    password: Joi.string().required().empty().messages({
      "string.base": `password should be a type of 'text'`,
      "string.empty": `password cannot be an empty field`,
      "any.required": `password is a required field`,
    }),
    passwordone: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .empty()
      .messages({
        "string.base": `password should be a type of 'text'`,
        "string.empty": `password cannot be an empty field`,
        "any.required": `password is a required field`,
        "any.only": `password does not match`,
      }),
    gender: Joi.required().empty().messages({
      "string.base": `gender should be a type of 'text'`,
      "string.empty": `gender cannot be an empty field`,
      "any.required": `gender is a required field`,
    }),
    selectcountry: Joi.required().empty().messages({
      "string.base": `country should be a type of 'text'`,
      "string.empty": `country cannot be an empty field`,
      "any.required": `country is a required field`,
    }),
    hoby: Joi.required().empty().messages({
      "string.base": `hoby should be a type of 'text'`,
      "string.empty": `hoby cannot be an empty field`,
      "any.required": `hoby is a required field`,
    }),
    image: Joi.optional(),
  });
  return schema.validate(req12);
}

function passwordValidate(req) {
  const schema = Joi.object({
    email: Joi.string().required().empty().email().messages({
      "string.base": `email should be a type of 'text'`,
      "string.empty": `email cannot be an empty field`,
      "string.email": `email format not valid`,
      "any.required": `email is a required field`,
    }),
  });
  return schema.validate(req);
}

function newPasswordValidate(req11) {
  const schema = Joi.object({
    password: Joi.string().required().empty().min(6).max(16).messages({
      "string.base": `password should be a type of 'text'`,
      "string.empty": `password cannot be an empty field`,
      "string.min": "password should be of minimum 6 characters",
      "string.max": "password should be of maximum 16 characters",
      "any.required": `password is a required field`,
    }),
    confirm_password: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "string.base": `confirm password should be a type of 'text'`,
        "any.only": "confirm password doesn't match password",
        "any.required": `confirm password is a required field`,
      }),
  });
  return schema.validate(req11);
}

function updateviewprofiles(req15) {
  const schema = Joi.object({
    surname: Joi.string().empty().required().messages({
      "string.base": `surname should be a type of 'text'`,
      "string.empty": `surname cannot be an empty field`,
      "any.required": `surname is a required field`,
    }),
    name: Joi.string().empty().required().messages({
      "string.base": `name should be a type of 'text'`,
      "string.empty": `name cannot be an empty field`,
      "any.required": `name is a required field`,
    }),
    number: Joi.string()
      .pattern(/^[0-9]+$/)
      .length(10)
      .required()
      .empty()
      .messages({
        "string.base": `number should be a type of 'text'`,
        "string.empty": `number cannot be an empty field`,
        "any.required": `number is a required field`,
        "string.pattern.base": `enter only numbers`,
      }),
    email: Joi.string().required().empty().email().messages({
      "string.base": `email should be a type of 'text'`,
      "string.empty": `email cannot be an empty field`,
      "string.email": `email format not valid`,
      "any.required": `email is a required field`,
    }),
    gender: Joi.required().empty().messages({
      "string.base": `gender should be a type of 'text'`,
      "string.empty": `gender cannot be an empty field`,
      "any.required": `gender is a required field`,
    }),
    selectcountry: Joi.required().empty().messages({
      "string.base": `country should be a type of 'text'`,
      "string.empty": `country cannot be an empty field`,
      "any.required": `country is a required field`,
    }),
    hoby: Joi.required().empty().messages({
      "string.base": `hoby should be a type of 'text'`,
      "string.empty": `hoby cannot be an empty field`,
      "any.required": `hoby is a required field`,
    }),
    image: Joi.optional(),
  });
  return schema.validate(req15);
}

function resetpValidate(req) {
  const schema = Joi.object({
    current_password: Joi.string().empty().required().messages({
      "string.base": `password should be a type of 'text'`,
      "string.empty": `password cannot be an empty field`,
      "any.required": `password is a required field`,
    }),
    password: Joi.string().required().empty().min(6).max(16).messages({
      "string.base": `password should be a type of 'text'`,
      "string.empty": `password cannot be an empty field`,
      "string.min": "password should be of minimum 6 characters",
      "string.max": "password should be of maximum 16 characters",
      "any.required": `password is a required field`,
    }),
    confirm_password: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "string.base": `confirm password should be a type of 'text'`,
        "any.only": "confirm password doesn't match password",
        "any.required": `confirm password is a required field`,
      }),
  });

  return schema.validate(req);
}

module.exports = {
  ragister,
  passwordValidate,
  newPasswordValidate,
  loginValidate,
  updateviewprofiles,
  resetpValidate,
};
