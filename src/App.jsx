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
        const deckFiles = [
          '/data/sistemas-informaticos.json',
          '/data/entornos-desarrollo.json',
          '/data/interconexion-redes-eac3.json',
          '/data/dom-consulta-busqueda.json',
          '/data/dwec-unidad3-dom-parte2.json',
          '/data/dom-eventos.json',
          '/data/dom-estilos-css.json',
          '/data/dom-actualizacion-elementos.json',
          '/data/dwec-u3l2-actualitzacio-dom.json',
          '/data/dom-ejemplos-practicos.json',
          '/data/dom-d3js.json'
        ]

        const results = await Promise.allSettled(
          deckFiles.map(url => fetch(url).then(r => r.json()))
        )

        const newDecks = []
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            const data = result.value
            const deck = new Deck(data.name, data.id)
            deck.description = data.description || ''
            deck.subject = data.subject || ''
            if (Array.isArray(data.cards)) {
              data.cards.forEach(card => {
                deck.addCard(card.front, card.back, card.tags || [])
              })
            }
            newDecks.push(deck)
          } else {
            console.error(`Error loading ${deckFiles[index]}:`, result.reason)
          }
        })

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
