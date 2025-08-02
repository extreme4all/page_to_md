import TurndownService from "turndown";

const turndownService = new TurndownService();

const title = document.title;

// Format current date as YYYY-MM-DD
const now = new Date();
const dateStr = now.toISOString().slice(0, 10); // 'YYYY-MM-DD'

const contentElement =
  document.querySelector("article") ||
  document.querySelector("main") ||
  document.body;

const htmlContent = contentElement?.innerHTML ?? "";
const markdown = turndownService.turndown(htmlContent);

// Create Blob & Download Link
const blob = new Blob(
  [`# ${title}\n\n${markdown}`],
  { type: "text/markdown" }
);
const url = URL.createObjectURL(blob);

// Sanitize title for filename
let filename = title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
filename = filename.replace(/_+/g, "_");
filename = `${dateStr}_${filename}.md`;

// add download link to the page & request download & remove it
const a = document.createElement("a");
a.href = url;
a.download = filename;
a.style.display = "none";
document.body.appendChild(a);
a.click();
a.remove();

URL.revokeObjectURL(url);
