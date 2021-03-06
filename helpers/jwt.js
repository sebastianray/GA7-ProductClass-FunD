const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY


const tokenGenerator = (user) => {
    const { id, name, email, password } = user
    return jwt.sign({
        id,
        name,
        email,
        password
    }, secretKey, { expiresIn: '1h' })
}

const tokenVerifier = (access_token) => {
    return jwt.verify(access_token,secretKey)
}

module.exports = {
    tokenGenerator, tokenVerifier
}