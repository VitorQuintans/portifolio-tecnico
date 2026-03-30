require('dotenv').config({ path: '../.env', quiet: true });

module.exports = {
    baseUrl: process.env.BASE_URL
};