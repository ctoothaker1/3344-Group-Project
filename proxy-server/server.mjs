import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); //pull all environment files from .env into server

const app = express(); // create a new express application

const baseUrl = "https://www.themealdb.com/api/json/v1/"; //
const apiKey = process.env.API_KEY;
app.use(cors());

    console.log("✅ CORS middleware is running");
// fetch the api using express application
// this will be specific to our api idk what it should look like
// all api related tasks should be here to shield it from the frontend
app.get('/api/recipes', async(request, response) => {
    const {query} = request.query; 

    console.log("query in server.mjs recieved from client:", query);

    const endpoint = `${baseUrl}${apiKey}/search.php?s=${query}`; //correct
    console.log('API endpoint:', endpoint);

    try {
        const apiResponse = await fetch(endpoint);
        
        // console.log("response from the api:", apiResponse);
        
        if (!response.status === 200) { // check if the response is not ok (200)
            // throw an error
            throw new Error(`error (server.mjs): ${apiResponse.status}`);
        }
        const data = await apiResponse.json();

        response.json(data);//send response back to the client
    }
    catch(error){ // handle any errors that are thrown
        console.error("Error fetching data from API (server.mjs)", error);
        // response.status(500).json({error: 'Failed to fetch data (server.mjs)'}); // 500 is standard error code from server

    }
}) 

app.listen(5001, () => { //5001 is port
    console.log("server is running on port 5001");
})