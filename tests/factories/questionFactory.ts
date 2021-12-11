import faker from 'faker';

const incorrectQuestion = () => ({
    question: faker.datatype.string(),
    student: faker.datatype.number(),
    class: faker.datatype.boolean(),
    tags: faker.datatype.string()
});

const correctQuestion = () => ({
    question: faker.datatype.string(),
    student: faker.datatype.string(),
    class: faker.datatype.string(),
    tags: faker.datatype.string()
})

export { incorrectQuestion, correctQuestion };