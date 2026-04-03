import { useState, useMemo } from 'react'
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line
} from 'recharts'
import './StatsView.css'

const COLORS = {
  new: '#58a6ff',
  learning: '#d29922',
  review: '#238636',
  relearning: '#da3633'
}

export function StatsView({ deck, onBack, onResetProgress }) {
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [timeRange, setTimeRange] = useState('week') // week, month, all

  const stats = useMemo(() => {
    const cards = deck.cards
    const total = cards.length
    
    const newCards = cards.filter(c => c.status === 'new').length
    const learning = cards.filter(c => c.status === 'learning').length
    const review = cards.filter(c => c.status === 'review').length
    const relearning = cards.filter(c => c.status === 'relearning').length
    
    const studied = cards.filter(c => c.status !== 'new').length
    const mastery = total > 0 ? Math.round((review / total) * 100) : 0
    
    // Calcular racha actual
    let streak = 0
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    
    if (deck.lastStudied) {
      const lastDate = new Date(deck.lastStudied).toDateString()
      if (lastDate === today || lastDate === yesterday) {
        streak = deck.studyStats?.streak || 0
      }
    }
    
    return {
      total,
      new: newCards,
      learning,
      review,
      relearning,
      studied,
      mastery,
      streak,
      dueToday: cards.filter(c => c.isDue()).length
    }
  }, [deck])

  const pieData = [
    { name: 'Nuevas', value: stats.new, color: COLORS.new },
    { name: 'Aprendiendo', value: stats.learning, color: COLORS.learning },
    { name: 'Repaso', value: stats.review, color: COLORS.review },
    { name: 'Reaprendiendo', value: stats.relearning, color: COLORS.relearning }
  ].filter(d => d.value > 0)

  // Datos simulados de actividad (en una app real vendrían del historial)
  const activityData = useMemo(() => {
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90
    return Array.from({ length: days }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (days - 1 - i))
      
      // Simular datos basados en las tarjetas estudiadas
      const dayStr = date.toDateString()
      const studiedToday = deck.cards.filter(c => 
        c.lastReviewed && new Date(c.lastReviewed).toDateString() === dayStr
      ).length
      
      return {
        date: date.toLocaleDateString('es', { weekday: days <= 7 ? 'short' : undefined, day: 'numeric' }),
        studied: studiedToday,
        new: Math.floor(Math.random() * 5),
        review: studiedToday
      }
    })
  }, [deck, timeRange])

  const difficultyData = [
    { name: 'Otra vez', count: deck.studyStats?.again || 0, color: COLORS.relearning },
    { name: 'Difícil', count: deck.studyStats?.hard || 0, color: COLORS.learning },
    { name: 'Bien', count: deck.studyStats?.good || 0, color: COLORS.review },
    { name: 'Fácil', count: deck.studyStats?.easy || 0, color: COLORS.new }
  ]

  const handleReset = () => {
    onResetProgress(deck.id)
    setShowResetConfirm(false)
  }

  return (
    <div className="stats-view animate-fade-in">
      <div className="stats-header">
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          ← Volver
        </button>
        <div className="stats-title">
          <h2>{deck.name}</h2>
          <span>Estadísticas de estudio</span>
        </div>
        <button 
          className="btn btn-danger btn-sm"
          onClick={() => setShowResetConfirm(true)}
        >
          🗑️ Borrar progreso
        </button>
      </div>

      {/* Resumen */}
      <div className="stats-overview">
        <div className="stat-card large">
          <div className="stat-ring" style={{ '--progress': `${stats.mastery}%` }}>
            <span className="ring-value">{stats.mastery}%</span>
          </div>
          <span className="stat-label">Dominio</span>
        </div>
        
        <div className="stat-card">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total tarjetas</span>
        </div>
        
        <div className="stat-card">
          <span className="stat-value">{stats.studied}</span>
          <span className="stat-label">Estudiadas</span>
        </div>
        
        <div className="stat-card">
          <span className="stat-value">{stats.dueToday}</span>
          <span className="stat-label">Pendientes hoy</span>
        </div>
        
        <div className="stat-card">
          <span className="stat-value">{stats.streak}</span>
          <span className="stat-label">Racha (días)</span>
        </div>
      </div>

      {/* Gráficos */}
      <div className="charts-grid">
        {/* Distribución de tarjetas */}
        <div className="chart-card">
          <h3>Distribución de tarjetas</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: '#161b22', 
                    border: '1px solid #30363d',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend">
            {pieData.map(item => (
              <div key={item.name} className="legend-item">
                <span className="legend-dot" style={{ background: item.color }} />
                <span>{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad */}
        <div className="chart-card wide">
          <div className="chart-header">
            <h3>Actividad de estudio</h3>
            <div className="time-range">
              {['week', 'month', 'all'].map(range => (
                <button
                  key={range}
                  className={`range-btn ${timeRange === range ? 'active' : ''}`}
                  onClick={() => setTimeRange(range)}
                >
                  {range === 'week' ? '7 días' : range === 'month' ? '30 días' : 'Todo'}
                </button>
              ))}
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorStudied" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#58a6ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#58a6ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6e7681"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#6e7681"
                  fontSize={12}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: '#161b22', 
                    border: '1px solid #30363d',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="studied" 
                  stroke="#58a6ff" 
                  fillOpacity={1} 
                  fill="url(#colorStudied)" 
                  name="Tarjetas estudiadas"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución de dificultad */}
        <div className="chart-card">
          <h3>Respuestas por dificultad</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={difficultyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#30363d" horizontal={false} />
                <XAxis type="number" stroke="#6e7681" fontSize={12} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#6e7681"
                  fontSize={12}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: '#161b22', 
                    border: '1px solid #30363d',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progreso de retención */}
        <div className="chart-card">
          <h3>Tasa de retención</h3>
          <div className="retention-stats">
            <div className="retention-item">
              <span className="retention-value">
                {stats.total > 0 ? Math.round((stats.review / stats.total) * 100) : 0}%
              </span>
              <span className="retention-label">Tarjetas dominadas</span>
            </div>
            <div className="retention-bar">
              <div 
                className="retention-fill" 
                style={{ width: `${stats.total > 0 ? (stats.review / stats.total) * 100 : 0}%` }}
              />
            </div>
          </div>
          
          <div className="retention-stats">
            <div className="retention-item">
              <span className="retention-value">
                {stats.studied > 0 ? Math.round(((stats.review + stats.learning) / stats.studied) * 100) : 0}%
              </span>
              <span className="retention-label">Éxito en repeticiones</span>
            </div>
            <div className="retention-bar">
              <div 
                className="retention-fill success" 
                style={{ width: `${stats.studied > 0 ? ((stats.review + stats.learning) / stats.studied) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="stats-detail">
            <div className="detail-row">
              <span>📚 Total estudiado</span>
              <strong>{stats.studied} tarjetas</strong>
            </div>
            <div className="detail-row">
              <span>🎯 En repaso</span>
              <strong>{stats.review} tarjetas</strong>
            </div>
            <div className="detail-row">
              <span>📖 Aprendiendo</span>
              <strong>{stats.learning} tarjetas</strong>
            </div>
            <div className="detail-row">
              <span>🔄 Reaprendiendo</span>
              <strong>{stats.relearning} tarjetas</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showResetConfirm && (
        <div className="modal-overlay" onClick={() => setShowResetConfirm(false)}>
          <div className="modal modal-confirm" onClick={e => e.stopPropagation()}>
            <div className="confirm-icon">⚠️</div>
            <h3>¿Borrar progreso?</h3>
            <p>
              Esto reiniciará <strong>todas las tarjetas</strong> de este mazo a estado "nuevo". 
              Se perderá todo el historial de estudio y las estadísticas.
            </p>
            <p className="confirm-warning">
              Esta acción no se puede deshacer.
            </p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowResetConfirm(false)}>
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={handleReset}>
                Sí, borrar progreso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
