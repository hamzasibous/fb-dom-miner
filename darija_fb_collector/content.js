let scrapedIds = new Set();

// 1. Load existing IDs from storage on startup
chrome.storage.local.get(['scrapedIds'], (result) => {
  if (result.scrapedIds) scrapedIds = new Set(result.scrapedIds);
});

const SAVE_THRESHOLD = 20; 

// 2. The modified Save Function
function saveToStorage(newData) {
  chrome.storage.local.get(['fb_data'], (result) => {
    const existingData = result.fb_data || [];
    const updatedData = [...existingData, ...newData];
    
    // Always update the permanent ID list so we don't duplicate
    chrome.storage.local.set({ 'scrapedIds': Array.from(scrapedIds) });

    if (updatedData.length >= SAVE_THRESHOLD) {
      console.log("Threshold reached! Sending to background for download...");
      chrome.runtime.sendMessage({ 
        type: "TRIGGER_DOWNLOAD", 
        data: updatedData 
      });
      // Clear data storage after sending to download
      chrome.storage.local.set({ 'fb_data': [] });
    } else {
      chrome.storage.local.set({ 'fb_data': updatedData });
      console.log(`Current session storage: ${updatedData.length}/${SAVE_THRESHOLD}`);
    }
  });
}

function scrapeVisiblePosts() {
  const posts = document.querySelectorAll('div[role="article"]');
  const newData = [];

  posts.forEach(post => {
    const allTextBlocks = Array.from(post.querySelectorAll('div[dir="auto"], span[dir="auto"]'))
                               .map(el => el.innerText.trim())
                               .filter(text => text.length > 0);

    if (allTextBlocks.length === 0) return;

    // Use a unique snippet of the text as the ID
    const caption = allTextBlocks.find(t => t.length > 30) || allTextBlocks[0];
    const postId = caption.substring(0, 50).replace(/\s+/g, '');

    if (!scrapedIds.has(postId)) {
      scrapedIds.add(postId);
      
      const comments = allTextBlocks.filter(t => t !== caption && t.length > 1);

      newData.push({
        caption: caption,
        comments: comments,
        timestamp: new Date().toISOString()
      });
    }
  });

  // CRITICAL FIX: Call saveToStorage instead of doing it manually here
  if (newData.length > 0) {
    saveToStorage(newData);
  }
}

// 3. Watch for scrolling
const observer = new MutationObserver(() => scrapeVisiblePosts());
observer.observe(document.body, { childList: true, subtree: true });

// Initial run
scrapeVisiblePosts();