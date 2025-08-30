import MarkdownIt from 'markdown-it';
import markdownWeather from './markdown-weather.js';

// --- Initialize Markdown-it once, with weather plugin ---
const md = new MarkdownIt({ linkify: true });
md.use(markdownWeather);

const contentDiv = document.getElementById("content");

// --- Load any note from `notes/` folder ---
async function loadNote(noteName = "index") {
  try {
    const res = await fetch(`notes/${noteName}.md`);
    if (!res.ok) throw new Error("Note not found");

    let text = await res.text();

    // Convert [[wiki-links]] → [note](#note)
    text = text.replace(/\[\[(.*?)\]\]/g, (_, rawNote) => {
      const note = rawNote.trim();
      const hash = encodeURIComponent(note);
      return `[${note}](#${hash})`;
    });

    contentDiv.innerHTML = md.render(text);

    // After rendering, populate weather widgets if any
    import('./weather.js');
  } catch (err) {
    contentDiv.innerHTML = `<p>⚠️ Note not found.</p>`;
  }
}

// --- Handle navigation via hash (#note-name) ---
window.addEventListener("hashchange", () => {
  const noteName = decodeURIComponent(location.hash.slice(1));
  loadNote(noteName || "index");
});

// --- Initial load ---
const initialNote = decodeURIComponent(location.hash.slice(1)) || "index";
loadNote(initialNote);
