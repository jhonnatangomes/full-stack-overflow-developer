interface Question {
    question: string;
    student: string;
    class: string;
    tags: string;
}

interface QuestionDB extends Question {
    id: number;
}

interface AskedQuestion extends Question {
    answered: boolean;
    submittedAt: string;
    answeredAt?: string;
    answeredBy?: string;
    answer?: string;
    score?: number;
}

export { Question, QuestionDB, AskedQuestion };