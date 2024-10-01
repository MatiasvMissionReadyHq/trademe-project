// Import required packages
const readlineSync = require('readline-sync');
const { MongoClient, ObjectId } = require('mongodb');
const e = require('cors');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

// Database and collection names
const dbName = 'items';
const collectionName = 'vehicles';

async function connectToDB() {
    await client.connect();
    const db = client.db(dbName);
    return db.collection(collectionName);
}


// Add a new vehicle 
async function addVehicle() {

    const photos = [];
    let addMorePhotos = true;

    while (addMorePhotos) {
        const photoUrl = readlineSync.question('Enter photo URL (or press enter to finish): ');
        if (photoUrl) {
            photos.push(photoUrl);
        } else {
            addMorePhotos = false;
        }
    }

    // check vehicle type is not empty
    let type;
    while (!type) {
        type = readlineSync.question('Enter vehicle type (cannot be empty e.g., car): ');
        if (!type) {
            console.log("vehicle type cannot be empty. Please enter a valid vehicle type.");
        }
    }

    // check vehicle make is not empty
    let make;
    while (!make) {
        make = readlineSync.question('Enter vehicle make (cannot be empty): ');
        if (!make) {
            console.log("vehicle make cannot be empty. Please enter a valid vehicle make.");
        }
    }

    // check vehicle year is not empty
    let year;
    while (!year) {
        year = readlineSync.question('Enter vehicle year (cannot be empty): ');
        if (!year) {
            console.log("vehicle year cannot be empty. Please enter a valid vehicle year.");
        }
    }

    // check vehicle model is not empty
    let model;
    while (!model) {
        model = readlineSync.question('Enter vehicle model (cannot be empty): ');
        if (!model) {
            console.log("vehicle model cannot be empty. Please enter a valid vehicle model.");
        }
    }

    const location = readlineSync.question('Enter Vehicle location: ');
    const engine = readlineSync.question('Enter engine capacity (e.g., 2000cc): ');
    const currentBid = readlineSync.question('Enter current bid price: ');
    const userBid = readlineSync.question('Did the user place a bid (true/false)? ').toLowerCase() === 'true';
    const gearbox = readlineSync.question('Enter gearbox type (Automatic/Manual): ');
    const cooling = readlineSync.question('Enter cooling type (e.g., liquid): ');


    const vehicle = {photos, type, make, year, model, location, engine, currentBid, userBid, gearbox, cooling};

    const collection = await connectToDB();
    const result = await collection.insertOne(vehicle);
    
    if(typeof(result?.insertedId)!=='undefined'){
        //console.log(result.insertedId);
        console.log('vehicle listing added successfully!');
        // List last added vehicle
        const newVehicle = await collection.findOne({ _id: result.insertedId });
        console.log('\nDetails of the vehicles added:');
        console.log(`ID: ${newVehicle._id}`);
        console.log(`Type: ${newVehicle.type}`);
        console.log(`Make: ${newVehicle.make}`);
        console.log(`Year: ${newVehicle.year}`);
        console.log(`Model: ${newVehicle.model}`);
        console.log(`Location: ${newVehicle.location}`);
        console.log(`Engine: ${newVehicle.engine}`);
        console.log(`Current Bid: ${newVehicle.currentBid}`);
        console.log(`User Bid: ${newVehicle.userBid}`);
        console.log(`Gearbox: ${newVehicle.gearbox}`);
        console.log(`Cooling: ${newVehicle.cooling}`);
        console.log(`Photos: ${newVehicle.photos.join(', ')}`);

    } else {
        console.log('Failed to add vehicle.');
    }  
    
}


// List all vehicle
async function listVehicles() {
    const collection = await connectToDB();
    const vehicle = await collection.find().toArray();

    if (vehicle.length > 0) {
        console.log('Your vehicle List:');
        vehicle.forEach((vehicle, index) => console.log(`${index + 1}. ID: ${vehicle._id} - ${vehicle.make} ${vehicle.model} Year:${vehicle.year}`));
    } else {
        console.log('No vehicle found.');
    }
}

// Delete a vehicle by its MongoDB ObjectId
async function deleteVehicleById() {
    const id = readlineSync.question('Enter the vehicle ID to delete: ');
    const collection = await connectToDB();

    try {
        const objectId = new ObjectId(id); 
        const result = await collection.deleteOne({ _id: objectId });

        if (result.deletedCount === 1) {
            console.log(`vehicle with ID ${id} has been deleted successfully.`);
        } else {
            console.log('No vehicle found with that ID.');
        }
    } catch (error) {
        console.error('Invalid ID format:', error.message);
    }
}

// Main CLI function
async function main() {
    const options = ['Add Vehicle', 'List Vehicle', 'Delete Vehicle', 'Exit'];
    let exit = false;

    while (!exit) {
        const index = readlineSync.keyInSelect(options, 'What do you want to do?');

        switch (index) {
        case 0:
            await addVehicle();
            break;
        case 1:
            await listVehicles();
            break;
        case 2:
            await deleteVehicleById();
            break;
        case 3:
        default:
            exit = true;
            break;
        }
    }

    await client.close();
    
}
main().catch(err => {
    console.error('An error occurred:', err);
    client.close();
});
