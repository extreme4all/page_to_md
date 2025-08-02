// src/background.ts
// This script runs in the background and handles the download of the Markdown file
console.log("background.js loaded");

try {
  if (typeof chrome.scripting === "undefined") {
    console.warn("Firefox fallback for MV2");
    chrome.browserAction.onClicked.addListener((tab) => {
      if (tab?.id != null) {
        chrome.tabs.executeScript(tab.id, { file: "content.js" });
      }
    });
  } else {
    console.log("Chrome MV3");
    chrome.action.onClicked.addListener(async (tab) => {
      if (tab.id !== undefined) {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"],
        });
      }
    });
  }
} catch (err) {
  console.error("Background script error:", err);
}

