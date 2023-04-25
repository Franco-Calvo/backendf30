import Joi from "joi-oid";

const schema_signin = Joi.object({
  email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
    "string.empty": "El email no puede quedar vacío",
    "any.required": "El email es requerido",
  }),
  password: Joi.string().required().messages({
    "string.empty": "La contraseña no puede quedar vacía",
    "any.required": "La contraseña es requerida",
  }),
});

export default schema_signin;
