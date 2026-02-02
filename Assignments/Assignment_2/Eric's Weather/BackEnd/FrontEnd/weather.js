 
 document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('citySelect');
    const display = document.getElementById('cityDisplay');
    const report = document.getElementById('report');

    select.addEventListener('change', async () => {
        report.textContent = "";

        if (select.value === "") {
            display.textContent = "No city selected.";
        } else {
            const selectedText = select.options[select.selectedIndex].text;
            display.textContent = "You selected: " + selectedText;

            let request = await fetch("http://localhost:3000/api/weather", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "city": selectedText })
            });

            let response = await request.json();

            let image = document.createElement('img');
            image.src = `https://openweathermap.org/payload/api/media/file/${response.icon}.png`;

            let description = document.createElement('p');
            description.textContent = response.description;
            let temperature = document.createElement('p');
            temperature.textContent = response.temperature;
            let windspeed = document.createElement('p');
            windspeed.textContent = response.windspeed;
            
            report.appendChild(image);
            report.appendChild(description);
            report.appendChild(temperature);
            report.appendChild(windspeed);
        }
    });
});