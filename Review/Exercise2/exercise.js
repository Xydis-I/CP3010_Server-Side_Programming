"use strict"

const $ = (selector) => document.querySelector(selector);


document.addEventListener("DOMContentLoaded", () => {
   $("#login").addEventListener("click", () => {login()});
   $("#resetButton").addEventListener("click", () => {reset()});
});

const login = () => {
    let email = $("#email_address1").value;
    let password = $("#password").value;
    let robot = $("#robot").checked;

    let isValidEmail = false;
    let isValidPassword = false;

    if (email == "") {
        isValidEmail = false;
        $("#email_address1").nextElementSibling.textContent = "Invalid email";
    } else {
        isValidEmail = true;
        $("#email_address1").nextElementSibling.textContent = "*";
    }

    if (password == "") {
        isValidPassword = false;
        $("#password").nextElementSibling.textContent = "Invalid password";
    } else {
        isValidPassword = true;
        $("#password").nextElementSibling.textContent = "*";
    }

    if (!robot) {
        $("#robot").nextElementSibling.textContent = "Need to check box";
    } else {
        $("#robot").nextElementSibling.textContent = "*";
    }

    if (isValidEmail && isValidPassword && robot) {
        document.location = "join.html";
    }
}

const reset = () => {
    $("#email_address1").value = "";
    $("#password").value = "";
    $("#robot").checked = false;

    $("#email_address1").nextElementSibling.textContent = "*";
    $("#password").nextElementSibling.textContent = "*";
    $("#robot").nextElementSibling.textContent = "*";
}