/* =================================== Import Library =================================== */
const express = require('express');
const cors = require('cors');

require('dotenv').config();


/* ===================================== Middleware ===================================== */
const app = express()
app.use(cors())
app.use(express.json())


/* =================================== Import Routes ==================================== */
const apiRouterRetrieve = require('./Router/apiDataRetrieve'); 
const apiRouterUpdate = require('./Router/apiDataUpdate');


/* ======================================= Routes ======================================= */
 app.use(apiRouterRetrieve);
 app.use(apiRouterUpdate);


/* ================================= Default Root Routes ================================ */
app.get('/', (req, res) => {
    res.send("Server Connected")
})


/* ======================================== Port ======================================== */
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})