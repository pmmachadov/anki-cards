import { useState, useEffect } from "react";
import "./DeckList.css";

// Icono de advertencia para el modal
const WarningIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// Iconos SVG
const Icons = {
  book: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="16" y2="11" />
    </svg>
  ),
  study: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  stats: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <path d="M3 20h18" />
    </svg>
  ),
  edit: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  reset: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  ),
  delete: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  plus: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  cards: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  target: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  folder: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  newCard: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  learning: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  review: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  ),
  database: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  chevronDown: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  chevronUp: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  ),
  extras: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  diagrama: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <line x1="10" y1="6.5" x2="14" y2="6.5" />
      <line x1="6.5" y1="10" x2="6.5" y2="14" />
      <line x1="17.5" y1="10" x2="17.5" y2="14" />
    </svg>
  ),
};

// Iconos de materias
const SubjectIcons = {
  "Sistemas Informaticos": "💻",
  "Entornos de Desarrollo": "🔧",
  "Bases de Datos": "🗄️",
  Programacion: "⚡",
  "Lenguajes de Marcas": "🏷️",
  "Desarrollo Web en Entorno Cliente": "🌐",
  Practicas: "📝",
  default: "📚",
};

// Colores Google por materia
const SubjectColors = {
  "Sistemas Informaticos": {
    accent: "#4285F4",
    bg: "rgba(66, 133, 244, 0.08)",
    badge: "#4285F4",
  },
  "Entornos de Desarrollo": {
    accent: "#FBBC04",
    bg: "rgba(251, 188, 4, 0.08)",
    badge: "#F9A825",
  },
  "Desarrollo Web en Entorno Cliente": {
    accent: "#34A853",
    bg: "rgba(52, 168, 83, 0.08)",
    badge: "#34A853",
  },
  "Bases de Datos": {
    accent: "#EA4335",
    bg: "rgba(234, 67, 53, 0.08)",
    badge: "#EA4335",
  },
  Programacion: {
    accent: "#1A73E8",
    bg: "rgba(26, 115, 232, 0.08)",
    badge: "#1A73E8",
  },
  "Lenguajes de Marcas": {
    accent: "#FF6D01",
    bg: "rgba(255, 109, 1, 0.08)",
    badge: "#FF6D01",
  },
  Practicas: {
    accent: "#34A853",
    bg: "rgba(52, 168, 83, 0.08)",
    badge: "#34A853",
  },
  default: {
    accent: "#9AA0A6",
    bg: "rgba(154, 160, 166, 0.08)",
    badge: "#9AA0A6",
  },
};

const MAIN_SUBJECTS = [
  "Sistemas Informaticos",
  "Entornos de Desarrollo",
  "Desarrollo Web en Entorno Cliente",
];

