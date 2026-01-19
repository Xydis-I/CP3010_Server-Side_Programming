import { getDateString, getPicture } from "./lib_apod.js";

"use strict";

function getElement(selector) {
    return document.querySelector(selector);
}


function clear() {
    getElement("#title").textContent = "";
    getElement("#display").textContent = "";
    getElement("#explanation").textContent = "";
    getElement("#msg").textContent = "";
}

function displayPicture(data) {
    
    if (data.error) {                          // error
        getElement("#msg").textContent = data.error.message; 
    } 
    else if (data.code) {                     // problem
        getElement("#msg").textContent = data.msg; 
    }      
    else {                                    // success 
        // header
        getElement("#title").textContent = data.title;

        // image or video
        const displayDiv = getElement("#display");
        if (data.media_type === "image") {
            const img = document.createElement("img");
            img.src = data.url;
            img.alt = "NASA photo";
            img.width = 700;
            displayDiv.appendChild(img);
        } 
        else if (data.media_type === "video") {
            const iframe = document.createElement("iframe");
            iframe.src = data.url;
            iframe.allowFullscreen = true;
            iframe.setAttribute("frameborder", "0");
            displayDiv.appendChild(iframe);
        }

        // text
        getElement("#explanation").textContent = data.explanation;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // set textbox to today's date in YYYY-MM-DD format 
    const dateTextbox = getElement("#date");
    dateTextbox.value = getDateString();
    dateTextbox.focus();

    getElement("#view_button").addEventListener("click", async () => {
        clear();  // clear any previous display
        
        const dateString = getElement("#date").value;
        const date = new Date(dateString);

        if (date == "Invalid Date") {
            const msg = "Please enter a valid date in YYYY-MM-DD format.";
            getElement("#msg").textContent = msg;
        } else {
            try {
                const data = await getPicture(date);
                displayPicture(data);
            } catch(e) {
                getElement("#msg").textContent = e.message;
            }
        }

        getElement("#date").focus();
    });
});