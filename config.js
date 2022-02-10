require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    DB_URL:process.env.DB_URL,
    SECRET_WORD:process.env.SECRET_WORD
}