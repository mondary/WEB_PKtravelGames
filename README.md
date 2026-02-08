# PK Travel Games

![Project icon](logo.png)

[🇫🇷 FR](README.md) · [🇬🇧 EN](README_en.md)

✨ Une collection de jeux sociaux premium pour vos voyages, soirées et trajets, conçue avec une esthétique moderne et interactive.

## ✅ Fonctionnalités

- **📱 Design Premium** : Interface basée sur le Glassmorphism, des dégradés vibrants et des animations fluides.
- **🐦 Le Pigeon** : Un jeu de culture et de bluff. Inventez des mensonges plus crédibles que la vérité pour piéger vos amis.
- **📱 Le Frontal (Heads Up)** : Placez le téléphone sur votre front et faites deviner des célébrités ou personnages par inclinaison (Accéléromètre).
- **🕵️ L'Espion (Undercover)** : Un jeu de déduction sociale. Identifiez l'intrus (Undercover ou Mr. White) parmi vous grâce à des indices subtils.

## 🧠 Utilisation

### 1. Le Pigeon
- Un joueur reçoit une question et sa réponse correcte.
- Ce joueur doit inventer deux fausses réponses crédibles.
- Les autres joueurs doivent retrouver la vraie réponse parmi les trois propositions.

### 2. Le Frontal
- Choisissez le mode et collez le téléphone sur votre front (écran vers les autres).
- Inclinez vers le **haut** pour valider une bonne réponse.
- Inclinez vers le **bas** pour passer à la suivante.
- Le but est d'en déviner un maximum en 60 secondes.

### 3. L'Espion (Undercover)
- **Civils** : Reçoivent le mot A.
- **Undercovers** : Reçoivent le mot B (proche de A).
- **Mr. White** : Ne reçoit rien.
- Chaque joueur décrit son mot. Votez ensuite pour éliminer celui qui vous paraît suspect !

## ⚙️ Réglages
- Le jeu est optimisé pour Mobile (Responsive Design).
- Utilise l'API `DeviceOrientation` pour le mode "Le Frontal".
- Système de vibration intégré pour un retour haptique premium.

## 📦 Build & Package
L'application est construite avec **Vite** :
```bash
npm install
npm run dev    # Lancer en local
npm run build  # Préparer pour la production
```

## 🧪 Installation (Antigravity)
Clonez simplement le dépôt et lancez le serveur de développement. Aucun backend requis, tout est géré côté client (Vanilla JS).

## 🧾 Changelog
- **1.0.0** : Release initiale avec 3 modes de jeux : Le Pigeon, Le Frontal et Undercover. Interface Glassmorphism et système de mouvement.

## 🔗 Liens
- EN README : [README_en.md](README_en.md)
