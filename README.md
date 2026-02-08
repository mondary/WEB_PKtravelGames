# PK Travel Games

![Project icon](icon.png)

[🇫🇷 FR](README.md) · [🇬🇧 EN](README_en.md)

✨ Collection de jeux sociaux pour vos voyages et soirées entre amis. PWA installable, 100% vanilla JS.

## ✅ Fonctionnalités

- **🐦 Le Pigeon** : Jeu de culture et de bluff. Inventez des mensonges crédibles pour piéger vos amis.
- **📱 Le Frontal** : Placez le téléphone sur votre front, faites deviner par inclinaison (accéléromètre).
- **🕵️ L'Espion** : Déduction sociale. Identifiez l'intrus parmi vous grâce à des indices subtils.
- **📲 PWA** : Installable sur mobile, fonctionne hors-ligne.

## 🧠 Utilisation

### Le Pigeon
1. Un joueur reçoit une question et sa vraie réponse
2. Il invente deux fausses réponses crédibles
3. Les autres doivent trouver la vraie parmi les trois

### Le Frontal
1. Collez le téléphone sur votre front
2. Inclinez **haut** = bonne réponse
3. Inclinez **bas** = passer
4. Maximum de points en 60 secondes

### L'Espion
- **Civils** : mot A
- **Undercovers** : mot B (proche de A)
- **Mr. White** : rien
- Décrivez, votez, éliminez le suspect !

## 📁 Structure

```
web/           # Site déployable (vanilla JS)
├── index.html
├── css/
├── js/
├── images/
├── icons/     # PWA icons
├── games.db   # Base SQLite (sql.js)
└── sw.js      # Service Worker
app/           # Futur packaging mobile
```

## 🚀 Déploiement

Pas de build. Déployer directement le dossier `web/` :

```bash
./scripts/deploy_ftp.sh
```

## 🧾 Changelog

- **1.1.0** : Refonte vanilla JS (suppression Vite/node_modules), nouvelle architecture web/, fix OVH (PHP proxy pour .db)
- **1.0.0** : Release initiale - 3 jeux, PWA, vanilla JS

## 🔗 Liens

- [README_en.md](README_en.md)
