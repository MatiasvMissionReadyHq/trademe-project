const express= require('express');  
const router = express.Router();

const mongoApi = require('../Controller/mongoDB');
router.get('/getCategories', mongoApi.getCategories);
router.get('/getItems', mongoApi.getItems);
router.post('/getItemsById', mongoApi.getItemsById);

module.exports = router;

