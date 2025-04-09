const express = require('express');
const CryptoJS = require('crypto-js');
const config = require('../utils/config.js');
const jwt = require('jsonwebtoken');
const result = require('../utils/result.js')
const db = require('../db/db.js');

const router = express.Router();

router.post('/register', (request, response) => {
    const { first_name, last_name, email, password, mobile_no } = request.body;
    const encryptedPassword = CryptoJS.SHA256(password).toString();
    const statement = `INSERT INTO users (first_name,last_name,email,password_hash,mobile_no)
                        VALUES (?,?,?,?,?)`;
    const values = [first_name, last_name, email, encryptedPassword, mobile_no];
    db.query(statement, values, (error, data) => {
        response.send(result.createResult(error, data));
    });
})

router.post('/login', (request, response) => {
    const { email, password } = request.body;
    const encryptedPassword = CryptoJS.SHA256(password).toString();

    const statement = `SELECT first_name,last_name,email,password_hash,mobile_no FROM users WHERE email=? and password_hash = ?`;
    const values = [email, encryptedPassword];
    db.query(statement, values, (error, data) => {
        if (data) {
            if (data.length) {
                const user = data[0];
                const payload = user;
                const token = jwt.sign(payload, config.secret);
                response.send(result.createSuccessResult({ ...user, token }));
            }
            else {
                result.createErrorResult('Invalid email or password');
            }
        }
        else
            response.send(result.createResult(error, data));
    })
})

module.exports = router;
