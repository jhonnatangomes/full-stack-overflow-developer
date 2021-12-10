interface Question {
    question: string;
    student: string;
    class: string;
    tags: string;
}

interface QuestionDB extends Question {
    id: number;
}

export { Question, QuestionDB };