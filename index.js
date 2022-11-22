const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5d1heef.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const appointments = await client.db("doctors-portal").collection("appointment-collections");

        app.get('/appointments', async (req, res) => {
            const cursor = appointments.find({});
            const results = await cursor.toArray();
            res.send(results);
        })
    }
    catch (err) {
        console.log(err.stack);
    }
    finally {
    }
}
run().catch(console.log);



app.get('/', async (req, res) => {
    res.send('Doctors Portal Server is running');
});

app.listen(port, () => {
    console.log(`Doctors Portal Server is running on PORT :${port}`)
});
