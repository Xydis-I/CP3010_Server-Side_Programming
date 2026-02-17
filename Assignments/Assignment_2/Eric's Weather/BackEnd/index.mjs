import express, { request, response } from "express";
import path from "path";
import dotenv from 'dotenv';
import { fileURLToPath } from "url";
dotenv.config();

// node index.js

// nodemon
// npm run start

const app = express();      // create Express app object
app.use(express.json());    // add JSON middleware

// index.html available at http://localhost:3000/
const file = fileURLToPath(import.meta.url);
const dir = path.dirname(file);
app.use(express.static(path.join(dir, "FrontEnd"))); // Required for weather.js
app.get("/", (request, response) => {
    response.sendFile(path.join(dir, "FrontEnd", "index.html"));
});

// Two API calls, first a fetch to the Direct Geocoding API to convert city to coordinates, second to that Current Weather API.
app.post("/api/weather", async(request, response) => {
    const location = request.body;
    const limit = 1;
    const apiKey = process.env.API_SECRET_KEY;

    let geoRequest = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location.city},CA&limit=${limit}&appid=${apiKey}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let geoData = await geoRequest.json();

    let cityRequest = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let weatherData = await cityRequest.json();

    response.json({
        "description":weatherData.weather[0].main, 
        "temperature":`${(weatherData.main.temp - 273.15).toFixed(0)}°C`, 
        "windspeed":`${weatherData.wind.speed}km/h`,
        "icon":weatherData.weather[0].icon
    });
});

// listen for requests on port 3000
app.listen(3000, () => {
    console.log("API listening on port 3000.")
});
