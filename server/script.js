const express = require("express");
const geolib = require("geolib");
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

const port = process.env.PORT || 8080
app.listen(port, () => console.log("Listening on port", port));

app.get("/", (req, res) => {
    res.status(200).send("Hello world");
});

app.post('/api/login', async (req, res) => {
    const collection = database.collection('users');
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
                console.log(user);
                const response = {
                    name: user[0].firstname,
                    email: user[0].email,
                };
                console.log(response);
                res.status(200).json(response);
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
    const collection = database.collection('users');
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
    const collection = database.collection('users');
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
            $set: {
                emergency_contact: {
                    "contact_name": contact_name,
                    "contact_number": contact_number
                }
            }
        };
        const result = await collection.updateOne(filter, update);
        res.send("success");
    } else {
        res.send("user not found");
    }
});

app.post("/api/getEmergencyContact", async (req, res) => {
    const collection = database.collection('users');
    try {
        if (!req.body || !req.body.email) {
            return res.status(400).json({ error: "Email is required in the request body" });
        }

        const email = req.body.email;
        const filter = { email };

        const user = await collection.findOne(filter);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.emergency_contact) {
            return res.status(404).json({ error: "Emergency contact not found for this user" });
        }

        const contacts = user.emergency_contact;
        res.json(contacts);
    } catch (error) {
        console.error("Error in getEmergencyContact endpoint:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/api/updateAED", async (req, res) => {
    const collection = database.collection('aeds');
    console.log(req.body);
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const description = req.body.description;
    const serialnumber = req.body.serialnumber;
    const brand = req.body.brand;
    const modelnumber = req.body.modelnumber;
    const batteryexp = req.body.batteryexp;
    const padexp = req.body.padexp;
    const pediatricexp = req.body.pediatricexp;
    const pointofcontact = req.body.pointofcontact;

    const query = { serialnumber: serialnumber };
    const data = {
        $set: {
            latitude: latitude,
            longitude: longitude,
            description: description,
            serialnumber: serialnumber,
            brand: brand,
            modelnumber: modelnumber,
            batteryexp: batteryexp,
            padexp: padexp,
            pediatricexp: pediatricexp,
            pointofcontact: pointofcontact
        }
    };
    const options = { upsert: true };

    try {
        const result = await collection.updateOne(query, data, options);
        console.log('Matched Count:', result.matchedCount);
        console.log('Modified Count:', result.modifiedCount);
        console.log('Upserted Id:', result.upsertedId);

        // Sending a response back to the client
        res.status(200).json({
            success: true,
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount,
            upsertedId: result.upsertedId
        });
    } catch (error) {
        console.error('Error:', error);
        // Sending an error response back to the client
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
});

app.get("/api/getAEDs", async (req, res) => {
    collection = database.collection('aeds');
    console.log(req.query);
    const userLatitude = req.query.userLatitude;
    const userLongitude = req.query.userLongitude;
    console.log(userLatitude, userLongitude);
    try {
        const aeds = await collection.find().toArray();
        console.log(aeds)

        // Calculate distances to all AEDs
        const distances = aeds.map(aed => {
            if (aed.latitude !== null && aed.longitude !== null) {
                return {
                    ...aed,
                    distance: geolib.getDistance(
                        { latitude: userLatitude, longitude: userLongitude },
                        { latitude: aed.latitude, longitude: aed.longitude }
                    ),
                };
            } else {
                return {
                    ...aed,
                    distance: null, // or any other value to represent distance for invalid coordinates
                };
            }
        });

        // Filter out items with null distance (invalid coordinates)
        const validDistances = distances.filter(aed => aed.distance !== null);

        const nearestAEDs = validDistances.sort((a, b) => a.distance - b.distance).slice(0, 20);
        console.log(nearestAEDs);
        res.json(nearestAEDs);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/api/updateUserEmail", async (req, res) => {
    const collection = database.collection('users');
    console.log(req.body);
    const email = req.body.oldEmail;
    const newEmail = req.body.newEmail;
    
    try {
        const filter = { email };
        const user = await collection.findOne(filter);

        // Check if the user exists
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Check if the new email already exists for another user
        const emailExists = await collection.findOne({ email: newEmail, _id: { $ne: user._id } });

        if (emailExists) {
            return res.status(400).send("Email already exists for another user");
        }

        // Update the email
        const update = { $set: { email: newEmail } };
        const result = await collection.updateOne(filter, update);

        if (result.matchedCount === 1 && result.modifiedCount === 1) {
            return res.status(200).send("Email updated successfully");
        } else if (result.matchedCount === 1 && result.modifiedCount === 0) {
            return res.status(400).send("New email is the same as the old email. No changes made.");
        }
    } catch (error) {
        console.error("Error updating email:", error);
        return res.status(500).send("Internal server error");
    }
});

app.post("/api/updateUserPassword", async (req, res) => {
    console.log(req.body);
    try {
      const collection = database.collection('users');
      const email = req.body.email;
      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;

      if (oldPassword === newPassword) {
        return res.status(200).send("Passwords match. No changes occured.");
      }
      console.log(oldPassword);
      console.log(req.body);
  
      const filter = { email };
      const user = await collection.findOne(filter);
  
      if (user) {
        console.log(oldPassword);
        console.log(user.password)
        if (oldPassword == user.password) {
          const update = {
            $set: {
              password: newPassword
            }
          };
  
          const result = await collection.updateOne(filter, update);
          res.status(200).send("Password Successfully Changed");
        } else {
          res.status(401).send("Incorrect old password");
        }
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).send("Internal Server Error");
    }
  });