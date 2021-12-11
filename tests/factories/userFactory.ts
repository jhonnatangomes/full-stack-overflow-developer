import faker from 'faker';

function incorrectUser() {
    return {
        name: faker.datatype.number(),
        class: faker.datatype.string(),
    };
}

function correctUser() {
    return {
        name: faker.name.findName(),
        class: faker.datatype.string(),
    };
}

export { incorrectUser, correctUser };
