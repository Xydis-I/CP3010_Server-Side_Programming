"use strict"

const getElement = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
    let textElements = document.querySelectorAll(['h1','h2','p']);

    for (const element of textElements) {
        element.addEventListener("mouseenter", async () => {
            let request = await fetch("http://localhost:3000/api/encrypt", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "Text": element.textContent, "Shift": 2 })
            });
            let response = await request.json();
            element.textContent = response;
        });

        element.addEventListener("mouseleave", async () => {
            let request = await fetch("http://localhost:3000/api/decrypt", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "Text": element.textContent, "Shift": 2 })
            });
            let response = await request.json();
            element.textContent = response;
        });
    }
})

