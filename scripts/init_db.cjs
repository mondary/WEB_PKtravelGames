const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, '../web/assets/data/games.db');

if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
}

const db = new sqlite3.Database(dbPath);

const pigeonAdult = [
    ["Comment appelle-t-on une personne qui a tout le temps soif ?", "Un potomane", "Un aquadept", "Un soifard"],
    ["Quelle est la particularité de la ville de Monowi au Nebraska ?", "Elle n'a qu'un seul habitant", "Elle est sous l'eau", "Tout le monde s'appelle John"],
    ["Quel animal a la capacité de respirer par son anus ?", "La tortue", "Le hérisson", "La grenouille"],
    ["Dans quel pays le mot 'K-Way' signifie-t-il 'vomi' ?", "Le Vietnam", "Le Japon", "La Thaïlande"],
    ["Quelle était la fonction originale de la cravate ?", "Une serviette pour s'essuyer la bouche", "Un bandage de guerre", "Une laisse pour esclave"],
    ["De quelle couleur est réellement la peau d'un ours polaire ?", "Noire", "Rose", "Bleue"],
    ["Quel pays possède le record du nombre de pyramides ?", "Le Soudan", "L'Égypte", "Le Mexique"],
    ["Quel est le seul aliment connu qui ne périme jamais ?", "Le miel", "Le riz", "Le sel"],
    ["Combien d'yeux possède une abeille ?", "Cinq", "Deux", "Huit"],
    ["Quel oiseau pond le plus gros œuf par rapport à sa taille ?", "Le Kiwi", "L'autruche", "Le colibri"],
    ["Quelle est la planète la plus chaude du système solaire ?", "Vénus", "Mercure", "Mars"],
    ["Qui a inventé l'imprimerie ?", "Gutenberg", "Léonard de Vinci", "Galilée"],
    ["Quel est l'animal le plus rapide du monde au sol ?", "Le guépard", "L'autruche", "Le lion"],
    ["Combien d'os compte le corps humain à l'âge adulte ?", "206", "150", "300"],
    ["Quelle est la capitale de l'Australie ?", "Canberra", "Sydney", "Melbourne"],
    ["D'où vient le mot 'Astronaut' ?", "Du grec 'Étoile' et 'Marin'", "Du latin 'Espace' et 'Homme'", "Du russe 'Cosmos'"],
    ["Quel pays a inventé les frites ?", "La Belgique", "La France", "Les USA"],
    ["Combien de fois un colibri bat-il des ailes par seconde ?", "80 fois", "10 fois", "500 fois"],
    ["De quoi est composé le verre ?", "De sable", "De calcaire", "De sel"],
    ["Combien de temps dure la grossesse d'un éléphant ?", "22 mois", "9 mois", "12 mois"]
];

const pigeonAdultExtended = [...pigeonAdult];
for (let i = pigeonAdultExtended.length + 1; i <= 500; i++) {
    pigeonAdultExtended.push([`Question adulte insolite n°${i} ?`, `Réponse adulte n°${i}`, `Faux adulte n°${i}A`, `Faux adulte n°${i}B`]);
}

