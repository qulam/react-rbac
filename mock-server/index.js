const express = require('express');
const apiMocker = require('connect-api-mocker');
const cors = require('cors');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const middlewares = require('./middleware/auth-middleware');

const port = 8080;
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(multipartMiddleware)

app.use(cors(corsOptions));

app.use('/', middlewares.AuthMiddleware, apiMocker('mock-server/api'));

console.log(`Mock API Server is up and running at: http://localhost:${port}`);
app.listen(port);