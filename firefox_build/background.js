console.log("background.js loaded");try{if(typeof chrome.scripting==="undefined")console.warn("Firefox fallback for MV2"),chrome.browserAction.onClicked.addListener((e)=>{if(e?.id!=null)chrome.tabs.executeScript(e.id,{file:"content.js"})});else console.log("Chrome MV3"),chrome.action.onClicked.addListener(async(e)=>{if(e.id!==void 0)await chrome.scripting.executeScript({target:{tabId:e.id},files:["content.js"]})})}catch(e){console.error("Background script error:",e)}

//# debugId=B99202D1C7F5884164756E2164756E21
//# sourceMappingURL=background.js.map
