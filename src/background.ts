// src/background.ts
// This script runs in the background and handles the download of the Markdown file
console.log("background.js loaded");

// background.js

if (typeof chrome.scripting === "undefined") {
  console.warn("Firefox fallback for MV2");
  chrome.browserAction.onClicked.addListener((tab) => {
    if (tab.id !== undefined) {
      chrome.tabs.executeScript(tab.id, { file: "build/content.bundle.js" });
    }
  });
} else {
  console.log("Chrome MV3");
  chrome.action.onClicked.addListener(async (tab) => {
    if (tab.id !== undefined) {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["build/content.bundle.js"],
      });
    }
  });
}

chrome.runtime.onMessage.addListener((message) => {
  chrome.downloads.download({
    url: message.url,
    filename: message.filename,
    saveAs: true,
  });
});
