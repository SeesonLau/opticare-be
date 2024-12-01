const express = require('express');
const cors = require('cors');
const axios = require('axios');
//const db = require('./database/firebase'); // Import Firestore setup
const port = 4000;
const app = express();

const NEWS_API_KEY = 'add108f65bd940b09e9788d650eca81c'; 
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

// Basic root route
app.get('/', (req, res) => {
  res.send('YOU GOT SISONEEEEED');
});

// Route to get medical news related to eye care
app.get('/api/news', async (req, res) => {
  const query = req.query.query || 'eye care'; // Default query to 'eye care' if not provided
  const pageSize = req.query.pageSize || 5; // Default number of articles to fetch

  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: query,
        pageSize: pageSize,
        apiKey: NEWS_API_KEY, 
      },
    });

    res.json(response.data); // Send the data from NewsAPI as JSON to the frontend
  } catch (error) {
    console.error('Error fetching news:', error.response ? error.response.data : error.message); // Log more detailed error
    res.status(500).json({ error: 'Failed to fetch news', details: error.response ? error.response.data : error.message });
  }
});

// Verify Request Parameters
axios.get('https://newsapi.org/v2/everything', {
  params: {
    q: 'eye care',    // Search term
    pageSize: 5,      // Number of results
    apiKey: NEWS_API_KEY, 
  }
})

/*
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
*/
 
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use(cors({
  origin: 'http://localhost:3000',  // Replace with your frontend's URL
}));
