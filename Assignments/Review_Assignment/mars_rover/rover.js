"use strict";
const getElement = selector => document.querySelector(selector);

const domain = "https://rovers.nebulum.one/api/v1/rovers";



document.addEventListener("DOMContentLoaded", async () => {
    // get rover data
    const response = await fetch(domain);
    const json = await response.json();

    displayRovers(json.rovers);
    displayRoverData(json.rovers[getElement("#rover").value - 1]);

    // change event handler for Rover drop-down
    getElement("#rover").addEventListener("change", async (evt) => {
        displayRoverData(json.rovers[getElement("#rover").value - 1]);
    });

    // click event handler for View button
    getElement("#view").addEventListener("click", async () => {
        displayImages(json.rovers[getElement("#rover").value - 1].name, `${getElement("#year").value}-${getElement("#month").value}-${getElement("#date").value}`, getElement("#camera").value);
    });

    getElement("#month").addEventListener("change", () => { setDays(getElement("#year").value, getElement("#month").value); });
});

function displayRovers(rovers) {
    const selectElement = getElement("#rover");
    selectElement.textContent = "";  // clear previous <option> elements
    
    // create and add <option> element for each rover
    for (let rover of rovers) {
        const option = document.createElement("option");
        option.value = rover.id;
        const text = rover.name;
        option.appendChild(document.createTextNode(text));
        selectElement.appendChild(option);
    }
}

function displayRoverData(rover) {
    getElement("#status").textContent = rover.status;
    getElement("#photos").textContent = rover.total_photos;
    getElement("#landing").textContent = rover.landing_date;
    getElement("#max").textContent = rover.max_date;
    setDateSelects(rover.landing_date, rover.max_date);
    displayRoverCameras(rover.cameras);

    if (getElement("#options").classList.contains("hide")) {
        getElement("#options").classList.toggle("hide");
    }
}

function displayRoverCameras(cameras) {
    const selectElement = getElement("#camera");
    selectElement.textContent = "";  // clear previous <option> elements
    
    // create and add <option> element for each rover
    for (let camera of cameras) {
        const option = document.createElement("option");
        option.value = camera.name;
        const text = camera.full_name;
        option.appendChild(document.createTextNode(text));
        selectElement.appendChild(option);
    }
}

async function displayImages(rover, date, camera) {
    const response = await fetch(`${domain}/${rover}/photos/?earth_date=${date}&camera=${camera}`);
    const json = await response.json();

    const selectElement = getElement("#display");
    selectElement.textContent = "";

    for (const photo of json.photos) {
        const img = document.createElement("img");
        img.src = photo.img_src;
        selectElement.appendChild(img); 
    }
}

function setDateSelects(landingDate, maxDate) {
    let landing_date = new Date(landingDate.split('-'));
    let max_date = new Date(maxDate.split('-'));

    const yearSelectElement = getElement("#year");
    yearSelectElement.textContent = "";
    const monthSelectElement = getElement("#month");
    monthSelectElement.textContent = "";
    const dateSelectElement = getElement("#date");
    dateSelectElement.textContent = "";

    for (let year = landing_date.getFullYear(); year <= max_date.getFullYear(); year++) {
        const option = document.createElement("option");
        option.value = year;
        const text = year;
        option.appendChild(document.createTextNode(text));
        yearSelectElement.appendChild(option);        
    }

    for (let month = 1; month <= 12; month++) {
        const option = document.createElement("option");
        option.value = month;
        const text = month;
        option.appendChild(document.createTextNode(text));
        monthSelectElement.appendChild(option);        
    }

    setDays(yearSelectElement.value, monthSelectElement.value);
}

function setDays(year, month) {
    const dateSelectElement = getElement("#date");
    dateSelectElement.textContent = "";

    for (let day = 1; day <= daysInMonth(year, month); day++) {
        const option = document.createElement("option");
        option.value = day;
        const text = day;
        option.appendChild(document.createTextNode(text));
        dateSelectElement.appendChild(option);        
    }
}

function daysInMonth (year, month) {
    return new Date(year, month, 0).getDate();
}