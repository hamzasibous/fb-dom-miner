chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TRIGGER_DOWNLOAD") {
    const jsonString = JSON.stringify(message.data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // We use a Data URL here for the background service worker
    const reader = new FileReader();
    reader.onloadend = function() {
      chrome.downloads.download({
        url: reader.result,
        filename: `fb_autosave_${Date.now()}.json`,
        saveAs: false // This makes it download automatically without asking where!
      });
    };
    reader.readAsDataURL(blob);
  }
});