const express= require('express');  
const router = express.Router();

const mongoApi = require('../Controller/mongoUpdateData');
router.put('/updateBid/:id', mongoApi.updateBidById);


module.exports = router;