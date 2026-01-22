"use strict"

const jokes = {
    joke1: {
        question: "Why do fathers take an extra pair of socks when they go golfing?",
        answer: "In case they get a hole in one!"
    },
    joke2: {
        question: "I have a degree in the design and mechanics of television controllers?",
        answer: "I don't know what I'm going to do with this remote knowledge."
    },
    joke3: {
        question: "How many tickles does it take to tickle an octopus?",
        answer: "Ten-tickles!"
    }
}

export class JokeMachine {
    getNextJoke() {
        let keys = Object.keys(jokes);
        return jokes[keys[Math.floor(keys.length * Math.random())]];
    }
}