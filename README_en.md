# PK Travel Games

![Project icon](icon.png)

[🇬🇧 EN](README_en.md) · [🇫🇷 FR](README.md)

✨ Social party games collection for travel and evenings with friends. Installable PWA, 100% vanilla JS.

## ✅ Features

- **🐦 Le Pigeon** : Trivia & bluff game. Invent believable lies to fool your friends.
- **📱 Le Frontal** : Place the phone on your forehead, guess by tilting (accelerometer).
- **🕵️ L'Espion** : Social deduction. Identify the impostor among you with subtle clues.
- **📲 PWA** : Installable on mobile, works offline.

## 🧠 Usage

### Le Pigeon
1. One player receives a question and its true answer
2. They invent two believable fake answers
3. Others must find the real one among three

### Le Frontal
1. Put the phone on your forehead
2. Tilt **up** = correct answer
3. Tilt **down** = pass
4. Maximum points in 60 seconds

### L'Espion
- **Civilians** : word A
- **Undercovers** : word B (close to A)
- **Mr. White** : nothing
- Describe, vote, eliminate the suspect!

## 📁 Structure

```
web/           # Deployable site (vanilla JS)
├── index.html
├── css/
├── js/
├── images/
├── icons/     # PWA icons
├── games.db   # SQLite database (sql.js)
└── sw.js      # Service Worker
```

## 🚀 Deployment

No build needed. Deploy the `web/` folder directly via FTP (see `skill_FTP_OVH_deploy.md`).

## 🧾 Changelog

- **1.1.0** : Vanilla JS refactor (removed Vite/node_modules), new web/ architecture, OVH fix (PHP proxy for .db)
- **1.0.0** : Initial release - 3 games, PWA, vanilla JS

## 🔗 Links

- [README.md](README.md)
