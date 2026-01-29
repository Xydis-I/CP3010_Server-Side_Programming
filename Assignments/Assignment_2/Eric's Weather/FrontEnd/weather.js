 
 document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('citySelect');
    const display = document.getElementById('cityDisplay');

    select.addEventListener('change', () => {
        if (select.value === "") {
            display.textContent = "No city selected.";
        } else {
            const selectedText = select.options[select.selectedIndex].text;
            display.textContent = "You selected: " + selectedText;
        }
    });
});