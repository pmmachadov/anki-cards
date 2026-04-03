import { useState } from 'react'
import './DeckList.css'

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

  return (
    <div className="deck-list animate-fade-in">
      <div className="deck-stats">
        <div className="stat-card">
          <span className="stat-value">{decks.length}</span>
          <span className="stat-label">Mazos</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{totalCards}</span>
          <span className="stat-label">Tarjetas</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{Math.round((totalStudied / totalCards) * 100) || 0}%</span>
          <span className="stat-label">Progreso</span>
        </div>
      </div>

      <div className="deck-header">
        <h2>Mis Mazos</h2>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          <span>+</span> Nuevo Mazo
        </button>
      </div>

      <div className="decks-grid">
        {decks.map(deck => {
          const stats = deck.getStats()
          return (
            <div key={deck.id} className="deck-card">
              <div className="deck-card-header">
                <h3 className="deck-name">{deck.name}</h3>
                {deck.subject && (
                  <span className="deck-subject">{deck.subject}</span>
                )}
              </div>
              
              {deck.description && (
                <p className="deck-description">{deck.description}</p>
              )}
              
              <div className="deck-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${stats.mastery}%` }}
                  />
                </div>
                <span className="progress-text">{stats.mastery}% dominado</span>
              </div>

              <div className="deck-stats-row">
                <div className="deck-stat">
                  <span className="stat-dot new"></span>
                  <span>{stats.new} nuevas</span>
                </div>
                <div className="deck-stat">
                  <span className="stat-dot learning"></span>
                  <span>{stats.learning} aprendiendo</span>
                </div>
                <div className="deck-stat">
                  <span className="stat-dot review"></span>
                  <span>{stats.due} para repasar</span>
                </div>
              </div>

              <div className="deck-actions">
                <button 
                  className="btn btn-primary btn-study"
                  onClick={() => onStudyDeck(deck)}
                >
                  📚 Estudiar
                </button>
                <button 
                  className="btn btn-secondary btn-stats"
                  onClick={() => onStatsDeck(deck)}
                  title="Ver estadísticas"
                >
                  📊
                </button>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => onEditDeck(deck)}
                >
                  ✏️ Editar
                </button>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    if (confirm(`¿Reiniciar el progreso de "${deck.name}"?\n\nSe perderá todo el historial de estudio pero las tarjetas se mantendrán.`)) {
                      onResetDeck(deck.id)
                    }
                  }}
                  title="Reiniciar progreso"
                >
                  🔄
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    if (confirm(`¿Eliminar el mazo "${deck.name}" completamente?\n\nEsta acción no se puede deshacer.`)) {
                      onDeleteDeck(deck.id)
                    }
                  }}
                  title="Eliminar mazo"
                >
                  🗑️
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {decks.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>No hay mazos</h3>
          <p>Crea tu primer mazo para empezar a estudiar</p>
          <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
            Crear mazo
          </button>
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Nuevo Mazo</h3>
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
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
