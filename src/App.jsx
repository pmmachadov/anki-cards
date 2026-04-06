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
      let savedDecks = DataStore.loadDecks()
      
      try {
        // Cargar mazos por defecto desde JSON
        const [response1, response2] = await Promise.all([
          fetch('/data/sistemas-informaticos.json'),
          fetch('/data/entornos-desarrollo.json')
        ])
        
        const data1 = await response1.json()
        const data2 = await response2.json()
        
        // Verificar si los mazos por defecto ya existen
        const existingIds = savedDecks.map(d => d.id)
        const newDecks = []
        
        if (!existingIds.includes(data1.id)) {
          const deck1 = new Deck(data1.name, data1.id)
          deck1.description = data1.description
          deck1.subject = data1.subject
          data1.cards.forEach(card => {
            deck1.addCard(card.front, card.back, card.tags || [])
          })
          newDecks.push(deck1)
        }
        
        if (!existingIds.includes(data2.id)) {
          const deck2 = new Deck(data2.name, data2.id)
          deck2.description = data2.description
          deck2.subject = data2.subject
          data2.cards.forEach(card => {
            deck2.addCard(card.front, card.back, card.tags || [])
          })
          newDecks.push(deck2)
        }
        
        // Combinar mazos guardados con nuevos mazos por defecto
        if (newDecks.length > 0) {
          savedDecks = [...savedDecks, ...newDecks]
          DataStore.saveDecks(savedDecks)
        }
        
        setDecks(savedDecks)
      } catch (error) {
        console.error('Error loading default decks:', error)
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
    </div>
  )
}

export default App
