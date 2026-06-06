
# 🌐 Nafis Translator Beta

A clean, fast, and fully responsive web app to translate text between **100+ languages** instantly. No API key, no build step, no backend required. Just open and translate.

![Status](https://img.shields.io/badge/status-beta-blueviolet)
![License](https://img.shields.io/badge/license-MIT-green)
![Made with](https://img.shields.io/badge/made%20with-HTML%20%7C%20CSS%20%7C%20JS-orange)

## ✨ Features

- 🌍 **100+ languages** with automatic language detection
- 🔄 One-click **language swap**
- 🔊 **Text-to-speech** for both source and translated text
- 📋 **Copy to clipboard** with a single click
- 🌙 **Dark / light theme** (remembered between visits)
- 🔢 Live **character counter** (up to 5000 chars)
- ⌨️ **Keyboard shortcut**: `Ctrl + Enter` to translate
- 📱 Fully **responsive** design for mobile and desktop
- ⚡ **No API key** and **no build step** required

## 🚀 Demo

Live demo: `https://<your-username>.github.io/nafis-translator/`

> Replace `<your-username>` with your GitHub username after deploying.

## 📦 Project Structure

```
nafis-translator/
├── index.html    # App markup
├── style.css     # Styling and themes
├── app.js        # Translation logic and interactions
└── README.md
```

## 🛠️ Getting Started

### Run locally

Clone the repo and open `index.html` in your browser:

```bash
git clone https://github.com/<your-username>/nafis-translator.git
cd nafis-translator
```

Then open `index.html` directly, or serve it locally:

```bash
# Python 3
python -m http.server 8000
# Visit http://localhost:8000
```

### Deploy to GitHub Pages

1. Push the project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Choose branch `main` and folder `/ (root)`, then **Save**.
5. Your app will be live at `https://<your-username>.github.io/nafis-translator/`.

## 🧩 How It Works

The app sends text to Google's free public translation endpoint and renders the response client-side. Language detection, text-to-speech (via the browser's `SpeechSynthesis` API), and theming all run entirely in the browser.

## ⚠️ Disclaimer

This Beta uses Google's **unofficial public endpoint**, which is rate-limited and intended for demos and personal use. For production or heavy traffic, switch to an official service such as:

- [Google Cloud Translation API](https://cloud.google.com/translate)
- [DeepL API](https://www.deepl.com/pro-api)
- [LibreTranslate](https://libretranslate.com/) (open source, self-hostable)

## 🤝 Contributing

Contributions are welcome. Open an issue or submit a pull request with improvements, bug fixes, or new features.

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by **Nafis**
