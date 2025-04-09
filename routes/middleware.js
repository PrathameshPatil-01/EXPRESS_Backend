const config = require('../utils/config.js');
const jwt = require('jsonwebtoken');
const result = require('../utils/result.js')


function authorization(request, response, next) {
    if (request.url == '/users/register' || request.url == '/users/login') {
        next();
    }
    else {
        const token = request.headers.token;

        if (token) {
            const payload = jwt.verify(token, config.secret);
            if (payload) {
                request.user = payload;
                next();

            } else {
                response.send(result.createErrorResult('Invalid token'))
            }

        }
        else {
            response.send(result.createErrorResult('Token not provided'))
        }
    }
}

module.exports = authorization;