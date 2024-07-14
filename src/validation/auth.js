import Joi from "joi";
const SingUp = Joi.object({
    userName: Joi.string().required().min(3).max(255).messages({
        "string.empty": "userName khong dc de trong",
        "any.required": "username bat buoc",
        "string.min": "username phai co it nhat {#limit} ky tu",
        "string.max": "username phai co duoi nhat {#limit} ky tu",
    }),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(255),
    confirmPassword: Joi.string()
        .required()
        .min(6)
        .max(255)
        .valid(Joi.ref("password")),
});
export default SingUp;
