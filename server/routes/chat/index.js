const express = require('express')
const router = express.Router()

// Endpoints
router.get('/', (req, res) => res.send('el chat esta potente'))



module.exports = router