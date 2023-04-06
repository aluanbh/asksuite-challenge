const express = require('express');
const router = express.Router();

const TravelController = require('../controllers/TravelController/index.js');

router.get('/', (req, res) => {
    res.send('Hello Asksuite Challenge!');
});

router.post('/search', TravelController.search);

module.exports = router;
