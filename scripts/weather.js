async function renderWeather() {
  const lat = 33.8753;  // Corona, CA
  const lon = -117.5664;
  const apiKey = "e40e5074d1a95df3d8b3d794eb5affd3";

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const widgets = document.querySelectorAll('[id^="weather-widget-"]');
    widgets.forEach(widget => {
      const current = data.current;
      const daily = data.daily.slice(0, 7);

      let html = `<div class="weather-widget">
        <h3>Corona, CA – Current Weather</h3>
        <p><strong>${Math.round(current.temp)}°F</strong> – ${current.weather[0].description}</p>
        <p>Feels like: ${Math.round(current.feels_like)}°F | Humidity: ${current.humidity}% | Wind: ${current.wind_speed} mph</p>
        <h4>7-Day Forecast</h4>
        <ul>`;

      daily.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
        const desc = day.weather[0].description;
        const high = Math.round(day.temp.max);
        const low = Math.round(day.temp.min);
        html += `<li><strong>${date}</strong>: ${desc}, High: ${high}°F, Low: ${low}°F</li>`;
      });

      html += `</ul></div>`;
      widget.innerHTML = html;
    });
  } catch (err) {
    console.error("Weather fetch failed:", err);
    const widgets = document.querySelectorAll('[id^="weather-widget-"]');
    widgets.forEach(widget => {
      widget.innerHTML = "<p>⚠️ Unable to load weather data.</p>";
    });
  }
}

renderWeather();
