require('dotenv').config()

module.exports = {
  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },
  "development": {
    "username": "postgres",
    "password": "Dakun4life",
    "database": "books",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "saltRounds": 2,
    "jwtSecret": "yo-its-a-secret",
    "tokenExpireTime": "6h"
  },
  "test": {
    "username": "postgres",
    "password": "Dakun4life",
    "database": "book_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "saltRounds": "2",
    "jwtSecret": "yo-its-a-secret",
    "tokenExpireTime": "6h"
  },
  "production": {
    "username": "postgres",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
