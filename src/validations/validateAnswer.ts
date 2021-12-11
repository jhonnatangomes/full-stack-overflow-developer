import Joi from 'joi';

const schema = Joi.object({
    answer: Joi.string().uuid().required(),
});

export default function validateAnswer(answer: string) {
    const validate = schema.validate({ answer });
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
