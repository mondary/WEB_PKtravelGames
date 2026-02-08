# PK Travel Games

![Project icon](logo.png)

[🇬🇧 EN](README_en.md) · [🇫🇷 FR](README.md)

✨ A collection of premium social games for your travels, parties, and commutes, designed with a modern and interactive aesthetic.

## ✅ Features

- **📱 Premium Design**: Interface based on Glassmorphism, vibrant gradients, and smooth animations.
- **🐦 The Pigeon**: A game of trivia and bluffing. Invent more credible lies than the truth to trick your friends.
- **📱 Heads Up**: Place the phone on your forehead and guess celebrities or characters via tilt gestures (Accelerometer).
- **🕵️ Undercover**: A social deduction game. Identify the intruder (Undercover or Mr. White) among you using subtle clues.

## 🧠 Usage

### 1. The Pigeon
- One player receives a question and its correct answer.
- This player must invent two credible fake answers.
- Other players must find the real answer among the three options.

### 2. Heads Up
- Choose the mode and stick the phone on your forehead (screen facing others).
- Tilt **up** to validate a correct answer.
- Tilt **down** to skip to the next one.
- The goal is to guess as many as possible in 60 seconds.

### 3. Undercover
- **Civilians**: Receive word A.
- **Undercovers**: Receive word B (closely related to A).
- **Mr. White**: Receives no word.
- Each player describes their word. Then, vote to eliminate the one who seems suspicious!

## ⚙️ Settings
- The game is optimized for Mobile (Responsive Design).
- Uses the `DeviceOrientation` API for "Heads Up" mode.
- Integrated vibration system for premium haptic feedback.

## 📦 Build & Package
The application is built with **Vite**:
```bash
npm install
npm run dev    # Launch locally
npm run build  # Prepare for production
```

## 🧪 Install (Antigravity)
Simply clone the repository and launch the development server. No backend required, everything is client-side (Vanilla JS).

## 🧾 Changelog
- **1.0.0**: Initial release with 3 game modes: The Pigeon, Heads Up, and Undercover. Glassmorphism interface and motion tracking system.

## 🔗 Links
- FR README: [README.md](README.md)
