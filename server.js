const express = require('express');
const cors = require('cors');
const authorization = require('./routes/middleware.js');
const usersRouter = require('./routes/users.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(authorization);
app.use('/users', usersRouter);

app.listen(4000, 'localhost', () => {
    console.log("Server is running on port 4000");
})