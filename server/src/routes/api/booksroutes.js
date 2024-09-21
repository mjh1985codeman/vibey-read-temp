import { Router } from 'express';
import fetch from 'node-fetch';
import { mapGoogleBooksData } from '../../utils/dataMapping'; // Adjusted import path

const router = Router();

router.get('/health', (req, res) => {
    res.status(200).send('Hello from the API Route');
});

router.get('/:subjects', async (req, res) => {
    try {
        const subjects = req.params.subjects;
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject+[${subjects}]&key=${process.env.GOOGLE_KEY}`);
        const data = await response.json();
        const mappedData = mapGoogleBooksData(data); // Use the mapping function
        res.send(mappedData);
    } catch (error) {
        console.error('Error fetching data from Google Books API:', error);
        res.status(500).json({ error: 'Failed to fetch data from Google Books API' });
    }
});

export default router;

// todo: create the mapping for how the respon data will look like, reference model
// spotify.api. wil// create logic that will feed subjects into this router.get from client.
// this logic up there is gettingt data from the google api. 
// we have to figure out the parameters that come form the user. that would be a file in api client side for book params.
// we need a musicroutes.js in server/routes/api from l look like above
// we create a logic in client side that connects paramaters for both the book and music to match and populate front end.
