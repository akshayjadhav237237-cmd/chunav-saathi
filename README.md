# चुनाव साथी — Chunav Saathi 🗳️

> **Maharashtra Rural Voter Education PWA**  
> *तुमचे मत, तुमची ताकद — Your Vote, Your Power*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://chunav-saathi-mocha.vercel.app)
[![PWA](https://img.shields.io/badge/PWA-Offline%20First-blue?style=for-the-badge)](https://chunav-saathi-mocha.vercel.app)
[![Languages](https://img.shields.io/badge/Languages-मराठी%20|%20हिंदी%20|%20English-orange?style=for-the-badge)](https://chunav-saathi-mocha.vercel.app)

---

## 🌐 Live App

**[https://chunav-saathi-mocha.vercel.app](https://chunav-saathi-mocha.vercel.app)**

---

## 📱 About

Chunav Saathi (चुनाव साथी) is an **offline-first Progressive Web App** designed to educate rural voters in Maharashtra about the democratic voting process. It supports three languages — Marathi, Hindi, and English — and uses voice readout (Web Speech API) for low-literacy users.

Built for the **Election Commission of India (ECI)** voter education initiative.

---

## ✨ Features

| Screen | Description |
|--------|-------------|
| 🗳️ **Voting Process** | 9-step interactive walkthrough of Election Day |
| ⚡ **EVM Simulator** | Practice pressing buttons on a virtual Electronic Voting Machine with VVPAT animation |
| 🧠 **Quiz** | 10 multiple-choice questions with instant feedback and score report |
| 🔍 **Myth Busters** | 5 expandable cards debunking common electoral myths (EVM hacking, NOTA, etc.) |
| 📋 **Voter Rules** | Tabbed Do's and Don'ts for election day |
| 🏆 **Certificate** | Personalized "Aware Voter" certificate with confetti + share button |
| 🔊 **Voice Readout** | Every screen has TTS via Web Speech API (🔊 FAB button) |
| 📶 **Offline-First** | Service Worker caches all assets — works without internet |

---

## 🛠 Tech Stack

- **Vanilla HTML / CSS / JavaScript** — zero dependencies, zero build step
- **Web Speech API** — TTS voice readout in Marathi/Hindi/English
- **Service Worker** — Cache-first offline PWA
- **Noto Sans Devanagari** — supports Devanagari script for मराठी & हिंदी

---

## 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/akshayjadhav237237-cmd/chunav-saathi.git
cd chunav-saathi

# Serve with any static file server
npx serve . -p 3000
# Then open http://localhost:3000
```

---

## 📂 Project Structure

```
chunav-saathi/
├── css/
│   ├── tokens.css          ← Design system variables
│   ├── main.css            ← Shell, splash, nav, animations
│   └── screens.css         ← Per-screen styles
├── js/
│   ├── app.js              ← Router, state, navigation
│   ├── voice.js            ← TTS wrapper
│   ├── data/
│   │   ├── content.js      ← All UI text (mr/hi/en)
│   │   └── quiz-data.js    ← Quiz, myths & rules data
│   └── screens/
│       ├── language.js     ← Language picker
│       ├── home.js         ← Home 6-card grid
│       ├── explainer.js    ← 9-step voting walkthrough
│       ├── evm.js          ← EVM simulator
│       ├── quiz.js         ← 10-question MCQ quiz
│       ├── myths.js        ← Myth buster cards
│       ├── rules.js        ← Do's & Don'ts tabs
│       └── certificate.js  ← Certificate + confetti
├── icons/                  ← PWA icons (192, 512, apple-touch)
├── index.html              ← App shell + splash screen
├── manifest.json           ← PWA manifest
├── sw.js                   ← Service worker (cache v2)
└── vercel.json             ← Vercel deployment config
```

---

## 🎨 Design

- **Primary**: ECI Blue `#004B87`
- **Action**: Green `#2E7D32`
- **Touch targets**: Minimum 60×60px for rural usability
- **Font**: Noto Sans Devanagari (supports mr/hi/en in one typeface)

---

## 📜 License

Built for public good — free to use and adapt for voter education purposes.

*Election Commission of India | मतदान हा अधिकार आणि जबाबदारी आहे*
