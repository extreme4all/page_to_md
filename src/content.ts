import TurndownService from "turndown";

const turndownService = new TurndownService();

const title = document.title;
const contentElement =
  document.querySelector("article") ||
  document.querySelector("main") ||
  document.body;

const htmlContent = contentElement.innerHTML;
const markdown = turndownService.turndown(htmlContent);

// Create Blob & Download Link
const blob = new Blob([`# ${title}\n\n${markdown}`], {
  type: "text/markdown",
});
const url = URL.createObjectURL(blob);
const filename = title.replace(/[^a-z0-9]/gi, "_").toLowerCase() + ".md";

const a = document.createElement("a");
a.href = url;
a.download = filename;
a.style.display = "none";
document.body.appendChild(a);
a.click();
a.remove();

URL.revokeObjectURL(url); // Clean up the object URL
