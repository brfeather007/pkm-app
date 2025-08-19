const md = window.markdownit();
const contentDiv = document.getElementById("content");

// Load note from `notes/` folder
async function loadNote(noteName = "index") {
  try {
    const res = await fetch(`notes/${noteName}.md`);
    if (!res.ok) throw new Error("Note not found");

    let text = await res.text();

    // Convert [[wiki-links]] → <a href="#note-name">note-name</a>
    text = text.replace(/\[\[(.*?)\]\]/g, (_, note) => {
      return `<a href="#${note}">${note}</a>`;
    });

    contentDiv.innerHTML = md.render(text);
  } catch (err) {
    contentDiv.innerHTML = `<p>⚠️ Note not found.</p>`;
  }
}

// Handle navigation via hash (#note-name)
window.addEventListener("hashchange", () => {
  const noteName = location.hash.slice(1);
  loadNote(noteName);
});

// Initial load
const initialNote = location.hash.slice(1) || "index";
loadNote(initialNote);
