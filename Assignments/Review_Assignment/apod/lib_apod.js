// returns date string in YYYY-MM-DD format - default param value is today's date
export function getDateString(dt = new Date()) {
    return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
}

export async function getPicture(date) {
    const dateString = getDateString(date);
    const domain = `https://api.nasa.gov/planetary/apod`;
    const request = `?api_key=DEMO_KEY&date=${dateString}`;
    const response = await fetch(domain + request);
    return await response.json();  
}
