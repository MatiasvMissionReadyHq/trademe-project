const { MongoClient } = require('mongodb');

require('dotenv').config();



module.exports.dbConnection = async(req, res) => {

    // MongoDB connection string
    const uri = "mongodb://localhost:27017"; // For local MongoDB connection
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try{

        // const uri = process.env.MONGODB_URI;

        await client.connect();
        console.log("Connected to MongoDB"); 
        
        // Select the database and collection
        const database = client.db("items"); // Replace with your database name
        const collection = database.collection("vehicles"); // Replace with your collection name

        const singleResult = await collection.findOne({ type: "motorbike" });
        if (singleResult === null) {
            res.status(404).json({ error: 'No results found' });
            return;
        }
        res.status(200).json(singleResult);
        await client.close();
        console.log(singleResult);
        return;

    } 
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }

};