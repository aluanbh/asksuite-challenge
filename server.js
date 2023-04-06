require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./src/routes/router.js');

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

const port = process.env.PORT;

const serverPort = port || 8080;

app.listen(serverPort, () => {
    console.log(`Server is running at port ${serverPort}`);
});
