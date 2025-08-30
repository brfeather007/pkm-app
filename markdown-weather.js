// markdown-weather.js
function markdownWeather(md, options = {}) {
  // Use a custom syntax, e.g., :::weather
  const marker = ':::weather';

  function weatherRenderer(tokens, idx) {
    // Return placeholder div with unique id; JS will replace it later
    return `<div id="weather-widget-${idx}">Loading weather...</div>`;
  }

  function weatherParser(state, startLine, endLine, silent) {
    const pos = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];
    const line = state.src.slice(pos, max).trim();

    if (line !== marker) return false; // Not our marker

    if (silent) return true;

    const token = state.push('weather_widget', '', 0);
    token.block = true;
    token.map = [startLine, startLine + 1];

    state.line = startLine + 1;
    return true;
  }

  md.block.ruler.before('fence', 'weather_widget', weatherParser);
  md.renderer.rules.weather_widget = weatherRenderer;
}

export default markdownWeather;
