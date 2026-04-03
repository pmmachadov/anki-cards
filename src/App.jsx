import { useState, useEffect } from 'react'
import { DeckList } from './view/DeckList'
import { StudyView } from './view/StudyView'
import { CardEditor } from './view/CardEditor'
import { StatsView } from './view/StatsView'
import { DataStore } from './model/DataStore'
import { Deck } from './model/Deck'
import './App.css'

function App() {
  const [decks, setDecks] = useState([])
  const [currentView, setCurrentView] = useState('decks') // decks, study, edit, stats
  const [selectedDeck, setSelectedDeck] = useState(null)
  const [loading, setLoading] = useState(true)

  // Cargar mazos al iniciar
  useEffect(() => {
    const loadData = async () => {
      const savedDecks = DataStore.loadDecks()
      
      if (savedDecks.length === 0) {
        // Cargar mazo por defecto desde JSON
        try {
          const response = await fetch('/data/sistemas-informaticos.json')
          const data = await response.json()
          const defaultDeck = new Deck(data.name, data.id)
          defaultDeck.description = data.description
          defaultDeck.subject = data.subject
          
          data.cards.forEach(card => {
            defaultDeck.addCard(card.front, card.back, card.tags || [])
          })
          
          const newDecks = [defaultDeck]
          setDecks(newDecks)
          DataStore.saveDecks(newDecks)
        } catch (error) {
          console.error('Error loading default deck:', error)
        }
      } else {
        setDecks(savedDecks)
      }
      
      setLoading(false)
    }
    
    loadData()
  }, [])

  // Guardar mazos cuando cambian
  useEffect(() => {
    if (!loading) {
      DataStore.saveDecks(decks)
    }
  }, [decks, loading])

  const handleCreateDeck = (name, description = '') => {
    const newDeck = new Deck(name)
    newDeck.description = description
    setDecks([...decks, newDeck])
    return newDeck
  }

  const handleDeleteDeck = (deckId) => {
    setDecks(decks.filter(d => d.id !== deckId))
    if (selectedDeck?.id === deckId) {
      setSelectedDeck(null)
      setCurrentView('decks')
    }
  }

  const handleStudyDeck = (deck) => {
    setSelectedDeck(deck)
    setCurrentView('study')
  }

  const handleEditDeck = (deck) => {
    setSelectedDeck(deck)
    setCurrentView('edit')
  }

  const handleStatsDeck = (deck) => {
    setSelectedDeck(deck)
    setCurrentView('stats')
  }

  const handleUpdateDeck = (updatedDeck) => {
    setDecks(decks.map(d => d.id === updatedDeck.id ? updatedDeck : d))
    setSelectedDeck(updatedDeck)
  }

  const handleBack = () => {
    setCurrentView('decks')
    setSelectedDeck(null)
  }

  const handleResetProgress = (deckId) => {
    const deck = decks.find(d => d.id === deckId)
    if (deck) {
      deck.reset()
      setDecks([...decks])
    }
  }

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 onClick={handleBack} className="logo">
            <span className="logo-icon">◈</span>
            <span>AnkiCards</span>
          </h1>
          <nav className="nav">
            <button 
              className={`nav-btn ${currentView === 'decks' ? 'active' : ''}`}
              onClick={handleBack}
            >
              Mazos
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {currentView === 'decks' && (
          <DeckList 
            decks={decks}
            onCreateDeck={handleCreateDeck}
            onDeleteDeck={handleDeleteDeck}
            onStudyDeck={handleStudyDeck}
            onEditDeck={handleEditDeck}
            onStatsDeck={handleStatsDeck}
            onResetDeck={handleResetProgress}
          />
        )}
        
        {currentView === 'study' && selectedDeck && (
          <StudyView 
            deck={selectedDeck}
            onBack={handleBack}
            onUpdateDeck={handleUpdateDeck}
          />
        )}
        
        {currentView === 'edit' && selectedDeck && (
          <CardEditor 
            deck={selectedDeck}
            onBack={handleBack}
            onUpdateDeck={handleUpdateDeck}
          />
        )}

        {currentView === 'stats' && selectedDeck && (
          <StatsView 
            deck={selectedDeck}
            onBack={handleBack}
            onResetProgress={handleResetProgress}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>AnkiCards • Repeticion espaciada • {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default App
