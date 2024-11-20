const express = require('express');
const cors = require('cors');
const db = require('./firebase'); // Import Firestore setup

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Requests (CORS)

// Example route: Get all documents from Firestore
app.get('/data', async (req, res) => {
  try {
    const snapshot = await db.collection('yourCollection').get(); // Replace 'yourCollection' with your Firestore collection name
    const data = snapshot.docs.map(doc => doc.data());
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// Example route: Add data to Firestore
app.post('/data', async (req, res) => {
  try {
    const { name, age } = req.body; // Expecting 'name' and 'age' in the request body
    await db.collection('yourCollection').add({
      name,
      age,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding data' });
  }
});

// Start the server
const port = 4000;  
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});