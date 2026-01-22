import express, { request, response } from "express";
import cors from "cors";

// node index.js

// nodemon
// npm run start

const prizes = {
    0: "You Lose",
    1: "$5",
    2: "$10",
    3: "$15",
    4: "$100",
    5: "$100000"
}

let winningNumbers = [];

for (let number = 0; number < 5; number++) {
    winningNumbers.push(Math.floor(Math.random() * 14) + 1);
}

const app = express();      // create Express app object
app.use(cors());            // add CORS middleware
app.use(express.json());    // add JSON middleware

// route that handles GET requests to the API root
app.get("/", (request, response) => {
    response.json({info: "An API that includes CORS headers."});
});

// Takes an array, "[4, 6, 13, 11, 3]", returns a string, "$15".
app.post("/api/checkticket", (request, response) => {
    const ticket = request.body;
    let matches = 0;

    for (const number of ticket) {
        if (winningNumbers.includes(number)) {
            matches++;
        }
    }

    response.json(prizes[matches]);
});

// listen for requests on port 3000
app.listen(3000, () => {
    console.log("API listening on port 3000.")
});
