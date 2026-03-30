const request = require('supertest');
const { baseUrl } = require('../config/env');

class BookstoreService {
    createUser(body) {
        return request(baseUrl)
            .post('/Account/v1/User')
            .send(body);
    }

    generateToken(body) {
        return request(baseUrl)
            .post('/Account/v1/GenerateToken')
            .send(body);
    }

    authorized(body) {
        return request(baseUrl)
            .post('/Account/v1/Authorized')
            .send(body);
    }

    getBooks() {
        return request(baseUrl)
            .get('/BookStore/v1/Books');
    }

    rentBooks(data, token) {
        return request(baseUrl)
            .post('/BookStore/v1/Books')
            .set('Authorization', `Bearer ${token}`)
            .send(data);
    }

    getUser(userId, token) {
        return request(baseUrl)
            .get(`/Account/v1/User/${userId}`)
            .set('Authorization', `Bearer ${token}`);
    }
}

module.exports = new BookstoreService();