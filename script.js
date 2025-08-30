const md = window.markdownit({ linkify: true });
const contentDiv = document.getElementById("content");

// Load note from `notes/` folder
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
  } catch (err) {
    contentDiv.innerHTML = `<p>⚠️ Note not found.</p>`;
  }
}

// Handle navigation via hash (#note-name)
window.addEventListener("hashchange", () => {
  const noteName = decodeURIComponent(location.hash.slice(1));
  loadNote(noteName || "index");
});

// Initial load
const initialNote = decodeURIComponent(location.hash.slice(1)) || "index";
loadNote(initialNote);



import MarkdownIt from 'markdown-it';
import markdownWeather from './markdown-weather.js';

// Initialize Markdown-it with the weather plugin
const md = new MarkdownIt();
md.use(markdownWeather);

// Load Markdown note
async function loadDashboard() {
  const res = await fetch('./notes/dashboard.md');
  const rawMarkdown = await res.text();

  const html = md.render(rawMarkdown);
  document.getElementById('app').innerHTML = html;

  // After Markdown renders, populate weather
  import('./weather.js');
}

loadDashboard();

