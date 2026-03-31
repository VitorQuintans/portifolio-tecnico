const Joi = require('joi');

const BookModalSchema = Joi.object({
    isbn: Joi.string().required(),
    title: Joi.string().required(),
    subTitle: Joi.string().allow('').required(),
    author: Joi.string().required(),
    publish_date: Joi.alternatives().try(Joi.string(), Joi.date()).required(),
    publisher: Joi.string().required(),
    pages: Joi.number().integer().required(),
    description: Joi.string().allow('').required(),
    website: Joi.string().allow('').required()
});

const CollectionOfIsbnSchema = Joi.object({
    isbn: Joi.string().required()
});

const AddListOfBooksSchema = Joi.object({
    userId: Joi.string().required(),
    collectionOfIsbns: Joi.array().items(CollectionOfIsbnSchema).required()
});

const AllBooksModalSchema = Joi.object({
    books: Joi.array().items(BookModalSchema).required()
});

const LoginViewModelSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
});

const RegisterViewModelSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
});

const TokenViewModelSchema = Joi.object({
    token: Joi.string().required(),
    expires: Joi.alternatives().try(Joi.string(), Joi.date()).required(),
    status: Joi.string().required(),
    result: Joi.string().required()
});

const CreateUserResultSchema = Joi.object({
    userID: Joi.string().required(),
    username: Joi.string().required(),
    books: Joi.array().items(BookModalSchema).required()
});

const GetUserResultSchema = Joi.object({
    userId: Joi.string().required(),
    username: Joi.string().required(),
    books: Joi.array().items(BookModalSchema).required()
});

const StringObjectSchema = Joi.object({
    isbn: Joi.string().required(),
    userId: Joi.string().required()
});

const BooksResultSchema = Joi.object({
    userId: Joi.string().required(),
    message: Joi.string().required()
});

const UserBooksResultSchema = Joi.object({
    userId: Joi.string().required(),
    isbn: Joi.string().required(),
    message: Joi.string().required()
});

const ReplaceIsbnSchema = Joi.object({
    userId: Joi.string().required(),
    isbn: Joi.string().required()
});

const MessageModalSchema = Joi.object({
    code: Joi.string().required(),
    message: Joi.string().required()
});

const validateContract = (schema, data) => {
    const { error } = schema.validate(data, { abortEarly: false, allowUnknown: true });
    if (error) {
        throw new Error(`Erro de contrato: ${error.message}`);
    }
};

module.exports = {
    BookModalSchema,
    CollectionOfIsbnSchema,
    AddListOfBooksSchema,
    AllBooksModalSchema,
    LoginViewModelSchema,
    RegisterViewModelSchema,
    TokenViewModelSchema,
    CreateUserResultSchema,
    GetUserResultSchema,
    StringObjectSchema,
    BooksResultSchema,
    UserBooksResultSchema,
    ReplaceIsbnSchema,
    MessageModalSchema,
    validateContract
};
