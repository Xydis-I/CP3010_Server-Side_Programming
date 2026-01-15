"use strict";

const $ = selector => document.querySelector(selector);

let images = [];
let imageList = $("#image_list").children;

for (let index = 0; index < imageList.length; index++) {
    const element = imageList[index].firstChild;
    let image = new Image();
    image.src = element.href;
    image.title = element.title;
    images.push(image);
}

document.addEventListener("DOMContentLoaded", () => {
    $("#deer").addEventListener("click", () => { changeImage(images[1].src, images[1].title) });
    $("#release").addEventListener("click", () => { changeImage(images[0].src, images[0].title) });
    $("#hero").addEventListener("click", () => { changeImage(images[2].src, images[2].title) });
});

const changeImage = (name, caption) => {
    $("#image1").src = name;
    $("#caption").textContent = caption;
}