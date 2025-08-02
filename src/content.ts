// src/content.ts
// This script is injected into the page to convert HTML content to Markdown
import TurndownService from "turndown";

console.log("content.js injected! - 3");

const turndownService = new TurndownService();

const title = document.title;

const contentElement =
  document.querySelector("article") ||
  document.querySelector("main") ||
  document.body;

const htmlContent = contentElement.innerHTML;
const markdown = turndownService.turndown(htmlContent);

const blob = new Blob([`# ${title}\n\n${markdown}`], { type: "text/markdown" });
const url = URL.createObjectURL(blob);
const filename = title.replace(/[^a-z0-9]/gi, "_").toLowerCase() + ".md";

chrome.runtime.sendMessage({ url, filename });
