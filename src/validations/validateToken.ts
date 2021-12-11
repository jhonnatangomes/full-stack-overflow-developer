import Joi from 'joi';

const schema = Joi.object({
    token: Joi.string().uuid().required(),
});

export default function validateToken(token: string) {
    const validate = schema.validate({ token });
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
