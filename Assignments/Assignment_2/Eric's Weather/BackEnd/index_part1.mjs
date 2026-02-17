import express, { request, response } from "express";
import cors from "cors";

// node index.js

// nodemon
// npm run start

const app = express();      // create Express app object
app.use(cors());            // add CORS middleware
app.use(express.json());    // add JSON middleware

app.post("/api/weather", (request, response) => {
    const location = request.body;

    let description = ["Rain","Snow","Clouds","Sunshine"][Math.floor(Math.random() * 4)];
    let temperature = `${Math.floor(Math.random() * 25) - 4}°C`
    let windspeed = `${Math.floor(Math.random() * 8) + 16}km/h`

    response.json({
        "description":description, 
        "temperature":temperature,
        "windspeed":windspeed
    });
});

// listen for requests on port 3000
app.listen(3000, () => {
    console.log("API listening on port 3000.")
});
