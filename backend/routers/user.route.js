const express = require('express');


const router = express.Router();

router.post('login', (req, res) => {
    res.send('User Logged in')
})

module.exports = router