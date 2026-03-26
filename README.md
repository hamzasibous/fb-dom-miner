# FaceBook DOM Miner: Collecting DOM data while doom scrolling

**FB Dom Miner** is a lightweight Chrome/Brave extension designed to turn passive social media browsing into active data collection. Built for researchers and data scientists, it extracts post captions and comments directly from the Facebook DOM and auto-archives them into JSON files.

---

## Features

* **Passive Extraction:** Runs in the background using a `MutationObserver` to detect new posts as they load dynamically.
* **Brave Optimized:** Specifically tested to work with Brave’s strict fingerprinting and security settings.
* **Auto-Archive:** Automatically triggers a JSON download once a specific threshold of posts (e.g., 10-20) is reached.
* **De-duplication:** Uses a local `Set` of IDs to ensure the same post isn't saved twice during a single session.
* **Deep DOM Scanning:** Targets `dir="auto"` and `role="article"` to bypass Facebook’s dynamic, obfuscated React-based class names.

---

## Tech Stack

* **Language:** JavaScript (ES6+)
* **APIs:** Chrome Extensions API (Manifest V3), Chrome Storage, Chrome Downloads.
* **Core Logic:** DOM `MutationObserver` for handling asynchronous React-based UIs.

---

## Project Structure

```text
doom-miner/
├── manifest.json      # Extension permissions and background config
├── background.js      # Service worker handling the download triggers
├── content.js         # The "Scraper" engine that watches the DOM
├── popup.html         # UI for manual downloads and clearing storage
└── popup.js           # Logic for the extension popup UI
 ```
## Installation

1. **Clone the Repo:**
   ```bash
   git clone https://github.com/hamzasibous/fb-dom-miner.git
     ```
2. **Load in Browser:**

* Open brave://extensions or chrome://extensions.

* Enable Developer mode (toggle in the top right).

* Click Load unpacked and select the doom-miner folder.

3. **Configure Brave (Important):**

* To allow auto-downloads without annoying popups, go to brave://settings/downloads.

* Toggle OFF "Ask where to save each file before downloading."

## Download Frequency & Threshold

* **Batch Size:** By default, the tool is set to a `SAVE_THRESHOLD` of **20 posts**.
* **Automatic Trigger:** Once 20 new unique posts (including their comments) are captured in the browser storage, the background service worker automatically triggers a `.json` file download.
* **Session Persistence:** If you close the tab before hitting the threshold, the data remains in `chrome.storage.local` and will resume counting the next time you open the feed.

## Customizing the Frequency
If you want the files to download more or less frequently, you can modify the constant at the top of `content.js`:

```javascript
// Change 20 to your desired number of posts per file
const SAVE_THRESHOLD = 20;

## Disclaimer
This tool is for educational and personal research purposes only. Users are responsible for complying with the target platform's Terms of Service. Always respect user privacy and do not distribute private data without consent.
```
* Make sure to Refresh Extension after each code change.

## Contributing

All contributions are welcome! Whether you are fixing a bug, adding a new feature, or simply updating the CSS selectors because Facebook changed their DOM again, your help is appreciated.

### How to contribute:
1. **Fork** the repository.
2. **Create a new branch** (`git checkout -b feature/AmazingFeature`).
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`).
4. **Push to the branch** (`git push origin feature/AmazingFeature`).
5. **Open a Pull Request**.

### Areas that need help:
* **Selector Maintenance:** Updating `content.js` when Facebook updates their UI.
* **Data Processing:** Adding Python/R scripts to the `/scripts` folder for data cleaning.
* **Feature Requests:** Implementing auto-scroll or multi-tab support.

---

## Author

**Hamza Sibous**
*  **Excellence Bachelor's in Data Science & AI** — Faculty of Sciences, Meknes (University Moulay Ismaïl).
*  **Profiles:** [GitHub](https://github.com/hamzasibous) | [Kaggle](https://www.kaggle.com/hamzasibous) | [Hugging Face](https://huggingface.co/hamzasibous)
---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.











