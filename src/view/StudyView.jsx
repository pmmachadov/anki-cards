import { useState, useEffect, useCallback, useRef } from "react";
import { DIFFICULTY } from "../model/Deck";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { shadesOfPurple } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./StudyView.css";

export function StudyView({ deck, onBack, onUpdateDeck }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipRotation, setFlipRotation] = useState(0);
  const [cards, setCards] = useState([]);
  const [sessionStats, setSessionStats] = useState({
    again: 0,
    hard: 0,
    good: 0,
    easy: 0,
  });
  const [showComplete, setShowComplete] = useState(false);

  // Drag-to-scroll para la fila de puntos
  const dotsContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startCardIndex = useRef(0);
  const dragMoved = useRef(false);

  const handleMouseDown = (e) => {
    if (!dotsContainerRef.current || cards.length === 0) return;
    isDragging.current = true;
    dragMoved.current = false;
    startX.current = e.clientX;
    startCardIndex.current = currentCardIndex;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !dotsContainerRef.current || cards.length === 0)
      return;
    const rect = dotsContainerRef.current.getBoundingClientRect();
    const deltaX = e.clientX - startX.current;
    const pxPerCard = rect.width / cards.length;
    const deltaCards = Math.round(deltaX / pxPerCard);
    const newIndex = Math.max(
      0,
      Math.min(cards.length - 1, startCardIndex.current + deltaCards),
    );
    if (Math.abs(newIndex - currentCardIndex) > 0 || Math.abs(deltaX) > 3) {
      dragMoved.current = true;
    }
    if (newIndex !== currentCardIndex) {
      setCurrentCardIndex(newIndex);
      setIsFlipped(false);
      setFlipRotation(0);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e) => {
    if (!dotsContainerRef.current || cards.length === 0) return;
    isDragging.current = true;
    dragMoved.current = false;
    startX.current = e.touches[0].clientX;
    startCardIndex.current = currentCardIndex;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current || !dotsContainerRef.current || cards.length === 0)
      return;
    const rect = dotsContainerRef.current.getBoundingClientRect();
    const deltaX = e.touches[0].clientX - startX.current;
    const pxPerCard = rect.width / cards.length;
    const deltaCards = Math.round(deltaX / pxPerCard);
    const newIndex = Math.max(
      0,
      Math.min(cards.length - 1, startCardIndex.current + deltaCards),
    );
    if (Math.abs(newIndex - currentCardIndex) > 0 || Math.abs(deltaX) > 3) {
      dragMoved.current = true;
    }
    if (newIndex !== currentCardIndex) {
      setCurrentCardIndex(newIndex);
      setIsFlipped(false);
      setFlipRotation(0);
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleDotClick = (index) => {
    if (dragMoved.current) return;
    setCurrentCardIndex(index);
    setIsFlipped(false);
    setFlipRotation(0);
  };

  // Preparar tarjetas para estudio (solo las pendientes)
  useEffect(() => {
    const dueCards = deck.getDueCards();
    const newCards = deck.getNewCards().slice(0, 10); // Máximo 10 nuevas por sesión
    const learningCards = deck.getLearningCards();

    // Orden: primero repaso, luego aprendizaje, luego nuevas
    const studyCards = [...dueCards, ...learningCards, ...newCards];
    setCards(studyCards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowComplete(false);
  }, [deck]);

  const currentCard = cards[currentCardIndex];
  const progress =
    cards.length > 0 ? (currentCardIndex / cards.length) * 100 : 0;

  // Normaliza texto: los datos usan 'n' literal como marcador de newline
  const normalizeText = (text) => {
    if (!text) return "";
    let result = text
      // Escapes estándar primero (por si acaso hay \n reales)
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t");

    // Paso 1: Detectar bloques de código con n literal (```javascriptn...n```)
    // y reemplazar inteligentemente n → \n dentro del bloque
    result = result.replace(
      /```\s*(?:js|javascript)n([\s\S]*?)n```/gi,
      (match, codeContent) => {
        let c = codeContent;
        // nn → doble salto (si hay)
        c = c.replace(/nn/g, "\n\n");
        // n después de ; } ] , → siempre newline
        c = c.replace(/([;}\]])n/g, "$1\n");
        c = c.replace(/,n/g, ",\n");
        // n después de { [ ( → solo si seguido de whitespace
        c = c.replace(/([\[({])n(\s)/g, "$1\n$2");
        // n al inicio → newline
        c = c.replace(/^n/, "\n");
        // n antes de palabras clave JS (con o sin espacios)
        c = c.replace(
          /n\s*(?=(?:if|else|for|while|do|return|const|let|var|function|class|switch|case|catch|try|throw|new|this|typeof|delete|import|export|async|await|console|alert|prompt|document|window|Math|JSON|form)\b)/g,
          "\n",
        );
        // n antes de comentario
        c = c.replace(/n\s*(?=\/\/|\/\*)/g, "\n");
        // n antes de cierre ``` y antes de ); }]; etc
        c = c.replace(/n(?=```)/g, '\n')
        c = c.replace(/n(?=[})\]]\s*[;,\]\)])/g, '\n')
        // n restante(s) entre newline y letra mayúscula
        c = c.replace(/\nn(?=[A-Z])/g, "\n\n");
        // limpiar 3+ saltos
        c = c.replace(/\n{3,}/g, "\n\n");
        return "```javascript\n" + c.trim() + "\n```";
      },
    );

    // Paso 2: Fuera de los bloques ya formateados, convertir patrones obvios
    result = result
      .replace(/nn/g, "\n\n") // nn → doble salto
      .replace(/n(?=```)/g, "\n") // n antes de cierre de bloque
      .replace(/\n{3,}/g, "\n\n"); // limpiar 3+ saltos

    return result;
  };

  // Extrae un ejemplo de código del back para mostrar como pista en el front
  const extractCodeHint = (backText) => {
    if (!backText) return null;
    const normalized = normalizeText(backText);
    // Buscar primer bloque de código
    const blockMatch = normalized.match(/```(\w*)\n([\s\S]*?)```/);
    if (blockMatch) {
      const lang = blockMatch[1] || "javascript";
      const lines = blockMatch[2]
        .split("\n")
        .filter((l) => l.trim().length > 0);
      if (lines.length > 0) {
        // Tomar hasta 3 líneas para el ejemplo
        const hintLines = lines.slice(0, 3);
        return { code: hintLines.join("\n"), lang };
      }
    }
    // Si no hay bloque, buscar código inline
    const inlineMatch = normalized.match(/`([^`]{5,50})`/);
    if (inlineMatch) {
      return { code: inlineMatch[1], lang: "javascript" };
    }
    return null;
  };

  // Renderiza código inline con estilo VSCode
  const renderInlineCode = (code, key) => (
    <code key={key} className="inline-code">
      {code}
    </code>
  );

  // Render text and wrap different parentheses types with colored spans
  const renderTextWithParens = (text, baseKey) => {
    if (!text) return [];
    // Split keeping parentheses characters
    const tokens = text.split(/([()\[\]{}<>])/g);
    return tokens
      .map((t, i) => {
        if (!t) return null;
        const key = `${baseKey}-${i}`;
        switch (t) {
          case "(":
          case ")":
            return (
              <span key={key} className="paren paren-round">
                {t}
              </span>
            );
          case "[":
          case "]":
            return (
              <span key={key} className="paren paren-square">
                {t}
              </span>
            );
          case "{":
          case "}":
            return (
              <span key={key} className="paren paren-curly">
                {t}
              </span>
            );
          case "<":
          case ">":
            return (
              <span key={key} className="paren paren-angle">
                {t}
              </span>
            );
          default:
            return t;
        }
      })
      .filter(Boolean);
  };

  // Función para procesar texto y resaltar código
  const renderCardContent = (text) => {
    if (!text) return null;

    const normalized = normalizeText(text);
    const lines = normalized.split("\n");
    const elements = [];
    let currentText = [];
    let codeBlock = null;
    let codeLines = [];

    // Procesa acumulador de texto normal
    const flushText = (keySuffix) => {
      if (currentText.length === 0) return;
      const paragraph = currentText.join("\n");
      currentText = [];

      // Divide el párrafo en partes para detectar código inline `...`
      const parts = paragraph.split(/`([^`]+)`/g);
      const mixed = [];
      parts.forEach((part, idx) => {
        if (idx % 2 === 1) {
          mixed.push(renderInlineCode(part, `inline-${keySuffix}-${idx}`));
        } else if (part) {
          // Replace parentheses characters with colored spans
          const parenNodes = renderTextWithParens(
            part,
            `p-${keySuffix}-${idx}`,
          );
          mixed.push(...parenNodes);
        }
      });

      elements.push(
        <p key={`text-${keySuffix}`} className="card-text-paragraph">
          {mixed}
        </p>,
      );
    };

    // Procesa acumulador de bloque de código
    const flushCode = (keySuffix) => {
      if (codeLines.length === 0) return;
      const code = codeLines.join("\n");
      const lang = codeBlock || "text";
      codeLines = [];
      codeBlock = null;

      elements.push(
        <div key={`code-${keySuffix}`} className="code-block-wrapper">
          <div className="code-block-header">
            <span className="code-lang-label">{lang}</span>
          </div>
          <SyntaxHighlighter
            language={lang}
            style={shadesOfPurple}
            customStyle={{
              margin: "0",
              borderRadius: "0 0 8px 8px",
              fontSize: "1.1rem",
              lineHeight: "1.6",
              background: "#1e1e1e",
              padding: "16px 20px",
            }}
            wrapLongLines={false}
          >
            {code}
          </SyntaxHighlighter>
        </div>,
      );
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      const codeBlockStart = line.match(/^```(\w+)?$/);
      const codeBlockEnd = trimmed === "```";

      if (codeBlockStart && !codeBlock) {
        flushText(index);
        codeBlock = codeBlockStart[1] || "text";
      } else if (codeBlockEnd && codeBlock) {
        flushCode(index);
      } else if (codeBlock) {
        codeLines.push(line);
      } else {
        currentText.push(line);
      }
    });

    flushText("final");
    flushCode("final");

    return elements;
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setFlipRotation((prev) => prev + 180);
  };

  const handleRate = useCallback(
    (difficulty) => {
      if (!currentCard) return;

      // Actualizar tarjeta
      const result = currentCard.review(difficulty);

      // Actualizar estadísticas de sesión
      setSessionStats((prev) => ({
        ...prev,
        [Object.keys(DIFFICULTY)[difficulty].toLowerCase()]:
          prev[Object.keys(DIFFICULTY)[difficulty].toLowerCase()] + 1,
      }));

      // Guardar progreso y estadísticas
      deck.recordReview(difficulty);
      onUpdateDeck(deck);

      // Siguiente tarjeta
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex((prev) => prev + 1);
        setIsFlipped(false);
        setFlipRotation(0);
      } else {
        setShowComplete(true);
      }
    },
    [currentCard, currentCardIndex, cards.length, deck, onUpdateDeck],
  );

  // Scroll al inicio cuando cambia la tarjeta
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentCardIndex]);

  // Auto-scroll para mantener el punto actual visible en la fila
  useEffect(() => {
    const currentDot = document.querySelector(".card-dot.current");
    if (currentDot && dotsContainerRef.current) {
      currentDot.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentCardIndex]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showComplete) return;

      if (e.code === "Space") {
        e.preventDefault();
        handleFlip();
      } else if (isFlipped) {
        switch (e.key) {
          case "1":
            handleRate(DIFFICULTY.AGAIN);
            break;
          case "2":
            handleRate(DIFFICULTY.HARD);
            break;
          case "3":
            handleRate(DIFFICULTY.GOOD);
            break;
          case "4":
            handleRate(DIFFICULTY.EASY);
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFlipped, handleFlip, handleRate, showComplete]);

  if (cards.length === 0) {
    return (
      <div className="study-view animate-fade-in">
        <div className="study-header">
          <button className="btn btn-back" onClick={onBack}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: "20px", height: "20px" }}
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
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
            <button
              className="btn btn-primary"
              onClick={() => {
                // Repasar todo el mazo de nuevo
                setCards(deck.cards);
                setCurrentCardIndex(0);
                setIsFlipped(false);
              }}
            >
              Repasar todo el mazo
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showComplete) {
    const total =
      sessionStats.again +
      sessionStats.hard +
      sessionStats.good +
      sessionStats.easy;
    const accuracy = Math.round(
      ((sessionStats.good + sessionStats.easy) / total) * 100,
    );

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
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Estudiar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="study-view animate-fade-in">
      <div className="study-header">
        <button className="btn btn-back" onClick={onBack}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: "20px", height: "20px" }}
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
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

      {/* Card Progress Bar */}
      <div className="card-progress-wrapper">
        <span className="card-progress-number">{currentCardIndex + 1}</span>
        <div
          ref={dotsContainerRef}
          className="card-progress-track"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="card-progress-fill"
            style={{
              width: `${
                cards.length > 1
                  ? (currentCardIndex / (cards.length - 1)) * 100
                  : 100
              }%`,
            }}
          >
            <div className="card-progress-thumb" />
          </div>
        </div>
        <span className="card-progress-number">{cards.length}</span>
      </div>

      {deck.id === "interconexion-redes-eac3" && (
        <div className="step-number-display">
          <span className="step-number-label">Paso</span>
          <span className="step-number-value">{currentCardIndex + 1}</span>
          <span className="step-number-total">de {cards.length}</span>
        </div>
      )}

      <div className="flashcard-container">
        <div
          key={currentCardIndex}
          className="flashcard"
          onClick={handleFlip}
          style={{ transform: `rotateY(${flipRotation}deg)` }}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <div className="card-content">
                {renderCardContent(currentCard.front)}
                {(() => {
                  const hint = extractCodeHint(currentCard.back);
                  if (!hint) return null;
                  return (
                    <div className="card-code-hint">
                      <span className="hint-label">Ejemplo relacionado</span>
                      <div className="hint-code-block">
                        <SyntaxHighlighter
                          language={hint.lang}
                          style={shadesOfPurple}
                          customStyle={{
                            margin: "0",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            lineHeight: "1.5",
                            background: "#0d0d0d",
                            padding: "10px 14px",
                          }}
                          wrapLongLines={true}
                        >
                          {hint.code}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
            <div className="flashcard-back">
              <div className="card-content card-content-code">
                {renderCardContent(currentCard.back)}
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
            Otra vez
          </button>
          <button
            className="rating-btn hard"
            onClick={() => handleRate(DIFFICULTY.HARD)}
          >
            Dificil
          </button>
          <button
            className="rating-btn good"
            onClick={() => handleRate(DIFFICULTY.GOOD)}
          >
            Bien
          </button>
          <button
            className="rating-btn easy"
            onClick={() => handleRate(DIFFICULTY.EASY)}
          >
            Facil
          </button>
        </div>
      ) : (
        <div style={{ height: "60px" }}></div>
      )}
    </div>
  );
}
