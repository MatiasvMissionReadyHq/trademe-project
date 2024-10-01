const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

 // MongoDB connection string
 const client = new MongoClient(process.env.MONGODB_URI);

 module.exports.getCategories = async(req, res) => {
    try{
        // Connect to the MongoDB cluster
        await client.connect();

        // Specify the database and collection
        const database = client.db("items");
        const vehiclesCollection = database.collection("vehicles");

         // Get distinct values for a specific field (e.g., 'type')
        const distinctValues = await vehiclesCollection.distinct("type");

        if (distinctValues === null) {
            res.status(404).json({ error: 'No results found' });
            return;
        }
        res.status(200).json(distinctValues);
        await client.close();
        console.log(distinctValues);
        return;
    } 
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
}


module.exports.getItems = async(req, res) => {

    try{

        // const uri = process.env.MONGODB_URI;
        await client.connect();
        console.log("Connected to MongoDB method get all items"); 
        
        // Select the database and collection
        const database = client.db("items"); // Replace with your database name
        const collection = database.collection("vehicles"); // Replace with your collection name

        //to find one document
        // const singleResult = await collection.findOne({ type: "motorbike" });
        // get all documents
        const result = await collection.find().toArray();
        console.log(result?.length)
        if(result?.length === 0){

            const data = require('../items.vehicles.json');
            const result = await collection.insertMany(data);
            res.status(208).json(result);
            // res.status(208).json({ error: 'data Base has been installed' });
            await client.close();
            return
            
        }   
        if (result === null) {
            res.status(404).json({ error: 'No results found' });
            return;
        }
        res.status(200).json(result);
        await client.close();
        //console.log(result);
        return;

    } 
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }

};


module.exports.getItemsById = async(req, res) => {
    
    try{

        const { id } = req.body;
        // const uri = process.env.MONGODB_URI;
        await client.connect();
        console.log("Connected to MongoDB method get all items"); 
        
        // Select the database and collection
        const database = client.db("items"); // Replace with your database name
        const collection = database.collection("vehicles"); // Replace with your collection name

        //to find one document
        const singleResult = await collection.findOne({ _id: new ObjectId(id) });
        // get all documents
        // const result = await collection.find().toArray();
        if (singleResult === null) {

            res.status(404).json({ error: 'No results found' });
            await client.close();
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