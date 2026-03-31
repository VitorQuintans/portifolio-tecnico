const bookstore = require('../src/services/bookstore.service');
const { faker } = require('@faker-js/faker');

describe('Bookstore API - Fluxo completo', () => {
    let user;
    let token;
    let userId;
    let books;

    it('Deve executar o fluxo completo da API', async () => {
        user = {
            userName: faker.internet.userName(),
            password: 'Test@1234'
        };

        const createUserRes = await bookstore.createUser(user);
        expect(createUserRes.status).toBe(201);
        expect(createUserRes.body).toHaveProperty('userID');

        userId = createUserRes.body.userID;

        const tokenRes = await bookstore.generateToken(user);
        expect(tokenRes.status).toBe(200);
        expect(tokenRes.body).toHaveProperty('token');

        token = tokenRes.body.token;

        const authRes = await bookstore.authorized(user);
        expect(authRes.status).toBe(200);
        expect(authRes.body).toBe(true);

        const booksRes = await bookstore.getBooks();
        expect(booksRes.status).toBe(200);
        expect(booksRes.body.books.length).toBeGreaterThan(0);

        books = booksRes.body.books;

        const rentPayload = {
            userId: userId,
            collectionOfIsbns: [
                { isbn: books[0].isbn },
                { isbn: books[1].isbn }
            ]
        };

        const rentRes = await bookstore.rentBooks(rentPayload, token);
        expect(rentRes.status).toBe(201);

        const userRes = await bookstore.getUser(userId, token);
        expect(userRes.status).toBe(200);
        expect(userRes.body.books.length).toBe(2);
    });
});