const express= require('express');  
const router = express.Router();

const getAllItems = require('../Controller/mongoDB');
router.get('/getItems', getAllItems.getItems);
router.post('/getItemsById', getAllItems.getItemsById);

module.exports = router;

