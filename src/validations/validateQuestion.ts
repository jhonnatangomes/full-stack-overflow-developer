import Joi from "joi";
import { Question } from "../interfaces/QuestionsInterface";
import { ValidationResponse } from "../interfaces/ValidationsInterface";

const schema = Joi.object({
    question: Joi.string().required(),
    student: Joi.string().required(),
    class: Joi.string().required(),
    tags: Joi.string().required(),
})

export default function validateQuestion(body: Question): ValidationResponse {
    const validate = schema.validate(body);

    if (validate.error) {
        return {
            isValid: false,
            error: validate.error.message
        }
    }

    return {
        isValid: true
    }
}