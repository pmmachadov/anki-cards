import { useState, useEffect } from 'react'
import { DeckList } from './view/DeckList'
import { StudyView } from './view/StudyView'
import { CardEditor } from './view/CardEditor'
import { StatsView } from './view/StatsView'
import { DataStore } from './model/DataStore'
import { Deck } from './model/Deck'
import './App.css'

// Iconos SVG
const FullscreenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
  </svg>
)

const ExitFullscreenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
  </svg>
)

function App() {
  const [decks, setDecks] = useState([])
  const [currentView, setCurrentView] = useState('decks') // decks, study, edit, stats
  const [selectedDeck, setSelectedDeck] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Cargar mazos al iniciar
  useEffect(() => {
    const loadData = async () => {
      // FORZAR RECARGA: Limpiar localStorage y recrear mazos por defecto
      localStorage.removeItem('anki-decks')
      
      try {
        // Cargar mazos por defecto desde JSON
        const [response1, response2, response3, response4] = await Promise.all([
          fetch('/data/sistemas-informaticos.json'),
          fetch('/data/entornos-desarrollo.json'),
          fetch('/data/shoptimus-fundamentos.json'),
          fetch('/data/dom-consulta-busqueda.json')
        ])
        
        const data1 = await response1.json()
        const data2 = await response2.json()
        const data3 = await response3.json()
        const data4 = await response4.json()
        
        // Crear mazos frescos
        const deck1 = new Deck(data1.name, data1.id)
        deck1.description = data1.description
        deck1.subject = data1.subject
        data1.cards.forEach(card => {
          deck1.addCard(card.front, card.back, card.tags || [])
        })
        
        const deck2 = new Deck(data2.name, data2.id)
        deck2.description = data2.description
        deck2.subject = data2.subject
        data2.cards.forEach(card => {
          deck2.addCard(card.front, card.back, card.tags || [])
        })
        
        const deck3 = new Deck(data3.name, data3.id)
        deck3.description = data3.description
        deck3.subject = data3.subject
        data3.cards.forEach(card => {
          deck3.addCard(card.front, card.back, card.tags || [])
        })
        
        const deck4 = new Deck(data4.name, data4.id)
        deck4.description = data4.description
        deck4.subject = data4.subject
        data4.cards.forEach(card => {
          deck4.addCard(card.front, card.back, card.tags || [])
        })
        
        const newDecks = [deck1, deck2, deck3, deck4]
        setDecks(newDecks)
        DataStore.saveDecks(newDecks)
      } catch (error) {
        console.error('Error loading default decks:', error)
        setDecks([])
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

  const handleClearAllData = async () => {
    // Limpiar localStorage
    DataStore.clearAll()
    // Recargar la página para recrear los mazos desde cero
    window.location.reload()
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true)
      }).catch(err => {
        console.log('Error al entrar en pantalla completa:', err)
      })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false)
      }).catch(err => {
        console.log('Error al salir de pantalla completa:', err)
      })
    }
  }

  // Escuchar cambios de fullscreen (por si el usuario usa ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div className={`app ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      <button 
        className="fullscreen-btn" 
        onClick={toggleFullscreen}
        title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
      >
        {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
      </button>
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
            onClearAllData={handleClearAllData}
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
