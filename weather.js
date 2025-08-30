async function renderWeather() {
  const lat = 33.8753;  // Corona, CA
  const lon = -117.5664;
  const apiKey = "e40e5074d1a95df3d8b3d794eb5affd3";

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    // Build forecast HTML
    let html = `<div class="weather-widget"><h3>Corona, CA – 7-Day Forecast</h3><ul>`;
    data.daily.slice(0, 7).forEach(day => {
      const date = new Date(day.dt * 1000).toLocaleDateString();
      const desc = day.weather[0].description;
      const high = Math.round(day.temp.max);
      const low = Math.round(day.temp.min);
      html += `<li><strong>${date}</strong>: ${desc}, High: ${high}°F, Low: ${low}°F</li>`;
    });
    html += `</ul></div>`;

    // Replace placeholder in rendered Markdown
    document.body.innerHTML = document.body.innerHTML.replace("[WEATHER_WIDGET]", html);
  } catch (err) {
    console.error("Weather fetch failed:", err);
  }
}

renderWeather();
