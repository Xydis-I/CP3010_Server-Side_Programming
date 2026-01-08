const $ = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
    $("#calculate").addEventListener("click", () => {calculate()})
    $("#reset").addEventListener("click", () => {reset()})
});

const calculate = () => {
    let price = parseFloat($("#price").value);
    let rate = parseFloat($("#rate").value);

    if ( isNaN(price) || price <= 0 ) {
        alert("The price must be a valid number greater than 0");
    } else if ( isNaN(rate) || rate <= 1 || rate >= 13 ) {
        alert("The tax rate must be a valid number between 2 and 12");
    } else {
        $("#total").value = (price * ( 1 + rate / 100 )).toFixed(2);
    }
}

const reset = () => {
    $("#price").value = "";
    $("#rate").value = "";
    $("#total").value = "";
}