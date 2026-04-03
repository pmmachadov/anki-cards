// Modelo: DataStore - Persistencia usando localStorage

import { Deck } from './Deck';

const STORAGE_KEY = 'anki_cards_data';

export class DataStore {
  static saveDecks(decks) {
    try {
      const data = decks.map(deck => deck.toJSON());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving decks:', error);
      return false;
    }
  }

  static loadDecks() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      
      const parsed = JSON.parse(data);
      return parsed.map(d => Deck.fromJSON(d));
    } catch (error) {
      console.error('Error loading decks:', error);
      return [];
    }
  }

  static exportToJSON(decks) {
    return JSON.stringify(decks.map(d => d.toJSON()), null, 2);
  }

  static importFromJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      return data.map(d => Deck.fromJSON(d));
    } catch (error) {
      console.error('Error importing decks:', error);
      return null;
    }
  }

  static clearAll() {
    localStorage.removeItem(STORAGE_KEY);
  }
}
