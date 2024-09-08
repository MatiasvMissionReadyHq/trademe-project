const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

 // MongoDB connection string
 const client = new MongoClient(process.env.MONGODB_URI);

 module.exports.updateBidById = async(req, res) => {

    try{

        const itemId = req.params.id;
        // Connect to the MongoDB cluster
        console.log(new ObjectId(itemId))
        await client.connect();
        const db = client.db("items");

        const singleResult = await db.collection('vehicles').findOne({ _id: new ObjectId(itemId) });
        // get all documents
        // const result = await collection.find().toArray();

        if (singleResult === null) {
            res.status(404).json({ error: 'No results found' });
            return;
        }

        if(typeof(singleResult.userBid)!=='undefined'){
            const result = await db.collection('vehicles').updateOne(
                { _id: new ObjectId(itemId), userBid: singleResult.userBid },
                { $set: { userBid: !singleResult.userBid } }                 
            );

            if (result.matchedCount === 0) {
                return res.status(404).send({ message: 'Item not found' });
            }
    
            res.send({ message: 'Item updated successfully', result });
    
            await client.close();
            return;

            
        }

            const result = await db.collection('vehicles').updateOne(
                { _id: new ObjectId(itemId)},
                { $set: { userBid: true } },           // Fields to update or add
                { upsert: true }                   
            );

            if (result.matchedCount === 0) {
                return res.status(404).send({ message: 'Item not found' });
            }
    
            res.send({ message: 'Item updated successfully', result });
    
            await client.close();
            return;
    } 
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }

};