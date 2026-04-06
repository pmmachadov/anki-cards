import { useState } from 'react'
import './DeckList.css'

// Iconos SVG
const Icons = {
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      <line x1="8" y1="7" x2="16" y2="7"/>
      <line x1="8" y1="11" x2="16" y2="11"/>
    </svg>
  ),
  study: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  stats: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
      <path d="M3 20h18"/>
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  reset: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  ),
  delete: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  cards: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  newCard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),
  learning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  review: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"/>
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
    </svg>
  )
}

// Iconos de materias
const SubjectIcons = {
  'Sistemas Informaticos': '💻',
  'Entornos de Desarrollo': '🔧',
  'Bases de Datos': '🗄️',
  'Programacion': '⚡',
  'Lenguajes de Marcas': '🏷️',
  'default': '📚'
}

export function DeckList({ 
  decks, 
  onCreateDeck, 
  onDeleteDeck, 
  onStudyDeck, 
  onEditDeck,
  onStatsDeck,
  onResetDeck 
}) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newDeckName, setNewDeckName] = useState('')
  const [newDeckDesc, setNewDeckDesc] = useState('')

  const handleCreate = (e) => {
    e.preventDefault()
    if (newDeckName.trim()) {
      onCreateDeck(newDeckName.trim(), newDeckDesc.trim())
      setNewDeckName('')
      setNewDeckDesc('')
      setShowCreateModal(false)
    }
  }

  const totalCards = decks.reduce((acc, d) => acc + d.cards.length, 0)
  const totalStudied = decks.reduce((acc, d) => {
    return acc + d.cards.filter(c => c.status !== 'new').length
  }, 0)

  const getSubjectIcon = (subject) => {
    return SubjectIcons[subject] || SubjectIcons.default
  }

  return (
    <div className="deck-list animate-fade-in">
      {/* Stats Header */}
      <div className="deck-stats">
        <div className="stat-card stat-card-blue">
          <div className="stat-icon">{Icons.folder}</div>
          <div className="stat-content">
            <span className="stat-value">{decks.length}</span>
            <span className="stat-label">Mazos</span>
          </div>
        </div>
        <div className="stat-card stat-card-purple">
          <div className="stat-icon">{Icons.cards}</div>
          <div className="stat-content">
            <span className="stat-value">{totalCards}</span>
            <span className="stat-label">Tarjetas</span>
          </div>
        </div>
        <div className="stat-card stat-card-green">
          <div className="stat-icon">{Icons.target}</div>
          <div className="stat-content">
            <span className="stat-value">{Math.round((totalStudied / totalCards) * 100) || 0}%</span>
            <span className="stat-label">Progreso</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="deck-header">
        <div className="deck-header-title">
          <div className="header-icon">{Icons.book}</div>
          <div>
            <h2>Mis Materias</h2>
            <p className="deck-header-subtitle">Selecciona un mazo para estudiar</p>
          </div>
        </div>
        <button className="btn btn-primary btn-create" onClick={() => setShowCreateModal(true)}>
          <span className="btn-icon">{Icons.plus}</span>
          <span>Nuevo Mazo</span>
        </button>
      </div>

      {/* Decks Grid */}
      <div className="decks-grid">
        {decks.map(deck => {
          const stats = deck.getStats()
          const subjectIcon = getSubjectIcon(deck.subject)
          const hasDueCards = stats.due > 0
          
          return (
            <div key={deck.id} className={`deck-card ${hasDueCards ? 'has-due' : ''}`}>
              {/* Card Header with Icon */}
              <div className="deck-card-visual">
                <div className="deck-icon-wrapper">
                  <span className="deck-subject-icon">{subjectIcon}</span>
                </div>
                {hasDueCards && (
                  <div className="due-badge">
                    <span>{stats.due} pendientes</span>
                  </div>
                )}
              </div>
              
              {/* Card Content */}
              <div className="deck-card-content">
                <div className="deck-card-header">
                  <h3 className="deck-name">{deck.name}</h3>
                  {deck.subject && (
                    <span className="deck-subject">{deck.subject}</span>
                  )}
                </div>
                
                {deck.description && (
                  <p className="deck-description">{deck.description}</p>
                )}
                
                {/* Progress Bar */}
                <div className="deck-progress">
                  <div className="progress-info">
                    <span className="progress-label">Progreso</span>
                    <span className="progress-value">{stats.mastery}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${stats.mastery}%` }}
                    />
                  </div>
                </div>

                {/* Stats Row */}
                <div className="deck-stats-row">
                  <div className="deck-stat" title="Nuevas">
                    <div className="stat-icon-small icon-new">{Icons.newCard}</div>
                    <div className="stat-info">
                      <span className="stat-number">{stats.new}</span>
                      <span className="stat-text">nuevas</span>
                    </div>
                  </div>
                  <div className="deck-stat" title="Aprendiendo">
                    <div className="stat-icon-small icon-learning">{Icons.learning}</div>
                    <div className="stat-info">
                      <span className="stat-number">{stats.learning}</span>
                      <span className="stat-text">aprendiendo</span>
                    </div>
                  </div>
                  <div className="deck-stat" title="Para repasar">
                    <div className="stat-icon-small icon-review">{Icons.review}</div>
                    <div className="stat-info">
                      <span className="stat-number">{stats.due}</span>
                      <span className="stat-text">repasar</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="deck-actions">
                  <button 
                    className="btn btn-primary btn-study"
                    onClick={() => onStudyDeck(deck)}
                  >
                    <span className="btn-icon">{Icons.study}</span>
                    <span>Estudiar</span>
                  </button>
                  <button 
                    className="btn btn-icon-only btn-stats"
                    onClick={() => onStatsDeck(deck)}
                    title="Ver estadísticas"
                  >
                    {Icons.stats}
                  </button>
                  <button 
                    className="btn btn-icon-only btn-edit"
                    onClick={() => onEditDeck(deck)}
                    title="Editar mazo"
                  >
                    {Icons.edit}
                  </button>
                  <button 
                    className="btn btn-icon-only btn-reset"
                    onClick={() => {
                      if (confirm(`¿Reiniciar el progreso de "${deck.name}"?\n\nSe perderá todo el historial de estudio pero las tarjetas se mantendrán.`)) {
                        onResetDeck(deck.id)
                      }
                    }}
                    title="Reiniciar progreso"
                  >
                    {Icons.reset}
                  </button>
                  <button 
                    className="btn btn-icon-only btn-delete"
                    onClick={() => {
                      if (confirm(`¿Eliminar el mazo "${deck.name}" completamente?\n\nEsta acción no se puede deshacer.`)) {
                        onDeleteDeck(deck.id)
                      }
                    }}
                    title="Eliminar mazo"
                  >
                    {Icons.delete}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {decks.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon-wrapper">
            <div className="empty-icon">{Icons.book}</div>
          </div>
          <h3>No hay mazos</h3>
          <p>Crea tu primer mazo para empezar a estudiar</p>
          <button className="btn btn-primary btn-create" onClick={() => setShowCreateModal(true)}>
            <span className="btn-icon">{Icons.plus}</span>
            <span>Crear mazo</span>
          </button>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon">{Icons.folder}</div>
              <h3>Nuevo Mazo</h3>
            </div>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="input"
                  value={newDeckName}
                  onChange={e => setNewDeckName(e.target.value)}
                  placeholder="Ej: Sistemas Informaticos"
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Descripción (opcional)</label>
                <textarea
                  className="textarea"
                  value={newDeckDesc}
                  onChange={e => setNewDeckDesc(e.target.value)}
                  placeholder="Breve descripción del mazo..."
                  rows={3}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={!newDeckName.trim()}>
                  Crear Mazo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
