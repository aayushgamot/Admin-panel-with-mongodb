const Joi = require("@hapi/joi");

function validationtestimonual(testimonual) {
  const schema = Joi.object({
    name: Joi.string().required().empty().messages({
      "string.base": `name should be a type of 'text'`,
      "string.empty": `name cannot be an empty field`,
      "any.required": `name is a required field`,
    }),
    email: Joi.string().email().required().empty().messages({
      "string.base": `email should be a type of 'text'`,
      "string.empty": `email cannot be an empty field`,
      "string.Email": `email format not valid`,
      "any.required": `email is a required field`,
    }),

    address: Joi.string().empty().required().messages({
      "string.empty": `massage cannot be an empty field`,
      "string.massage": `massage format not valid`,
      "any.required": `massage is a required field`,
    }),

    number: Joi.string()
      .pattern(/^[0-9]+$/)
      .length(10)
      .empty()
      .required()
      .label("Phone No")
      .messages({
        "string.base": `phone number should be a type of text`,
        "string.pattern.base": `Enter only numbers`,
        "string.empty": "phone number is not allowed to be empty",
        "string.required": `phone number is Required`,
      }),
    date: Joi.string().empty().required().messages({
      "string.empty": `date cannot be an empty field`,
      "string.massage": `date format not valid`,
      "any.required": `date is a required field`,
    }),
  });
  return schema.validate(testimonual);
}

// function validation12(contactus1) {
//   const schema = Joi.object({
//     name: Joi.string().required().empty().messages({
//       "string.base": `name should be a type of 'text'`,
//       "string.empty": `name cannot be an empty field`,
//       "any.required": `name is a required field`,
//     }),
//     email: Joi.string().required().empty().email().messages({
//       "string.base": `email should be a type of 'text'`,
//       "string.empty": `email cannot be an empty field`,
//       "string.Email": `email format not valid`,
//       "any.required": `email is a required field`,
//     }),
//     number: Joi.string()
//       .pattern(/^[0-9]+$/)
//       .length(10)
//       .empty()
//       .required()
//       .label("Phone No")
//       .messages({
//         "string.base": `phone number should be a type of text`,
//         "string.pattern.base": `Enter only numbers`,
//         "string.empty": "phone number is not allowed to be empty",
//         "string.required": `phone number is Required`,
//       }),
//     massage: Joi.string().empty().required().messages({
//       "string.empty": `massage cannot be an empty field`,
//       "string.massage": `massage format not valid`,
//       "any.required": `massage is a required field`,
//     }),

//     date: Joi.string().empty().required().messages({
//       "string.empty": `date cannot be an empty field`,
//       "string.date": `date format not valid`,
//       "any.required": `date is a required field`,
//     }),
//   });
//   return schema.validate(contactus1);
// }

module.exports = {
  validationtestimonual,
  //   validation12,
};
