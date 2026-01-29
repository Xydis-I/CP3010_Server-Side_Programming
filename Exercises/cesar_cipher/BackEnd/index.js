import express, { request, response } from "express";
import cors from "cors";

// node index.js

// nodemon
// npm run start

const app = express();      // create Express app object
app.use(cors());            // add CORS middleware
app.use(express.json());    // add JSON middleware

// route that handles GET requests to the API root
app.get("/", (request, response) => {
    response.json({info: "An API that includes CORS headers."});
});

app.post("/api/encrypt", (request, response) => {
    let cryptogram = request.body;
    response.json(caesar(cryptogram.Text, cryptogram.Shift));
});

app.post("/api/decrypt", (request, response) => {
    let cryptogram = request.body;
    response.json(caesar(cryptogram.Text, cryptogram.Shift * -1));
});

// listen for requests on port 3000
app.listen(3000, () => {
    console.log("API listening on port 3000.")
});

function caesar(text, shift) {
    let result = "";

    for (let char of text) {
        if (char >= 'A' && char <= 'Z') {
            const code = char.charCodeAt(0) - 65;
            const shifted = (code + shift + 26) % 26;
            result += String.fromCharCode(shifted + 65);
        }
        else if (char >= 'a' && char <= 'z') {
            const code = char.charCodeAt(0) - 97;
            const shifted = (code + shift + 26) % 26;
            result += String.fromCharCode(shifted + 97);
        }
        else {
            result += char;
        }
    }
    return result;
}