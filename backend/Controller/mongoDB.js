
module.exports.dbConnection = async(req, res) => {

    try{
        console.log('Request:', req.body);
        res.status(200).json({'hola': 'mundo'});
    } 
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }

};
