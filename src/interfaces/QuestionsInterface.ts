interface Question {
    id?: number;
    question: string;
    student: string;
    class: string;
    tags?: string;
    answered?: boolean;
    submittedAt?: string;
    answeredAt?: string;
    answeredBy?: string;
    answer?: string;
    score?: number;
}

export { Question };