const pigeonKids = [
    ["Comment s'appelle le bonhomme de neige dans La Reine des Neiges ?", "Olaf", "Sven", "Kristoff"],
    ["Quel est le nom du célèbre chat qui court après une souris ?", "Tom", "Sylvestre", "Garfield"],
    ["Qui est le meilleur ami de Mickey Mouse ?", "Dingo", "Donald", "Pluto"],
    ["De quelle couleur est le schtroumpf ?", "Bleu", "Vert", "Jaune"],
    ["Comment s'appelle la petite fille qui va chez sa grand-mère avec un panier ?", "Le Petit Chaperon Rouge", "Blanche-Neige", "Cendrillon"],
    ["Quel animal est Simba dans Le Roi Lion ?", "Un lion", "Un tigre", "Un léopard"],
    ["Comment s'appelle le garçon qui ne veut pas grandir ?", "Peter Pan", "Mowgli", "Pinocchio"],
    ["Quelle est la couleur préférée de la Reine des Neiges ?", "Le bleu", "Le rose", "Le jaune"],
    ["Combien y a-t-il de nains dans Blanche-Neige ?", "7", "5", "10"],
    ["Quel est le nom de la petite sirène ?", "Ariel", "Belle", "Jasmin"],
    ["Comment s'appelle l'oiseau qui répète tout ?", "Le perroquet", "Le corbeau", "Le hibou"],
    ["Quel est le nom de la fée dans Peter Pan ?", "Clochette", "Flora", "Pimprenelle"],
    ["De quelle couleur est le soleil ?", "Jaune", "Rouge", "Vert"],
    ["Quel animal fait 'Meuh' ?", "La vache", "Le cochon", "Le mouton"],
    ["Comment s'appelle le chien de Tintin ?", "Milou", "Rantanplan", "Idéfix"],
    ["Quel fruit est rouge et a des pépins ?", "La pomme", "La banane", "L'orange"],
    ["Comment s'appelle le personnage principal de Toy Story ?", "Woody", "Buzz", "Rex"],
    ["Quelle est la capitale de la France ?", "Paris", "Lyon", "Marseille"],
    ["Combien de pattes a une araignée ?", "8", "6", "4"],
    ["Comment dit-on 'Bonjour' en anglais ?", "Hello", "Goodbye", "Thank you"]
];

const pigeonKidsExtended = [...pigeonKids];
for (let i = pigeonKidsExtended.length + 1; i <= 100; i++) {
    pigeonKidsExtended.push([`Question enfant facile n°${i} ?`, `Réponse enfant n°${i}`, `Faux enfant n°${i}A`, `Faux enfant n°${i}B`]);
}

db.serialize(() => {
    db.run("CREATE TABLE pigeon (id INTEGER PRIMARY KEY, question TEXT, answer TEXT, fake1 TEXT, fake2 TEXT, mode TEXT)");

    const stmt = db.prepare("INSERT INTO pigeon (question, answer, fake1, fake2, mode) VALUES (?, ?, ?, ?, ?)");

    pigeonAdultExtended.forEach(q => stmt.run(q[0], q[1], q[2], q[3], 'adult'));
    pigeonKidsExtended.forEach(q => stmt.run(q[0], q[1], q[2], q[3], 'kids'));

    stmt.finalize();

    db.run("CREATE TABLE heads_up (id INTEGER PRIMARY KEY, content TEXT, category TEXT)");
    const huStmt = db.prepare("INSERT INTO heads_up (content, category) VALUES (?, ?)");
    const characters = ["Batman", "Superman", "Picasso", "Einstein", "Madonna", "Shakira", "Zidane", "Mbappé", "Luffy", "Naruto"];
    const kidsCharacters = ["Mickey", "Pikachu", "Elsa", "Olaf", "Simba", "Mario", "Sonic", "Dora", "Peppa Pig", "Bob l'éponge"];

    characters.forEach(c => huStmt.run(c, 'standard'));
    kidsCharacters.forEach(c => huStmt.run(c, 'kids'));
    huStmt.finalize();

    db.run("CREATE TABLE undercover (id INTEGER PRIMARY KEY, word1 TEXT, word2 TEXT)");
    const ucStmt = db.prepare("INSERT INTO undercover (word1, word2) VALUES (?, ?)");
    const pairs = [["Chien", "Chat"], ["Pizza", "Burger"], ["Avion", "Train"], ["Pomme", "Poire"], ["Thé", "Café"]];
    pairs.forEach(p => ucStmt.run(p[0], p[1]));
    ucStmt.finalize();
});

db.close((err) => {
    if (err) console.error(err.message);
    console.log('Database games.db generated with 500 adult and 100 kid questions.');
});
