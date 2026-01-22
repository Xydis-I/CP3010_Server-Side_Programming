import { JokeMachine } from "./jokeModule.js";

"use strict";

const getElement = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
    let jokeMachine = new JokeMachine();

    getElement("#Next").addEventListener("click", () => {
        let joke = jokeMachine.getNextJoke();
        getElement("#question").textContent = joke.question;
        getElement("#answer").textContent = joke.answer;
    });
});