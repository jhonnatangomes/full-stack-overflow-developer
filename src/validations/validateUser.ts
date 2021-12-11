import Joi from 'joi';
import User from '../interfaces/UserInterface';

const schema = Joi.object({
    name: Joi.string().required(),
    class: Joi.string().required(),
});

export default function validateUser(body: User) {
    const validate = schema.validate(body);
    if (validate.error) {
        return {
            isValid: false,
            error: validate.error.message,
        };
    }

    return {
        isValid: true,
    };
}
