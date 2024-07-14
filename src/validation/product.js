import Joi from "joi";
export const ProductValid = Joi.object({
    Name: Joi.string().min(6).required(),
    Price: Joi.number().min(0).required(),
});
