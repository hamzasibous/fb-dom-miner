document.getElementById('downloadBtn').addEventListener('click', () => {
  chrome.storage.local.get(['fb_data'], (result) => {
    const data = result.fb_data || [];

    if (data.length === 0) {
      alert("No data found in storage. Scroll down on Facebook first!");
      return;
    }

    // Create a Blob from the JSON data
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Use Chrome's Downloads API which Brave inherits
    chrome.downloads.download({
      url: url,
      filename: `fb_data_${Date.now()}.json`,
      saveAs: true
    }, (downloadId) => {
      // Clean up the URL object after download starts
      URL.revokeObjectURL(url);
      
      if (chrome.runtime.lastError) {
        console.error("Brave Download Error:", chrome.runtime.lastError.message);
        alert("Download failed: " + chrome.runtime.lastError.message);
      }
    });
  });
});

document.getElementById('clearBtn').addEventListener('click', () => {
  chrome.storage.local.clear(() => {
    alert("Storage cleared!");
  });
});