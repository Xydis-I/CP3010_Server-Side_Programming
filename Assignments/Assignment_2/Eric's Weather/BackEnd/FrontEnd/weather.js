 
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

            // OpenWeather offers Weather Condition Icons.
            // Note: It seems they violated their own documentation at some point so most the .png names are not what they're supposed to be.
            //       I've thrown together some lazy error handling below to take care of it.

            const icons = "https://openweathermap.org/payload/api/media/file/";

            let image = document.createElement('img');
            image.src = primary(icons, response.icon);
            image.dataset.code = response.icon;

            image.addEventListener("error", (e) => {
                const target = e.currentTarget;
                const code = target.dataset.code;

                const fb = fallback(icons, code);
                
                // Prevents infinite loop if fallback also fails, turns out the 'Broken Clouds' png is always 04d.png and is the only instance of this.
                if (target.src === fb){
                    target.src = icons + "04d.png";
                    return;
                }

                target.src = fb;
            });

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

function primary(url, code) {
    return `${url}${code}.png`;
}

// 13n -> 13d_n, 13d -> 13d_n
function fallback(url, code) {
    return `${url}${code.replace(/[dn]$/, "d_n")}.png`;
}