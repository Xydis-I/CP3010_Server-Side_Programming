"use strict";

const getElement = selector => document.querySelector(selector);

const usersURL = "https://jsonplaceholder.typicode.com/users";
const todoURL = "https://jsonplaceholder.typicode.com/todos/?userId=";

document.addEventListener("DOMContentLoaded", async() => {
    // load <select> element
    const usersResponse = await fetch(usersURL);
    let users = await usersResponse.json();
    const selectElement = getElement("#users");
    selectElement.textContent = "";  // clear previous <option> elements

    let header = getElement("#list").firstElementChild;

    // create and add <option> element for each email 
    for (let user of users) {
        const option = document.createElement("option");
        option.value = user.id;
        const text = user.name;
        option.appendChild(document.createTextNode(text));
        selectElement.appendChild(option);
    }

    // display to-do items for first user in <select> element
    const todoResponse = await fetch(todoURL + users[0].id);
    let todoList = await todoResponse.json();

    // create and add <option> element for each email 
    displayToDoList(todoList);

    // event handler for <select> change event
    getElement("#users").addEventListener("change", async() => {
        //Reset List
        getElement("#list").textContent = "";

        const todoResponse = await fetch(todoURL + getElement("#users").value);
        let todoList = await todoResponse.json();

        //Fix Header
        const selectList = getElement("#list");
        selectList.appendChild(header);

        // create and add <option> element for each email 
        displayToDoList(todoList);
    });
 });


 const displayToDoList = (todoList) => {
    for (let todo of todoList) {
        const todoRow = document.createElement("tr");

        const todoItem = document.createElement("td");
        todoItem.textContent = todo.title;
        const todoComplete = document.createElement("td");
        todoComplete.textContent = todo.completed;

        todoRow.appendChild(todoItem);
        todoRow.appendChild(todoComplete);

        getElement("#list").appendChild(todoRow);
    }
 }