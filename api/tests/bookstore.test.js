const bookstore = require('../src/services/bookstore.service');
const { userFakerName, userFakerPassword } = require('../src/utils/faker');
const {
    CreateUserResultSchema,
    TokenViewModelSchema,
    AllBooksModalSchema,
    GetUserResultSchema,
    RegisterViewModelSchema,
    LoginViewModelSchema,
    AddListOfBooksSchema,
    MessageModalSchema,
    validateContract
} = require('../src/utils/schemas');

describe('Bookstore API - Fluxo completo', () => {
    let user;
    let token;
    let userId;
    let books;

    beforeAll(async () => {
        user = {
            userName: userFakerName(),
            password: userFakerPassword()
        };
    });

    it('should create a user', async () => {
        validateContract(RegisterViewModelSchema, user);
        const createUserRes = await bookstore.createUser(user);
        expect(createUserRes.status).toBe(201);
        expect(createUserRes.body).toHaveProperty('userID');
        validateContract(CreateUserResultSchema, createUserRes.body);

        userId = createUserRes.body.userID;
    });

    it('should generate a token', async () => {
        validateContract(LoginViewModelSchema, user);
        const tokenRes = await bookstore.generateToken(user);
        expect(tokenRes.status).toBe(200);
        expect(tokenRes.body).toHaveProperty('token');
        validateContract(TokenViewModelSchema, tokenRes.body);

        token = tokenRes.body.token;
    });

    it('should validate user was authorized', async () => {
        validateContract(LoginViewModelSchema, user);
        const authRes = await bookstore.authorized(user);
        expect(authRes.status).toBe(200);
        expect(authRes.body).toBe(true);
    });

    it('should list available books', async () => {
        const booksRes = await bookstore.getBooks();

        expect(booksRes.status).toBe(200);
        expect(booksRes.body).toHaveProperty('books');
        validateContract(AllBooksModalSchema, booksRes.body);

        books = booksRes.body.books;
    });

    it('should rent two books', async () => {
        const rentPayload = {
            userId: userId,
            collectionOfIsbns: [
                { isbn: books[0].isbn },
                { isbn: books[1].isbn }
            ]
        };
        validateContract(AddListOfBooksSchema, rentPayload);

        const rentRes = await bookstore.rentBooks(rentPayload, token);
        expect(rentRes.status).toBe(201);
    });

    it('should list user details with the chosen books', async () => {
        const userRes = await bookstore.getUser(userId, token);
        expect(userRes.status).toBe(200);
        expect(userRes.body.books.length).toBe(2);
        validateContract(GetUserResultSchema, userRes.body);
    });
});

describe('Bookstore API - Cenários Negativos e Tratamento de Erros', () => {
    it('should not create a user with a weak password', async () => {
        const weakUser = {
            userName: userFakerName(),
            password: '123'
        };
        const res = await bookstore.createUser(weakUser);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('code');
        expect(res.body).toHaveProperty('message');
        validateContract(MessageModalSchema, res.body);
    });

    it('should not generate a token with invalid credentials', async () => {
        const invalidUser = {
            userName: userFakerName(),
            password: userFakerPassword()
        };
        const res = await bookstore.generateToken(invalidUser);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('Failed');
        expect(res.body.result).toContain('User authorization failed.');
        expect(res.body.token).toBeNull();
    });

    it('should not authorize a user with incorrect credentials', async () => {
        const invalidUser = {
            userName: userFakerName(),
            password: userFakerPassword()
        };
        const res = await bookstore.authorized(invalidUser);
        expect(res.body.message).toContain('User not found!');
    });

    it('should not rent books without authentication', async () => {
        const rentPayload = {
            userId: 'some-random-guid',
            collectionOfIsbns: [{ isbn: '1234567890' }]
        };
        const res = await bookstore.rentBooks(rentPayload, '');
        expect(res.status).toBe(401);
        expect(res.body.message).toMatch(/User not authorized!|User Id not correct!/);
    });

    it('should not view user details with an invalid token', async () => {
        const res = await bookstore.getUser('some-random-guid', 'invalid-token');
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(/User not authorized!|User not found!/);
    });

    it('should not rent books with an invalid token', async () => {
        const rentPayload = {
            userId: 'some-random-guid',
            collectionOfIsbns: [{ isbn: '1234567890' }]
        };
        const res = await bookstore.rentBooks(rentPayload, 'invalid-token');
        expect(res.status).toBe(401);
        expect(res.body.message).toMatch(/User not authorized!|User Id not correct!/);
    });
});