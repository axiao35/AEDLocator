const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
console.log(process.env.MONGO_USERNAME);
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.exbb2lv.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

connectToDatabase();

const database = client.db('juniordesign');
const collection = database.collection('users');

const port = process.env.PORT || 5000
app.listen(port, () => console.log("Listening on port", port));

app.get("/", (req, res) => {
    res.status(200).send("Hello world");
});

app.post('/api/login', async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        console.log(email);
        console.log(password);
        const filter = {
            email
        };
        const user = await collection.find(filter).toArray();
        console.log(user);

        if (user.length === 0) {
            // No matching user found
            res.status(200).send("User");
        } else {
            // Check if the provided password matches the user's password
            if (user[0].password === password) {
                res.status(200).send(user[0].firstname);
            } else {
                res.status(200).send("Password");
            }
        }
    } catch (error) {
        console.error('Error fetching users', error);
        res.status(500).json({ error: 'Internal Server Error' });
        console.log("doesnt");
    }
});

app.post("/api/createUser", async (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;

    const filter = {
        email
    };
    const user = await collection.find(filter).toArray();
    if (user.length != 0) {
        res.status(200).send("taken")
    } else {
        const document = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password
        };

        try {
            const result = await collection.insertOne(document);
        } catch (error) {
            console.error('Error inserting document', error);
        }
        res.send("Successfully Added New User!");
    }

});

app.post("/api/createEmergencyContact", async (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const contact_name = req.body.contact_name;
    const contact_number = req.body.contact_number;
    const filter = {
        email
    };
    const user = await collection.find(filter).toArray();
    console.log(user[0]);
    //user found
    if (user[0]) {
        const update = {
            $push: {
                emergency_contact: [contact_name, contact_number]
            }
        };
        const result = await collection.updateOne(filter, update);
        res.send("success");
    } else {
        res.send("user not found");
    }
});

app.post("/api/getEmergencyContact", async (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const filter = {
        email
    };
    const user = await collection.find(filter).toArray();
    contacts = user[0].emergency_contact;
    res.json(contacts)
});