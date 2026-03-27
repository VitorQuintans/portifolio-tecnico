const request = require('supertest');
const { baseURLAPI } = require('../config/env');

class BookstoreService {
    createUser(body) {
        return request(baseURLAPI)
            .post('/Account/v1/User')
            .send(body);
    }

    generateToken(body) {
        return request(baseURLAPI)
            .post('/Account/v1/GenerateToken')
            .send(body);
    }

    authorized(body) {
        return request(baseURLAPI)
            .post('/Account/v1/Authorized')
            .send(body);
    }

    getBooks() {
        return request(baseURLAPI)
            .get('/BookStore/v1/Books');
    }

    rentBooks(data, token) {
        return request(baseURLAPI)
            .post('/BookStore/v1/Books')
            .set('Authorization', `Bearer ${token}`)
            .send(data);
    }

    getUser(userId, token) {
        return request(baseURLAPI)
            .get(`/Account/v1/User/${userId}`)
            .set('Authorization', `Bearer ${token}`);
    }
}

module.exports = new BookstoreService();