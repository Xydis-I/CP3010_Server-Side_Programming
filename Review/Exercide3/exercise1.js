"use strict";

const $ = selector => document.querySelector(selector);

let timer = null;
let count = 1;

document.addEventListener("DOMContentLoaded", () => {
    $("#start").addEventListener("click", () => { start() });
    $("#stop").addEventListener("click", () => { stop() });
});

const start = () => {
    timer = setInterval(() => {
        count++;
        $("#count").textContent = count;
    }, 1000);
}

const stop = () => {
    clearInterval(timer);
    count = 0;
}