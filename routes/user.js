const express = require('express');
const {check} = require('express-validator');

const router = express.Router();

router.get('/dashboard', (req, res) => {
    res.send("User Dashboard Page")
})

module.exports = router