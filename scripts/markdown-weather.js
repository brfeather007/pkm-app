// Defines the Markdown-it plugin
function markdownWeather(md) {
  const marker = ':::weather';

  function weatherRenderer(tokens, idx) {
    return `<div id="weather-widget-${idx}">Loading weather...</div>`;
  }

  function weatherParser(state, startLine, endLine, silent) {
    const pos = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];
    const line = state.src.slice(pos, max).trim();

    if (line !== marker) return false;
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
