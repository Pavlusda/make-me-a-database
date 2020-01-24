const {MongoClient} = require('mongodb');

async function main() {
    const uri = "mongodb+srv://petDB:petdbCluster@petdb-yqrvq.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        await createListing(
            client,
            {
                name: 'Biscuit',
                species: 'derpy cat'
            }
        )

        await listPets(client);
    }
    catch(err) {
        console.error(err);
    }
    finally {
        await client.close();
    }

}

main().catch(console.error);

async function createListing(client, newListing) {
    const result = await client.db('pets').collection('pet-data').insertOne(newListing);
    console.log(`New listing created with the id: ${result.insertedId}`);
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function listPets(client) {
    const pets = client.db('pets').collection('pet-data').find();
    console.log('Pets:')
    pets.forEach(doc => console.log(`- ${doc.name} (${doc.species})`));
}



/*
const MongoClient = require('mongodb').MongoClient;

// Database connection string for "PetBD" cluster
const uri = "mongodb+srv://petDB:petdbCluster@petdb-yqrvq.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});
*/
