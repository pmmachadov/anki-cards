import { useState } from 'react'
import './CardEditor.css'

export function CardEditor({ deck, onBack, onUpdateDeck }) {
  const [cards, setCards] = useState(deck.cards)
  const [editingCard, setEditingCard] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Form states
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [tags, setTags] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const filteredCards = cards.filter(card => 
    card.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.back.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddCard = (e) => {
    e.preventDefault()
    if (!front.trim() || !back.trim()) return

    const newCard = deck.addCard(
      front.trim(),
      back.trim(),
      tags.split(',').map(t => t.trim()).filter(Boolean),
      imageUrl.trim()
    )
    
    setCards([...deck.cards])
    onUpdateDeck(deck)
    
    // Reset form
    setFront('')
    setBack('')
    setTags('')
    setImageUrl('')
    setShowAddForm(false)
  }

  const handleEditCard = (card) => {
    setEditingCard(card)
    setFront(card.front)
    setBack(card.back)
    setTags(card.tags?.join(', ') || '')
    setImageUrl(card.imageUrl || '')
  }

  const handleUpdateCard = (e) => {
    e.preventDefault()
    if (!editingCard) return

    editingCard.front = front.trim()
    editingCard.back = back.trim()
    editingCard.tags = tags.split(',').map(t => t.trim()).filter(Boolean)
    editingCard.imageUrl = imageUrl.trim()
    
    setCards([...deck.cards])
    onUpdateDeck(deck)
    
    setEditingCard(null)
    setFront('')
    setBack('')
    setTags('')
  }

  const handleDeleteCard = (cardId) => {
    if (!confirm('¿Eliminar esta tarjeta?')) return
    
    deck.removeCard(cardId)
    setCards([...deck.cards])
    onUpdateDeck(deck)
  }

  const handleCancel = () => {
    setEditingCard(null)
    setShowAddForm(false)
    setFront('')
    setBack('')
    setTags('')
    setImageUrl('')
  }

  return (
    <div className="card-editor animate-fade-in">
      <div className="editor-header">
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          ← Volver
        </button>
        <div className="editor-title">
          <h2>{deck.name}</h2>
          <span>{cards.length} tarjetas</span>
        </div>
        <button 
          className="btn btn-primary btn-sm"
          onClick={() => setShowAddForm(true)}
        >
          + Añadir
        </button>
      </div>

      <div className="editor-search">
        <input
          type="text"
          className="input"
          placeholder="Buscar tarjetas..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {(showAddForm || editingCard) && (
        <div className="card-form-container">
          <h3>{editingCard ? 'Editar tarjeta' : 'Nueva tarjeta'}</h3>
          <form onSubmit={editingCard ? handleUpdateCard : handleAddCard}>
            <div className="form-row">
              <div className="form-group">
                <label>Frente (Pregunta)</label>
                <textarea
                  className="textarea"
                  value={front}
                  onChange={e => setFront(e.target.value)}
                  placeholder="Escribe la pregunta..."
                  rows={3}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Reverso (Respuesta)</label>
                <textarea
                  className="textarea"
                  value={back}
                  onChange={e => setBack(e.target.value)}
                  placeholder="Escribe la respuesta..."
                  rows={3}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Etiquetas (separadas por coma)</label>
              <input
                type="text"
                className="input"
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="ej: hardware, cpu, conceptos-basicos"
              />
            </div>
            <div className="form-group">
              <label>Imagen (URL de internet)</label>
              <input
                type="text"
                className="input"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://ejemplo.com/imagen.png"
              />
              {imageUrl.trim() && (
                <div className="image-url-preview">
                  <img
                    src={imageUrl.trim()}
                    alt="Vista previa"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>
              )}
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={!front.trim() || !back.trim()}
              >
                {editingCard ? 'Guardar cambios' : 'Añadir tarjeta'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="cards-list">
        {filteredCards.map((card, index) => (
          <div key={card.id} className="card-item">
            <div className="card-item-number">#{index + 1}</div>
            <div className="card-item-content">
              <div className="card-item-front">
                <span className="item-label">Frente</span>
                <p>{card.front}</p>
              </div>
              <div className="card-item-back">
                <span className="item-label">Reverso</span>
                <p style={{ whiteSpace: 'pre-line' }}>{card.back}</p>
              </div>
            </div>
            <div className="card-item-meta">
              {card.tags?.length > 0 && (
                <div className="card-item-tags">
                  {card.tags.map((tag, i) => (
                    <span key={i} className="item-tag">{tag}</span>
                  ))}
                </div>
              )}
              <div className="card-item-stats">
                <span className={`status-badge ${card.status}`}>
                  {card.status === 'new' ? 'Nueva' : 
                   card.status === 'learning' ? 'Aprendiendo' : 
                   card.status === 'relearning' ? 'Reaprendiendo' : 'Repaso'}
                </span>
                {card.repetitions > 0 && (
                  <span className="repetition-count">
                    {card.repetitions} repeticiones
                  </span>
                )}
              </div>
            </div>
            <div className="card-item-actions">
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleEditCard(card)}
              >
                Editar
              </button>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteCard(card.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCards.length === 0 && (
        <div className="empty-cards">
          {searchTerm ? (
            <>
              <p>No se encontraron tarjetas</p>
              <button className="btn btn-secondary btn-sm" onClick={() => setSearchTerm('')}>
                Limpiar busqueda
              </button>
            </>
          ) : (
            <>
              <div className="empty-icon">📝</div>
              <p>No hay tarjetas en este mazo</p>
              <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
                Crear primera tarjeta
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
