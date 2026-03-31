const { faker } = require('@faker-js/faker');

function userFakerName() {
    return faker.internet.userName();
}

function userFakerPassword() {
    return faker.internet.password(10) + 'A@1';
}

module.exports = {
    userFakerName,
    userFakerPassword
};