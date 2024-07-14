import Joi from "joi";
// Dang ki
export const SingUp = Joi.object({
    userName: Joi.string().required().min(3).max(255).messages({
        "string.empty": "userName khong dc de trong",
        "any.required": "username bat buoc",
        "string.min": "username phai co it nhat {#limit} ky tu",
        "string.max": "username phai co duoi nhat {#limit+1} ky tu",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "email khong dc de trong",
        "any.required": "email bat buoc",
        "string.email": "email khong dung dinh dang",
    }),
    password: Joi.string().required().min(6).max(255).messages({
        "string.empty": "password khong dc de trong",
        "any.required": "password bat buoc",
        "string.min": "password phai co it nhat {#limit} ky tu",
        "string.max": "password phai co duoi nhat {#limit+1} ky tu",
    }),
    confirmPassword: Joi.string()
        .required()
        .min(6)
        .max(255)
        .valid(Joi.ref("password"))
        .messages({
            "string.empty": "confirmPassword khong dc de trong",
            "any.required": "confirmPassword bat buoc",
            "string.min": "confirmPassword phai co it nhat {#limit} ky tu",
            "string.max": "confirmPassword phai co duoi nhat {#limit+1} ky tu",
            "any.only": "confirmPassword khong khop voi password",
        }),
    role: Joi.string(),
});

// Dang Nhap
export const SingIn = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "email khong dc de trong",
        "any.required": "email bat buoc",
        "string.email": "email khong dung dinh dang",
    }),
    password: Joi.string().required().min(6).max(255).messages({
        "string.empty": "password khong dc de trong",
        "any.required": "password bat buoc",
        "string.min": "password phai co it nhat {#limit} ky tu",
        "string.max": "password phai co duoi nhat {#limit+1} ky tu",
    }),
});
