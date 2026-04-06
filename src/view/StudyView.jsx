import { useState, useEffect, useCallback } from 'react'
import { DIFFICULTY } from '../model/Deck'
import './StudyView.css'

export function StudyView({ deck, onBack, onUpdateDeck }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [flipRotation, setFlipRotation] = useState(0)
  const [cards, setCards] = useState([])
  const [sessionStats, setSessionStats] = useState({
    again: 0,
    hard: 0,
    good: 0,
    easy: 0
  })
  const [showComplete, setShowComplete] = useState(false)

  // Preparar tarjetas para estudio (solo las pendientes)
  useEffect(() => {
    const dueCards = deck.getDueCards()
    const newCards = deck.getNewCards().slice(0, 10) // Máximo 10 nuevas por sesión
    const learningCards = deck.getLearningCards()
    
    // Orden: primero repaso, luego aprendizaje, luego nuevas
    const studyCards = [...dueCards, ...learningCards, ...newCards]
    setCards(studyCards)
    setCurrentCardIndex(0)
    setIsFlipped(false)
    setShowComplete(false)
  }, [deck])

  const currentCard = cards[currentCardIndex]
  const progress = cards.length > 0 ? ((currentCardIndex) / cards.length) * 100 : 0

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
    setFlipRotation(prev => prev + 180)
  }

  const handleRate = useCallback((difficulty) => {
    if (!currentCard) return

    // Actualizar tarjeta
    const result = currentCard.review(difficulty)
    
    // Actualizar estadísticas de sesión
    setSessionStats(prev => ({
      ...prev,
      [Object.keys(DIFFICULTY)[difficulty].toLowerCase()]: prev[Object.keys(DIFFICULTY)[difficulty].toLowerCase()] + 1
    }))
    
    // Guardar progreso y estadísticas
    deck.recordReview(difficulty)
    onUpdateDeck(deck)

    // Siguiente tarjeta
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1)
      setIsFlipped(false)
    } else {
      setShowComplete(true)
    }
  }, [currentCard, currentCardIndex, cards.length, deck, onUpdateDeck])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showComplete) return
      
      if (e.code === 'Space') {
        e.preventDefault()
        handleFlip()
      } else if (isFlipped) {
        switch (e.key) {
          case '1': handleRate(DIFFICULTY.AGAIN); break
          case '2': handleRate(DIFFICULTY.HARD); break
          case '3': handleRate(DIFFICULTY.GOOD); break
          case '4': handleRate(DIFFICULTY.EASY); break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFlipped, handleFlip, handleRate, showComplete])

  if (cards.length === 0) {
    return (
      <div className="study-view animate-fade-in">
        <div className="study-header">
          <button className="btn btn-back" onClick={onBack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '20px', height: '20px'}}>
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            <span>Volver</span>
          </button>
          <h2>{deck.name}</h2>
          <div></div>
        </div>
        
        <div className="empty-study">
          <div className="empty-icon">🎉</div>
          <h3>No hay tarjetas pendientes</h3>
          <p>Has completado todas las tarjetas de este mazo por ahora.</p>
          <div className="empty-actions">
            <button className="btn btn-secondary" onClick={onBack}>
              Volver a mazos
            </button>
            <button className="btn btn-primary" onClick={() => {
              // Repasar todo el mazo de nuevo
              setCards(deck.cards)
              setCurrentCardIndex(0)
              setIsFlipped(false)
            }}>
              Repasar todo el mazo
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showComplete) {
    const total = sessionStats.again + sessionStats.hard + sessionStats.good + sessionStats.easy
    const accuracy = Math.round(((sessionStats.good + sessionStats.easy) / total) * 100)
    
    return (
      <div className="study-view animate-fade-in">
        <div className="complete-view">
          <div className="complete-icon">🎊</div>
          <h2>¡Sesion completada!</h2>
          <p className="complete-subtitle">Has estudiado {total} tarjetas</p>
          
          <div className="session-stats">
            <div className="session-stat again">
              <span className="session-stat-value">{sessionStats.again}</span>
              <span className="session-stat-label">Otra vez</span>
            </div>
            <div className="session-stat hard">
              <span className="session-stat-value">{sessionStats.hard}</span>
              <span className="session-stat-label">Dificil</span>
            </div>
            <div className="session-stat good">
              <span className="session-stat-value">{sessionStats.good}</span>
              <span className="session-stat-label">Bien</span>
            </div>
            <div className="session-stat easy">
              <span className="session-stat-value">{sessionStats.easy}</span>
              <span className="session-stat-label">Facil</span>
            </div>
          </div>
          
          <div className="accuracy-display">
            <div className="accuracy-value">{accuracy}%</div>
            <div className="accuracy-label">Precisión</div>
          </div>
          
          <div className="complete-actions">
            <button className="btn btn-secondary" onClick={onBack}>
              Volver a mazos
            </button>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Estudiar de nuevo
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="study-view animate-fade-in">
      <div className="study-header">
        <button className="btn btn-back" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '20px', height: '20px'}}>
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          <span>Volver</span>
        </button>
        <div className="study-info">
          <h2>{deck.name}</h2>
          <span className="card-counter">
            {currentCardIndex + 1} / {cards.length}
          </span>
        </div>
        <div></div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar-study">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Card Navigator Slider */}
      <div className="card-slider-container">
        <span className="card-slider-label">{currentCardIndex + 1}</span>
        <input
          type="range"
          min={1}
          max={cards.length}
          value={currentCardIndex + 1}
          onChange={(e) => {
            const newIndex = parseInt(e.target.value) - 1
            setCurrentCardIndex(newIndex)
            setIsFlipped(false)
          }}
          className="card-slider"
        />
        <span className="card-slider-label">{cards.length}</span>
      </div>

      <div className="flashcard-container">
        <div 
          className="flashcard"
          onClick={handleFlip}
          style={{ transform: `rotateY(${flipRotation}deg)` }}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <div className="card-content">
                <p className="card-text">{currentCard.front}</p>
              </div>
            </div>
            <div className="flashcard-back">
              <div className="card-content">
                <p className="card-text" style={{ whiteSpace: 'pre-line' }}>
                  {currentCard.back}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFlipped ? (
        <div className="rating-buttons">
          <button 
            className="rating-btn again"
            onClick={() => handleRate(DIFFICULTY.AGAIN)}
          >
            <span className="rating-label">Otra vez</span>
            <span className="rating-key">1</span>
            <span className="rating-time">1d</span>
          </button>
          <button 
            className="rating-btn hard"
            onClick={() => handleRate(DIFFICULTY.HARD)}
          >
            <span className="rating-label">Dificil</span>
            <span className="rating-key">2</span>
            <span className="rating-time">2d</span>
          </button>
          <button 
            className="rating-btn good"
            onClick={() => handleRate(DIFFICULTY.GOOD)}
          >
            <span className="rating-label">Bien</span>
            <span className="rating-key">3</span>
            <span className="rating-time">3d</span>
          </button>
          <button 
            className="rating-btn easy"
            onClick={() => handleRate(DIFFICULTY.EASY)}
          >
            <span className="rating-label">Facil</span>
            <span className="rating-key">4</span>
            <span className="rating-time">4d</span>
          </button>
        </div>
      ) : (
        <div style={{height: '60px'}}></div>
      )}
    </div>
  )
}
