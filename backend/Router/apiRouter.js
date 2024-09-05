const express= require('express');  
const router = express.Router();

const dbController = require('../Controller/mongoDB');
router.get('/dbConnection', dbController.dbConnection);

module.exports = router;

