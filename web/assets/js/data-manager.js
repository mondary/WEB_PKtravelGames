// data-manager.js - Gestion des données sans dépendances externes

class DataManager {
  constructor() {
    this.dbName = 'TravelGamesDB';
    this.version = 1;
    this.data = null;
    this.ready = false;
  }

  // Charger les données depuis le stockage local
  async loadData() {
    return new Promise((resolve, reject) => {
      // D'abord, essayer de charger depuis localStorage
      const storedData = localStorage.getItem('travelGamesData');
      
      if (storedData) {
        try {
          this.data = JSON.parse(storedData);
          this.ready = true;
          resolve(this.data);
          return;
        } catch (e) {
          console.warn('Erreur lors du parsing des données locales:', e);
        }
      }

      // Si pas de données locales, charger depuis les fichiers JSON préchargés
      this.loadFromJSONFiles().then(() => {
        resolve(this.data);
      }).catch(reject);
    });
  }

  // Charger les données depuis des fichiers JSON statiques
  async loadFromJSONFiles() {
    const pigeonData = await this.fetchJSON('assets/data/pigeon.json');
    const headsUpData = await this.fetchJSON('assets/data/heads-up.json');
    const undercoverData = await this.fetchJSON('assets/data/undercover.json');

    this.data = {
      pigeon: pigeonData,
      heads_up: headsUpData,
      undercover: undercoverData
    };

    // Sauvegarder dans localStorage pour les prochaines fois
    localStorage.setItem('travelGamesData', JSON.stringify(this.data));
    this.ready = true;

    return this.data;
  }

  async fetchJSON(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors du chargement de ${path}:`, error);
      return [];
    }
  }

  // Méthode pour simuler l'exécution de requêtes SQL
  exec(query) {
    if (!this.data) {
      console.error('Données non chargées');
      return [];
    }

    // Parser la requête SQL simple pour pigeon
    if (query.includes('FROM pigeon')) {
      let results = [...this.data.pigeon];
      
      // Filtrer par mode si spécifié
      if (query.includes("WHERE mode = 'kids'")) {
        results = results.filter(item => item.mode === 'kids');
      } else if (query.includes("WHERE mode = 'adult'")) {
        results = results.filter(item => item.mode === 'adult');
      }
      
      // Sélectionner par ID si spécifié
      const idMatch = query.match(/id = (\d+)/);
      if (idMatch) {
        const id = parseInt(idMatch[1]);
        results = results.filter(item => item.id === id);
      }
      
      // Sélectionner un élément aléatoire si ORDER BY RANDOM()
      if (query.includes('ORDER BY RANDOM()')) {
        results = [results[Math.floor(Math.random() * results.length)]];
      }
      
      // Retourner le format attendu par l'application
      if (query.includes('SELECT id FROM')) {
        return [{
          columns: ['id'],
          values: results.map(item => [item.id])
        }];
      } else if (query.includes('SELECT * FROM pigeon WHERE id =')) {
        return [{
          columns: ['id', 'question', 'answer', 'fake1', 'fake2', 'mode'],
          values: results.map(item => [
            item.id,
            item.question,
            item.answer,
            item.fake1,
            item.fake2,
            item.mode
          ])
        }];
      }
    }
    
    // Méthode pour heads_up
    else if (query.includes('FROM heads_up')) {
      let results = [...this.data.heads_up];
      
      // Filtrer par catégorie
      const categoryMatch = query.match(/category = '([^']+)'/);
      if (categoryMatch) {
        const category = categoryMatch[1];
        results = results.filter(item => item.category === category);
      }
      
      if (query.includes('SELECT content FROM')) {
        return [{
          columns: ['content'],
          values: results.map(item => [item.content])
        }];
      }
    }
    
    // Méthode pour undercover
    else if (query.includes('FROM undercover')) {
      let results = [...this.data.undercover];
      
      // Retourner une paire aléatoire
      if (query.includes('ORDER BY RANDOM() LIMIT 1')) {
        const randomItem = results[Math.floor(Math.random() * results.length)];
        results = [randomItem];
        
        return [{
          columns: ['word1', 'word2'],
          values: results.map(item => [item.word1, item.word2])
        }];
      }
    }
    
    return [];
  }
}

// Exporter pour utilisation dans l'application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DataManager;
} else {
  window.DataManager = DataManager;
}