import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); //pull all environment files from .env into server

const app = express(); // create a new express application

const baseUrl = "https://api.edamam.com/api/recipes/v2?type=public";
const apiKey = process.env.API_KEY;
const appId = process.env.APP_ID;

app.use(cors(
    //tells the browser that these endpoints are safe, it will not error once we specify our endpoints
    {
        origin: ["http://localhost:5173", "http://localhost:5000"],
        methods: ["GET","POST"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));

// fetch the api using express application
// this will be specific to our api idk what it should look like
// all api related tasks should be here to shield it from the frontend
app.get('/api/recipes', async(request, response) => {
    const {query} = request.query; 


    const endpoint = `${baseUrl}&q=${query}&app_id=${appId}&app_key=${apiKey}` //correct

    try {
        const response = await fetch(endpoint);
        if (!response.ok){
            // throw an error
            throw new Error(`error (server.mjs): ${response.status}`);
        }
        const data = await response.json();
        response.json(data);
    }
    catch(error){ // handle any errors that are thrown
        console.error("Error fetching data from API (server.mjs)", error);
        response.status(500).json({error: 'Failed to fetch data (server.mjs)'}); // 500 is standard error code from server

    }
}) 

app.listen(5000, () => { //5000 is port
    console.log("server is running");
})