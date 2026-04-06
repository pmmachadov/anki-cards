// Modelo: Deck - Gestiona las tarjetas y el algoritmo de repetición espaciada

export const DIFFICULTY = {
  AGAIN: 0,    // No la sabía - repetir inmediatamente
  HARD: 1,     // Difícil - intervalo corto
  GOOD: 2,     // Bien - intervalo normal
  EASY: 3      // Fácil - intervalo largo
};

// Factores de intervalo base (en días)
const INTERVAL_FACTORS = {
  [DIFFICULTY.AGAIN]: 1,      // 1 día
  [DIFFICULTY.HARD]: 2,       // 2 días
  [DIFFICULTY.GOOD]: 3,       // 3 días
  [DIFFICULTY.EASY]: 4        // 4 días
};

export class Card {
  constructor(id, front, back, tags = []) {
    this.id = id;
    this.front = front;
    this.back = back;
    this.tags = tags;
    
    // Estado de repetición espaciada
    this.interval = 0;
    this.repetitions = 0;
    this.easinessFactor = 2.5;
    this.nextReview = Date.now();
    this.lastReviewed = null;
    this.status = 'new';
  }

  review(difficulty) {
    this.lastReviewed = Date.now();
    
    if (difficulty === DIFFICULTY.AGAIN) {
      this.repetitions = 0;
      this.easinessFactor = Math.max(1.3, this.easinessFactor - 0.2);
      this.interval = INTERVAL_FACTORS[DIFFICULTY.AGAIN];
      this.status = 'relearning';
    } else {
      this.repetitions++;
      
      if (difficulty === DIFFICULTY.HARD) {
        this.easinessFactor -= 0.15;
      } else if (difficulty === DIFFICULTY.EASY) {
        this.easinessFactor += 0.15;
      }
      this.easinessFactor = Math.max(1.3, this.easinessFactor);
      
      if (this.repetitions === 1) {
        this.interval = INTERVAL_FACTORS[difficulty];
      } else if (this.repetitions === 2) {
        this.interval = INTERVAL_FACTORS[difficulty] * 2;
      } else {
        this.interval = Math.round(this.interval * this.easinessFactor);
      }
      
      this.status = this.repetitions >= 2 ? 'review' : 'learning';
    }
    
    this.nextReview = Date.now() + (this.interval * 24 * 60 * 60 * 1000);
    
    return {
      interval: this.interval,
      nextReview: this.nextReview,
      status: this.status
    };
  }

  isDue() {
    return Date.now() >= this.nextReview;
  }

  getNextReviewText() {
    const now = Date.now();
    const diff = this.nextReview - now;
    
    if (diff <= 0) return 'Ahora';
    
    const days = Math.ceil(diff / (24 * 60 * 60 * 1000));
    if (days === 1) return '1 día';
    return `${days} días`;
  }
}

export class Deck {
  constructor(name, id) {
    this.id = id || Date.now().toString();
    this.name = name;
    this.cards = [];
    this.created = Date.now();
    this.lastStudied = null;
    this.studyStats = {
      totalReviews: 0,
      again: 0,
      hard: 0,
      good: 0,
      easy: 0,
      streak: 0,
      bestStreak: 0,
      studyHistory: []
    };
  }

  addCard(front, back, tags = []) {
    const id = `${this.id}_${this.cards.length}`;
    const card = new Card(id, front, back, tags);
    this.cards.push(card);
    return card;
  }

  removeCard(cardId) {
    this.cards = this.cards.filter(c => c.id !== cardId);
  }

  getDueCards() {
    return this.cards.filter(card => card.isDue());
  }

  getNewCards() {
    return this.cards.filter(card => card.status === 'new');
  }

  getLearningCards() {
    return this.cards.filter(card => card.status === 'learning' || card.status === 'relearning');
  }

  getStats() {
    const newCards = this.getNewCards().length;
    const learning = this.getLearningCards().length;
    const due = this.getDueCards().length;
    const reviewed = this.cards.filter(c => c.status === 'review').length;
    
    return {
      total: this.cards.length,
      new: newCards,
      learning: learning,
      due: due,
      reviewed: reviewed,
      mastery: this.cards.length > 0 
        ? Math.round((reviewed / this.cards.length) * 100) 
        : 0
    };
  }

  recordReview(difficulty) {
    const today = new Date().toDateString();
    const lastDate = this.lastStudied ? new Date(this.lastStudied).toDateString() : null;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    // Update streak
    if (lastDate !== today) {
      if (lastDate === yesterday) {
        this.studyStats.streak++;
      } else if (lastDate !== today) {
        this.studyStats.streak = 1;
      }
      
      if (this.studyStats.streak > this.studyStats.bestStreak) {
        this.studyStats.bestStreak = this.studyStats.streak;
      }
    }
    
    // Update difficulty stats
    this.studyStats.totalReviews++;
    const key = Object.keys(DIFFICULTY)[difficulty].toLowerCase();
    if (this.studyStats[key] !== undefined) {
      this.studyStats[key]++;
    }
    
    // Add to history
    this.studyStats.studyHistory.push({
      date: Date.now(),
      difficulty: key
    });
    
    // Keep only last 90 days
    const ninetyDaysAgo = Date.now() - (90 * 24 * 60 * 60 * 1000);
    this.studyStats.studyHistory = this.studyStats.studyHistory.filter(h => h.date > ninetyDaysAgo);
    
    this.lastStudied = Date.now();
  }

  reset() {
    this.cards.forEach(card => {
      card.interval = 0;
      card.repetitions = 0;
      card.easinessFactor = 2.5;
      card.nextReview = Date.now();
      card.lastReviewed = null;
      card.status = 'new';
    });
    this.studyStats = {
      totalReviews: 0,
      again: 0,
      hard: 0,
      good: 0,
      easy: 0,
      streak: 0,
      bestStreak: this.studyStats.bestStreak,
      studyHistory: []
    };
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      cards: this.cards,
      created: this.created,
      lastStudied: this.lastStudied,
      studyStats: this.studyStats
    };
  }

  static fromJSON(data) {
    const deck = new Deck(data.name, data.id);
    deck.created = data.created;
    deck.lastStudied = data.lastStudied;
    deck.studyStats = data.studyStats || { 
      totalReviews: 0, 
      again: 0, 
      hard: 0, 
      good: 0, 
      easy: 0,
      streak: 0, 
      bestStreak: 0,
      studyHistory: []
    };
    deck.cards = data.cards.map(c => {
      const card = new Card(c.id, c.front, c.back, c.tags);
      Object.assign(card, c);
      return card;
    });
    return deck;
  }
}