export function DeckList({
  decks,
  onCreateDeck,
  onDeleteDeck,
  onStudyDeck,
  onEditDeck,
  onStatsDeck,
  onResetDeck,
  onClearAllData,
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");
  const [newDeckDesc, setNewDeckDesc] = useState("");
  const [filterSubject, setFilterSubject] = useState("all"); // Filtro por materia

  // Modal de confirmación para reiniciar progreso
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1: primera confirmación, 2: advertencia final
  const [deckToReset, setDeckToReset] = useState(null);

  // Modal de confirmación para borrar TODOS los datos
  const [showClearModal, setShowClearModal] = useState(false);
  const [clearStep, setClearStep] = useState(1);

  // Desplegables
  const [showExtras, setShowExtras] = useState(false);
  const [showPruebas, setShowPruebas] = useState(false);
  const [showMaterias, setShowMaterias] = useState(false);
  const [showPracticas, setShowPracticas] = useState(false);
  const [showExamenes, setShowExamenes] = useState(false);

  // Map de mazos marcados como hechos: { [deckId]: true }
  // Inicializado directamente desde localStorage para evitar race conditions con StrictMode
  const [doneMap, setDoneMap] = useState(() => {
    try {
      const raw = localStorage.getItem("deckDoneMap");
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.error("Error loading deckDoneMap", e);
      return {};
    }
  });

  // Guardar en localStorage cuando cambie (sin useEffect de carga, para evitar sobrescritura)
  useEffect(() => {
    try {
      localStorage.setItem("deckDoneMap", JSON.stringify(doneMap));
    } catch (e) {
      console.error("Error saving deckDoneMap", e);
    }
  }, [doneMap]);

  const toggleDone = (deckId) => {
    if (!deckId) return;
    setDoneMap((prev) => {
      const next = { ...prev };
      if (next[deckId]) delete next[deckId];
      else next[deckId] = true;
      return next;
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (newDeckName.trim()) {
      onCreateDeck(newDeckName.trim(), newDeckDesc.trim());
      setNewDeckName("");
      setNewDeckDesc("");
      setShowCreateModal(false);
    }
  };

  // Funciones para el modal de reinicio
  const openResetModal = (deck) => {
    setDeckToReset(deck);
    setResetStep(1);
    setShowResetModal(true);
  };

  const closeResetModal = () => {
    setShowResetModal(false);
    setDeckToReset(null);
    setResetStep(1);
  };

  // Funciones para el modal de borrar todos los datos
  const closeClearModal = () => {
    setShowClearModal(false);
    setClearStep(1);
  };

  const handleClearConfirm = () => {
    if (clearStep === 1) {
      setClearStep(2);
    } else {
      onClearAllData();
      closeClearModal();
    }
  };

  const handleResetConfirm = () => {
    if (resetStep === 1) {
      // Primera confirmación - pasar a la advertencia final
      setResetStep(2);
    } else {
      // Segunda confirmación - ejecutar el reinicio
      if (deckToReset) {
        onResetDeck(deckToReset.id);
      }
      closeResetModal();
    }
  };

  const totalCards = decks.reduce((acc, d) => acc + d.cards.length, 0);
  const totalStudied = decks.reduce((acc, d) => {
    return acc + d.cards.filter((c) => c.status !== "new").length;
  }, 0);

  const getSubjectIcon = (subject) => {
    return SubjectIcons[subject] || SubjectIcons.default;
  };

  const getSubjectColor = (subject) => {
    return SubjectColors[subject] || SubjectColors.default;
  };

  // Obtener materias únicas para el filtro
  const uniqueSubjects = [
    ...new Set(decks.map((d) => d.subject).filter(Boolean)),
  ];

  const filteredDecks =
    filterSubject === "all"
      ? decks
      : decks.filter((d) => d.subject === filterSubject);

  // Mazos de examen
  const examenDecks = filteredDecks.filter(
    (d) => d.id?.startsWith("examen-"),
  );

  // Mazos de prueba (agrupados en folder por materia)
  const pruebaDecks = filteredDecks.filter(
    (d) => d.id?.startsWith("prueba-") || d.name?.startsWith("Prueba -"),
  );

  const pruebaGroups = pruebaDecks.reduce((acc, deck) => {
    const subject = deck.subject || "Sin materia";
    if (!acc[subject]) acc[subject] = [];
    acc[subject].push(deck);
    return acc;
  }, {});

  const examenGroups = examenDecks.reduce((acc, deck) => {
    const subject = deck.subject || "Exámenes";
    if (!acc[subject]) acc[subject] = [];
    acc[subject].push(deck);
    return acc;
  }, {});

  const practicaDecks = filteredDecks.filter((d) => d.subject === "Practicas");
  const mainDecks = filteredDecks.filter(
    (d) => MAIN_SUBJECTS.includes(d.subject) && !pruebaDecks.includes(d) && !examenDecks.includes(d),
  );
  const extraDecks = filteredDecks.filter(
    (d) =>
      !MAIN_SUBJECTS.includes(d.subject) &&
      !pruebaDecks.includes(d) &&
      !practicaDecks.includes(d) &&
      !examenDecks.includes(d),
  );

  const mainGroups = mainDecks.reduce((acc, deck) => {
    const subject = deck.subject || "Sin materia";
    if (!acc[subject]) acc[subject] = [];
    acc[subject].push(deck);
    return acc;
  }, {});

  const renderDeckCard = (deck, isExtra = false, theme = null) => {
    const stats = deck.getStats();
    const subjectIcon = getSubjectIcon(deck.subject);
    const subjectColor = getSubjectColor(deck.subject);
    const hasDueCards = stats.due > 0;
    const themeClass = theme || (isExtra ? "theme-blue" : "");

    const isDone = !!doneMap[deck.id];

    return (
      <div
        key={deck.id}
        className={`deck-card ${hasDueCards ? "has-due" : ""} ${themeClass} ${
          isDone ? "done" : ""
        }`}
        style={{ borderLeft: `3px solid ${subjectColor.accent}` }}
      >
        {/* Large top-right done badge */}
        <div
          className={`deck-done-badge ${isDone ? "on" : "off"}`}
          title={isDone ? "Mazo marcado como hecho" : "Mazo pendiente"}
          role="button"
          tabIndex={0}
          aria-pressed={isDone}
          onClick={() => toggleDone(deck.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleDone(deck.id);
            }
          }}
        >
          {isDone ? "Hecho ✓" : "Pendiente"}
        </div>
        {/* Card Content */}
        <div className="deck-card-content">
          {deck.subject && (
            <span
              className="deck-subject"
              style={{ background: subjectColor.badge }}
            >
              {subjectIcon} {deck.subject}
            </span>
          )}
          {hasDueCards && (
            <div className="due-badge-inline">
              <span>{stats.due} pendientes</span>
            </div>
          )}
          <div className="deck-card-header">
            <h3 className="deck-name">{deck.name}</h3>
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
              <div className="stat-icon-small icon-learning">
                {Icons.learning}
              </div>
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
            {/* small complete toggle removed — replaced by prominent top-right badge */}
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
              onClick={() => openResetModal(deck)}
              title="Reiniciar progreso"
            >
              {Icons.reset}
            </button>
          </div>
        </div>
      </div>
    );
  };

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
            <span className="stat-value">
              {Math.round((totalStudied / totalCards) * 100) || 0}%
            </span>
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
            <p className="deck-header-subtitle">
              Selecciona un mazo para estudiar
            </p>
          </div>
        </div>
        <div className="header-buttons">
          <button
            className="btn btn-primary btn-create"
            onClick={() => setShowCreateModal(true)}
          >
            <span className="btn-icon">{Icons.plus}</span>
            <span>Nuevo Mazo</span>
          </button>
          <a
            href="/diagrama-uml.html"
            target="_blank"
            className="btn btn-secondary btn-diagrama"
            title="Diagrama UML de clases"
          >
            <span className="btn-icon">{Icons.diagrama}</span>
            <span>UML</span>
          </a>
        </div>
      </div>

      {/* Filtro por materia */}
      {uniqueSubjects.length > 1 && (
        <div className="subject-filter">
          <button
            className={`filter-pill ${filterSubject === "all" ? "active" : ""}`}
            onClick={() => setFilterSubject("all")}
          >
            📚 Todos
          </button>
          {uniqueSubjects.map((subject) => {
            const color = getSubjectColor(subject);
            const icon = getSubjectIcon(subject);
            return (
              <button
                key={subject}
                className={`filter-pill ${
                  filterSubject === subject ? "active" : ""
                }`}
                onClick={() => setFilterSubject(subject)}
                style={
                  filterSubject === subject
                    ? {
                        borderColor: color.accent,
                        background: color.bg,
                        color: color.accent,
                      }
                    : {}
                }
              >
                {icon} {subject}
              </button>
            );
          })}
        </div>
      )}

      {/* Materias Collapsible Folder */}
      {mainDecks.length > 0 && (
        <div className="materias-section">
          <button
            className="materias-toggle"
            onClick={() => setShowMaterias(!showMaterias)}
            aria-expanded={showMaterias}
          >
            <span className="materias-icon">📁</span>
            <span className="materias-label">Materias</span>
            <span className="materias-count">
              {mainDecks.length} mazo{mainDecks.length !== 1 ? "s" : ""}
            </span>
            <span className={`materias-chevron ${showMaterias ? "open" : ""}`}>
              {showMaterias ? Icons.chevronUp : Icons.chevronDown}
            </span>
          </button>

          {showMaterias && (
            <div className="materias-content animate-fade-in">
              {Object.entries(mainGroups).map(([subject, subjectDecks]) => {
                const subjectColor = getSubjectColor(subject);
                const subjectIcon = getSubjectIcon(subject);
                return (
                  <div key={subject} className="materias-subgroup">
                    <div
                      className="materias-subject-header"
                      style={{ borderLeftColor: subjectColor.accent }}
                    >
                      <span className="materias-subject-icon">
                        {subjectIcon}
                      </span>
                      <span className="materias-subject-name">{subject}</span>
                      <span className="materias-subject-count">
                        {subjectDecks.length} mazo
                        {subjectDecks.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="decks-grid materias-subgrid">
                      {subjectDecks.map((d) => renderDeckCard(d))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Practicas Collapsible Folder */}
      {practicaDecks.length > 0 && (
        <div className="practicas-section">
          <button
            className="practicas-toggle"
            onClick={() => setShowPracticas(!showPracticas)}
            aria-expanded={showPracticas}
          >
            <span className="practicas-icon">📝</span>
            <span className="practicas-label">Prácticas</span>
            <span className="practicas-count">
              {practicaDecks.length} mazo{practicaDecks.length !== 1 ? "s" : ""}
            </span>
            <span
              className={`practicas-chevron ${showPracticas ? "open" : ""}`}
            >
              {showPracticas ? Icons.chevronUp : Icons.chevronDown}
            </span>
          </button>

          {showPracticas && (
            <div className="decks-grid practicas-grid animate-fade-in">
              {practicaDecks.map((d) =>
                renderDeckCard(d, false, "theme-practica"),
              )}
            </div>
          )}
        </div>
      )}

      {/* Exámenes Collapsible Folder */}
      {examenDecks.length > 0 && (
        <div className="examenes-section">
          <button
            className="examenes-toggle"
            onClick={() => setShowExamenes(!showExamenes)}
            aria-expanded={showExamenes}
          >
            <span className="examenes-icon">📋</span>
            <span className="examenes-label">Exámenes</span>
            <span className="examenes-count">
              {examenDecks.length} mazo{examenDecks.length !== 1 ? "s" : ""}
            </span>
            <span className={`examenes-chevron ${showExamenes ? "open" : ""}`}>
              {showExamenes ? Icons.chevronUp : Icons.chevronDown}
            </span>
          </button>

          {showExamenes && (
            <div className="examenes-content animate-fade-in">
              {Object.entries(examenGroups).map(([subject, subjectDecks]) => {
                const subjectColor = getSubjectColor(subject);
                const subjectIcon = getSubjectIcon(subject);
                return (
                  <div key={subject} className="examenes-subgroup">
                    <div
                      className="examenes-subject-header"
                      style={{ borderLeftColor: subjectColor.accent }}
                    >
                      <span className="examenes-subject-icon">
                        {subjectIcon}
                      </span>
                      <span className="examenes-subject-name">{subject}</span>
                      <span className="examenes-subject-count">
                        {subjectDecks.length} mazo
                        {subjectDecks.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="decks-grid examenes-subgrid">
                      {subjectDecks.map((d) =>
                        renderDeckCard(d, false, "theme-examen"),
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Pruebas Collapsible Folder */}
      {pruebaDecks.length > 0 && (
        <div className="pruebas-section">
          <button
            className="pruebas-toggle"
            onClick={() => setShowPruebas(!showPruebas)}
            aria-expanded={showPruebas}
          >
            <span className="pruebas-icon">📁</span>
            <span className="pruebas-label">Pruebas</span>
            <span className="pruebas-count">
              {pruebaDecks.length} mazo{pruebaDecks.length !== 1 ? "s" : ""}
            </span>
            <span className={`pruebas-chevron ${showPruebas ? "open" : ""}`}>
              {showPruebas ? Icons.chevronUp : Icons.chevronDown}
            </span>
          </button>

          {showPruebas && (
            <div className="pruebas-content animate-fade-in">
              {Object.entries(pruebaGroups).map(([subject, subjectDecks]) => {
                const subjectColor = getSubjectColor(subject);
                const subjectIcon = getSubjectIcon(subject);
                return (
                  <div key={subject} className="pruebas-subgroup">
                    <div
                      className="pruebas-subject-header"
                      style={{ borderLeftColor: subjectColor.accent }}
                    >
                      <span className="pruebas-subject-icon">
                        {subjectIcon}
                      </span>
                      <span className="pruebas-subject-name">{subject}</span>
                      <span className="pruebas-subject-count">
                        {subjectDecks.length} mazo
                        {subjectDecks.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="decks-grid pruebas-subgrid">
                      {subjectDecks.map((d) =>
                        renderDeckCard(d, false, "theme-prueba"),
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Extras Collapsible */}
      {extraDecks.length > 0 && (
        <div className="extras-section">
          <button
            className="extras-toggle"
            onClick={() => setShowExtras(!showExtras)}
            aria-expanded={showExtras}
          >
            <span className="extras-icon">{Icons.extras}</span>
            <span className="extras-label">Extras</span>
            <span className="extras-count">
              {extraDecks.length} mazo{extraDecks.length !== 1 ? "s" : ""}
            </span>
            <span className={`extras-chevron ${showExtras ? "open" : ""}`}>
              {showExtras ? Icons.chevronUp : Icons.chevronDown}
            </span>
          </button>

          {showExtras && (
            <div className="decks-grid extras-grid animate-fade-in">
              {extraDecks.map((d) => renderDeckCard(d, true))}
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {decks.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon-wrapper">
            <div className="empty-icon">{Icons.book}</div>
          </div>
          <h3>No hay mazos</h3>
          <p>Crea tu primer mazo para empezar a estudiar</p>
          <button
            className="btn btn-primary btn-create"
            onClick={() => setShowCreateModal(true)}
          >
            <span className="btn-icon">{Icons.plus}</span>
            <span>Crear mazo</span>
          </button>
        </div>
      )}

      {/* Botón para borrar todos los datos - discreto, al final */}
      <div className="clear-data-section">
        <button
          className="btn btn-clear-data"
          onClick={() => setShowClearModal(true)}
          title="Borrar todos los datos guardados"
        >
          <span className="btn-icon">{Icons.database}</span>
          <span>Borrar todos los datos</span>
        </button>
        <p className="clear-data-hint">
          Elimina todo el progreso y restaura los mazos originales
        </p>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
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
                  onChange={(e) => setNewDeckName(e.target.value)}
                  placeholder="Ej: Sistemas Informaticos"
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Descripción (opcional)</label>
                <textarea
                  className="textarea"
                  value={newDeckDesc}
                  onChange={(e) => setNewDeckDesc(e.target.value)}
                  placeholder="Breve descripción del mazo..."
                  rows={3}
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!newDeckName.trim()}
                >
                  Crear Mazo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Progress Modal - Doble Confirmación */}
      {showResetModal && deckToReset && (
        <div className="modal-overlay" onClick={closeResetModal}>
          <div
            className="modal modal-reset"
            onClick={(e) => e.stopPropagation()}
          >
            {resetStep === 1 ? (
              // Primera confirmación
              <>
                <div className="modal-header">
                  <div className="modal-icon warning-icon">
                    <WarningIcon />
                  </div>
                  <h3>¿Reiniciar progreso?</h3>
                </div>
                <div className="modal-body">
                  <p className="modal-text">
                    Vas a reiniciar el progreso de{" "}
                    <strong>"{deckToReset.name}"</strong>.
                  </p>
                  <p className="modal-text">
                    Se perderá todo el historial de estudio, pero las{" "}
                    <strong>tarjetas se mantendrán</strong>.
                  </p>
                  <div className="modal-info-box">
                    <span className="info-label">
                      ⚠️ Esta acción no se puede deshacer
                    </span>
                  </div>
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeResetModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={handleResetConfirm}
                  >
                    Continuar
                  </button>
                </div>
              </>
            ) : (
              // Segunda confirmación - Advertencia final
              <>
                <div className="modal-header">
                  <div className="modal-icon danger-icon">
                    <WarningIcon />
                  </div>
                  <h3>⚠️ Advertencia</h3>
                </div>
                <div className="modal-body">
                  <p className="modal-text danger-text">
                    <strong>¡Atención!</strong> Estás a punto de borrar
                    definitivamente:
                  </p>
                  <ul className="modal-list">
                    <li>Todo tu progreso de estudio</li>
                    <li>La fecha de tus repeticiones</li>
                    <li>Tu racha actual</li>
                    <li>Las estadísticas del mazo</li>
                  </ul>
                  <p className="modal-text highlight-text">
                    Las tarjetas permanecerán, pero volverán al estado "nuevas".
                  </p>
                  <div className="modal-danger-box">
                    <span className="danger-label">
                      ¿Estás completamente seguro?
                    </span>
                  </div>
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeResetModal}
                  >
                    No, cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleResetConfirm}
                  >
                    Sí, reiniciar todo
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Clear All Data Modal - Doble Confirmación */}
      {showClearModal && (
        <div className="modal-overlay" onClick={closeClearModal}>
          <div
            className="modal modal-reset modal-clear"
            onClick={(e) => e.stopPropagation()}
          >
            {clearStep === 1 ? (
              // Primera confirmación
              <>
                <div className="modal-header">
                  <div className="modal-icon danger-icon">
                    <WarningIcon />
                  </div>
                  <h3>¿Borrar todos los datos?</h3>
                </div>
                <div className="modal-body">
                  <p className="modal-text">
                    Esta acción <strong>borrará completamente</strong> toda la
                    información guardada en tu navegador.
                  </p>
                  <div className="modal-info-box">
                    <span className="info-label">📦 Se eliminará:</span>
                  </div>
                  <ul className="modal-list">
                    <li>Todos tus mazos y tarjetas personalizadas</li>
                    <li>Todo tu progreso de estudio</li>
                    <li>Todas las estadísticas y repeticiones</li>
                    <li>Cualquier configuración guardada</li>
                  </ul>
                  <div className="modal-info-box info-green">
                    <span className="info-label">✅ Se restaurarán:</span>
                  </div>
                  <ul className="modal-list">
                    <li>
                      Los mazos originales (Sistemas Informáticos, Entornos de
                      Desarrollo)
                    </li>
                    <li>Todo el contenido predefinido de las materias</li>
                  </ul>
                  <div className="modal-danger-box">
                    <span className="danger-label">
                      ⚠️ Esta acción es irreversible
                    </span>
                  </div>
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeClearModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={handleClearConfirm}
                  >
                    Entendido, continuar
                  </button>
                </div>
              </>
            ) : (
              // Segunda confirmación - Advertencia final
              <>
                <div className="modal-header">
                  <div className="modal-icon danger-icon">
                    <WarningIcon />
                  </div>
                  <h3>⚠️ Última advertencia</h3>
                </div>
                <div className="modal-body">
                  <p className="modal-text danger-text">
                    <strong>¡Atención!</strong> Estás a punto de eliminar todo:
                  </p>
                  <ul className="modal-list">
                    <li>
                      <strong>510 tarjetas</strong> de Sistemas Informáticos con
                      tu progreso
                    </li>
                    <li>
                      <strong>308 tarjetas</strong> de Entornos de Desarrollo
                      con tu progreso
                    </li>
                    <li>Cualquier mazo o tarjeta que hayas creado</li>
                    <li>Todo tu historial de estudio y estadísticas</li>
                  </ul>
                  <p className="modal-text highlight-text">
                    Los mazos originales se recargarán, pero{" "}
                    <strong>perderás todo tu avance</strong>.
                  </p>
                  <div className="modal-danger-box">
                    <span className="danger-label">
                      ¿Estás completamente seguro de borrar TODO?
                    </span>
                  </div>
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeClearModal}
                  >
                    No, mantener mis datos
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleClearConfirm}
                  >
                    Sí, borrar todo
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
