// Import required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // For making HTTP requests
const cheerio = require('cheerio'); // For scraping text from URLs
const cors = require('cors');

// Initialize the Express app
const app = express();

// Apply middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// Function to scrape text from a URL
async function scrapeTextFromURL(url) {
    try {
        console.log(`Fetching text from URL: ${url}`);

        // Fetch the webpage data
        const { data } = await axios.get(url);

        // Use Cheerio to extract the text from the webpage
        const $ = cheerio.load(data);
        const text = $('body').text().trim();

        if (!text) {
            console.error('No text found at this URL');
            return null;
        }

        // Return only the first 200 characters
        return text.slice(0, 200);
    } catch (error) {
        console.error('Error scraping text:', error.message);
        return null;
    }
}

// Route to analyze text from a URL
app.post('/analyze-url', async (req, res) => {
    const { url } = req.body;

    // Validate the input URL
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Step 1: Scrape text from the provided URL
        const text = await scrapeTextFromURL(url);

        if (!text) {
            return res.status(400).json({ error: 'No text content found' });
        }

        // Step 2: Send text to Udacity NLP API
        const response = await axios.post(
            'https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer',
            { text }
        );

        // Step 3: Send the NLP response back to the frontend
        return res.json(response.data);
    } catch (error) {
        console.error('Error in API request:', error.message);
        return res.status(500).json({ error: 'Failed to analyze the text' });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send("This is the backend server. Use the client app to access the NLP API.");
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
