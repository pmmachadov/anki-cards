import { useState, useMemo } from 'react'
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line
} from 'recharts'
import './StatsView.css'

const COLORS = {
  new: '#8b5cf6',      // Violeta
  learning: '#f59e0b', // Ámbar
  review: '#22c55e',   // Verde
  relearning: '#ef4444' // Rojo
}

// Iconos SVG
const Icons = {
  arrowLeft: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  cards: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  flame: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  trendUp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="tooltip-value" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function StatsView({ deck, onBack, onResetProgress }) {
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [timeRange, setTimeRange] = useState('week')

  const stats = useMemo(() => {
    const cards = deck.cards
    const total = cards.length
    
    const newCards = cards.filter(c => c.status === 'new').length
    const learning = cards.filter(c => c.status === 'learning').length
    const review = cards.filter(c => c.status === 'review').length
    const relearning = cards.filter(c => c.status === 'relearning').length
    
    const studied = cards.filter(c => c.status !== 'new').length
    const mastery = total > 0 ? Math.round((review / total) * 100) : 0
    
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
    { name: 'Nuevas', value: stats.new, color: COLORS.new, icon: '✨' },
    { name: 'Aprendiendo', value: stats.learning, color: COLORS.learning, icon: '📖' },
    { name: 'Repaso', value: stats.review, color: COLORS.review, icon: '✅' },
    { name: 'Reaprendiendo', value: stats.relearning, color: COLORS.relearning, icon: '🔄' }
  ].filter(d => d.value > 0)

  const activityData = useMemo(() => {
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90
    return Array.from({ length: days }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (days - 1 - i))
      
      const dayStr = date.toDateString()
      const studiedToday = deck.cards.filter(c => 
        c.lastReviewed && new Date(c.lastReviewed).toDateString() === dayStr
      ).length
      
      return {
        date: date.toLocaleDateString('es', { weekday: days <= 7 ? 'short' : undefined, day: 'numeric', month: days > 7 ? 'short' : undefined }),
        studied: studiedToday,
        new: Math.floor(Math.random() * 5),
        review: studiedToday
      }
    })
  }, [deck, timeRange])

  const difficultyData = [
    { name: 'Otra vez', count: deck.studyStats?.again || 0, color: COLORS.relearning, icon: '😰' },
    { name: 'Difícil', count: deck.studyStats?.hard || 0, color: COLORS.learning, icon: '😓' },
    { name: 'Bien', count: deck.studyStats?.good || 0, color: COLORS.review, icon: '😊' },
    { name: 'Fácil', count: deck.studyStats?.easy || 0, color: COLORS.new, icon: '😎' }
  ]

  const handleReset = () => {
    onResetProgress(deck.id)
    setShowResetConfirm(false)
  }

  return (
    <div className="stats-view animate-fade-in">
      {/* Header */}
      <div className="stats-header">
        <button className="btn btn-back" onClick={onBack}>
          <span className="btn-icon">{Icons.arrowLeft}</span>
          <span>Volver</span>
        </button>
        <div className="stats-title">
          <div className="title-icon">{Icons.layers}</div>
          <div>
            <h2>{deck.name}</h2>
            <span>Estadísticas de estudio</span>
          </div>
        </div>
        <button 
          className="btn btn-danger btn-reset"
          onClick={() => setShowResetConfirm(true)}
        >
          <span className="btn-icon">{Icons.trash}</span>
          <span>Borrar progreso</span>
        </button>
      </div>

      {/* Resumen */}
      <div className="stats-overview">
        <div className="stat-card stat-mastery">
          <div className="stat-icon-bg">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path className="circle"
                strokeDasharray={`${stats.mastery}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="mastery-value">{stats.mastery}%</div>
          </div>
          <div className="stat-info">
            <span className="stat-label">Dominio</span>
            <span className="stat-sublabel">{stats.review} de {stats.total} tarjetas</span>
          </div>
        </div>
        
        <div className="stat-card stat-total">
          <div className="stat-icon-wrap icon-purple">{Icons.cards}</div>
          <div className="stat-content">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total tarjetas</span>
          </div>
        </div>
        
        <div className="stat-card stat-studied">
          <div className="stat-icon-wrap icon-green">{Icons.check}</div>
          <div className="stat-content">
            <span className="stat-value">{stats.studied}</span>
            <span className="stat-label">Estudiadas</span>
          </div>
        </div>
        
        <div className="stat-card stat-due">
          <div className="stat-icon-wrap icon-orange">{Icons.clock}</div>
          <div className="stat-content">
            <span className="stat-value">{stats.dueToday}</span>
            <span className="stat-label">Pendientes hoy</span>
          </div>
        </div>
        
        <div className="stat-card stat-streak">
          <div className="stat-icon-wrap icon-red">{Icons.flame}</div>
          <div className="stat-content">
            <span className="stat-value">{stats.streak}</span>
            <span className="stat-label">Racha (días)</span>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="charts-grid">
        {/* Distribución de tarjetas */}
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">
              <div className="chart-icon">{Icons.brain}</div>
              <h3>Distribución de tarjetas</h3>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend">
            {pieData.map(item => (
              <div key={item.name} className="legend-item">
                <span className="legend-dot" style={{ background: item.color }} />
                <span className="legend-name">{item.icon} {item.name}</span>
                <span className="legend-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad */}
        <div className="chart-card wide">
          <div className="chart-header">
            <div className="chart-title">
              <div className="chart-icon">{Icons.trendUp}</div>
              <h3>Actividad de estudio</h3>
            </div>
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
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStudied" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#6e7681"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#6e7681"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="studied" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
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
          <div className="chart-header">
            <div className="chart-title">
              <div className="chart-icon">{Icons.target}</div>
              <h3>Respuestas por dificultad</h3>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={difficultyData} layout="vertical" margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#30363d" horizontal={false} />
                <XAxis type="number" stroke="#6e7681" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#8b949e"
                  fontSize={12}
                  width={90}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={28}>
                  {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="difficulty-legend">
            {difficultyData.map(item => (
              <div key={item.name} className="difficulty-item">
                <span className="difficulty-icon">{item.icon}</span>
                <div className="difficulty-info">
                  <span className="difficulty-name">{item.name}</span>
                  <span className="difficulty-bar">
                    <span className="difficulty-fill" style={{ width: `${Math.max(item.count * 10, 5)}%`, background: item.color }} />
                  </span>
                </div>
                <span className="difficulty-count">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progreso de retención */}
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">
              <div className="chart-icon">{Icons.brain}</div>
              <h3>Tasa de retención</h3>
            </div>
          </div>
          
          <div className="retention-cards">
            <div className="retention-card">
              <div className="retention-header">
                <span className="retention-icon">🎯</span>
                <span className="retention-title">Dominadas</span>
              </div>
              <div className="retention-value-large">
                {stats.total > 0 ? Math.round((stats.review / stats.total) * 100) : 0}%
              </div>
              <div className="retention-bar-modern">
                <div 
                  className="retention-fill-modern"
                  style={{ width: `${stats.total > 0 ? (stats.review / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>
            
            <div className="retention-card">
              <div className="retention-header">
                <span className="retention-icon">⚡</span>
                <span className="retention-title">Éxito reps.</span>
              </div>
              <div className="retention-value-large success">
                {stats.studied > 0 ? Math.round(((stats.review + stats.learning) / stats.studied) * 100) : 0}%
              </div>
              <div className="retention-bar-modern">
                <div 
                  className="retention-fill-modern success"
                  style={{ width: `${stats.studied > 0 ? ((stats.review + stats.learning) / stats.studied) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          <div className="stats-detail">
            <div className="detail-row">
              <span className="detail-label">
                <span className="detail-icon" style={{ background: COLORS.review }}>✓</span>
                En repaso
              </span>
              <strong>{stats.review}</strong>
            </div>
            <div className="detail-row">
              <span className="detail-label">
                <span className="detail-icon" style={{ background: COLORS.learning }}>★</span>
                Aprendiendo
              </span>
              <strong>{stats.learning}</strong>
            </div>
            <div className="detail-row">
              <span className="detail-label">
                <span className="detail-icon" style={{ background: COLORS.relearning }}>↻</span>
                Reaprendiendo
              </span>
              <strong>{stats.relearning}</strong>
            </div>
            <div className="detail-row">
              <span className="detail-label">
                <span className="detail-icon" style={{ background: COLORS.new }}>+</span>
                Nuevas
              </span>
              <strong>{stats.new}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showResetConfirm && (
        <div className="modal-overlay" onClick={() => setShowResetConfirm(false)}>
          <div className="modal modal-confirm" onClick={e => e.stopPropagation()}>
            <div className="confirm-icon-wrap">
              <div className="confirm-icon">{Icons.warning}</div>
            </div>
            <h3>¿Borrar progreso?</h3>
            <p>
              Esto reiniciará <strong>todas las tarjetas</strong> de este mazo a estado "nuevo". 
              Se perderá todo el historial de estudio.
            </p>
            <div className="confirm-alert">
              <span>⚠️</span>
              <span>Esta acción no se puede deshacer</span>
            </div>
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
