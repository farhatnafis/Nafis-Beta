// Nafis Translator Beta
const LANGUAGES = {
  auto: "Detect Language", af: "Afrikaans", sq: "Albanian", am: "Amharic",
  ar: "Arabic", hy: "Armenian", az: "Azerbaijani", eu: "Basque",
  be: "Belarusian", bn: "Bengali", bs: "Bosnian", bg: "Bulgarian",
  ca: "Catalan", ceb: "Cebuano", ny: "Chichewa", "zh-CN": "Chinese (Simplified)",
  "zh-TW": "Chinese (Traditional)", co: "Corsican", hr: "Croatian", cs: "Czech",
  da: "Danish", nl: "Dutch", en: "English", eo: "Esperanto", et: "Estonian",
  tl: "Filipino", fi: "Finnish", fr: "French", fy: "Frisian", gl: "Galician",
  ka: "Georgian", de: "German", el: "Greek", gu: "Gujarati", ht: "Haitian Creole",
  ha: "Hausa", haw: "Hawaiian", iw: "Hebrew", hi: "Hindi", hmn: "Hmong",
  hu: "Hungarian", is: "Icelandic", ig: "Igbo", id: "Indonesian", ga: "Irish",
  it: "Italian", ja: "Japanese", jw: "Javanese", kn: "Kannada", kk: "Kazakh",
  km: "Khmer", ko: "Korean", ku: "Kurdish", ky: "Kyrgyz", lo: "Lao", la: "Latin",
  lv: "Latvian", lt: "Lithuanian", lb: "Luxembourgish", mk: "Macedonian",
  mg: "Malagasy", ms: "Malay", ml: "Malayalam", mt: "Maltese", mi: "Maori",
  mr: "Marathi", mn: "Mongolian", my: "Myanmar", ne: "Nepali", no: "Norwegian",
  ps: "Pashto", fa: "Persian", pl: "Polish", pt: "Portuguese", pa: "Punjabi",
  ro: "Romanian", ru: "Russian", sm: "Samoan", gd: "Scots Gaelic", sr: "Serbian",
  st: "Sesotho", sn: "Shona", sd: "Sindhi", si: "Sinhala", sk: "Slovak",
  sl: "Slovenian", so: "Somali", es: "Spanish", su: "Sundanese", sw: "Swahili",
  sv: "Swedish", tg: "Tajik", ta: "Tamil", te: "Telugu", th: "Thai", tr: "Turkish",
  uk: "Ukrainian", ur: "Urdu", uz: "Uzbek", vi: "Vietnamese", cy: "Welsh",
  xh: "Xhosa", yi: "Yiddish", yo: "Yoruba", zu: "Zulu"
};

const $ = (id) => document.getElementById(id);
const sourceLang = $("sourceLang");
const targetLang = $("targetLang");
const sourceText = $("sourceText");
const targetText = $("targetText");
const status = $("status");

// Populate language dropdowns
function populateLanguages() {
  for (const [code, name] of Object.entries(LANGUAGES)) {
    sourceLang.add(new Option(name, code));
    if (code !== "auto") targetLang.add(new Option(name, code));
  }
  sourceLang.value = "auto";
  targetLang.value = "en";
}

// Core translation via free Google endpoint
async function translate() {
  const text = sourceText.value.trim();
  if (!text) { status.textContent = "Please enter some text."; return; }

  const btn = $("translateBtn");
  btn.disabled = true;
  status.textContent = "Translating...";
  targetText.value = "";

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang.value}&tl=${targetLang.value}&dt=t&q=${encodeURIComponent(text)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    targetText.value = data[0].map((chunk) => chunk[0]).join("");
    const detected = data[2];
    if (sourceLang.value === "auto" && detected) {
      $("detected").textContent = "Detected: " + (LANGUAGES[detected] || detected);
    }
    status.textContent = "Done ✓";
  } catch (e) {
    status.textContent = "Translation failed. Please try again.";
  } finally {
    btn.disabled = false;
  }
}

// Text-to-speech
function speak(text, lang) {
  if (!text) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "auto" ? "en" : lang;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

// Event listeners
function init() {
  populateLanguages();
  $("year").textContent = new Date().getFullYear();

  $("translateBtn").addEventListener("click", translate);

  sourceText.addEventListener("input", () => {
    $("charCount").textContent = `${sourceText.value.length} / 5000`;
  });

  sourceText.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") translate();
  });

  $("swapBtn").addEventListener("click", () => {
    if (sourceLang.value === "auto") return;
    [sourceLang.value, targetLang.value] = [targetLang.value, sourceLang.value];
    [sourceText.value, targetText.value] = [targetText.value, sourceText.value];
  });

  $("clearSource").addEventListener("click", () => {
    sourceText.value = "";
    targetText.value = "";
    $("charCount").textContent = "0 / 5000";
    $("detected").textContent = "";
  });

  $("copyTarget").addEventListener("click", async () => {
    if (!targetText.value) return;
    await navigator.clipboard.writeText(targetText.value);
    status.textContent = "Copied ✓";
  });

  $("speakSource").addEventListener("click", () => speak(sourceText.value, sourceLang.value));
  $("speakTarget").addEventListener("click", () => speak(targetText.value, targetLang.value));

  // Theme toggle (persisted)
  const themeBtn = $("themeToggle");
  const saved = localStorage.getItem("theme");
  if (saved === "dark") { document.body.setAttribute("data-theme", "dark"); themeBtn.textContent = "☀️"; }
  themeBtn.addEventListener("click", () => {
    const dark = document.body.getAttribute("data-theme") === "dark";
    document.body.setAttribute("data-theme", dark ? "light" : "dark");
    themeBtn.textContent = dark ? "🌙" : "☀️";
    localStorage.setItem("theme", dark ? "light" : "dark");
  });
}

init();
