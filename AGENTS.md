# AnkiCards - AI Agent Documentation

## Project Overview

AnkiCards is a Spanish-language flashcard study application implementing **spaced repetition** using an adapted SM-2 algorithm. It's designed for students (FP and university level) to optimize learning through intelligent scheduling of card reviews.

The application includes pre-loaded study materials for computer science subjects ("Sistemas Informáticos" with 510 cards, "Entornos de Desarrollo" with 308 cards) and supports creating custom decks.

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 19.2.4 |
| Build Tool | Vite | 8.0.1 |
| Charts | Recharts | 3.8.1 |
| Linting | ESLint | 9.39.4 |
| Persistence | localStorage | Browser API |

### Key Dependencies
- `react` & `react-dom`: UI framework with hooks
- `recharts`: Statistical charts (Pie, Area, Bar, Line)
- `@vitejs/plugin-react`: Fast React HMR
- `eslint-plugin-react-hooks` & `eslint-plugin-react-refresh`: React-specific linting

## Project Structure

```
anki-cards/
├── public/
│   ├── data/                    # JSON deck files (28+ subject files)
│   │   ├── sistemas-informaticos.json
│   │   ├── entornos-desarrollo.json
│   │   ├── dom-actualizacion-elementos.json
│   │   ├── dom-consulta-busqueda.json
│   │   ├── dom-estilos-css.json
│   │   ├── dom-eventos.json
│   │   ├── dwec-unidad3-dom-parte1.json
│   │   ├── dwec-unidad3-dom-parte2.json
│   │   └── unidad*.json         # Additional unit files
│   ├── favicon.svg
│   └── icons.svg
├── scripts/                     # Data conversion utilities
│   ├── convert-to-uuid.js
│   ├── fix-json.js
│   └── uuid-converter.js
├── src/
│   ├── model/                   # Business logic & data layer
│   │   ├── Deck.js              # Card & Deck classes + SM-2 algorithm
│   │   └── DataStore.js         # localStorage persistence
│   ├── view/                    # React UI components
│   │   ├── DeckList.jsx         # Dashboard with deck grid
│   │   ├── StudyView.jsx        # Flashcard study session
│   │   ├── StatsView.jsx        # Statistics with charts
│   │   ├── CardEditor.jsx       # Card CRUD interface
│   │   └── *.css                # Component styles
│   ├── assets/                  # Static images
│   ├── data/
│   │   └── cardsData.js         # Legacy data (if any)
│   ├── App.jsx                  # Main controller component
│   ├── App.css                  # App-level styles
│   ├── index.css                # Global styles & CSS variables
│   ├── vars.css                 # CSS variable definitions
│   └── main.jsx                 # React entry point
├── fix-css-vars.ps1             # Post-build CSS processor (Windows)
├── vite.config.js               # Vite configuration
├── eslint.config.js             # ESLint flat config
├── package.json
└── index.html                   # HTML entry with critical CSS
```

## Build Commands

```bash
# Development server (port 5173)
npm run dev

# Production build
# Runs Vite build + PowerShell script to inline CSS variables
npm run build

# Preview production build
npm run preview

# Lint check
npm run lint
```

### Build Process Details

1. **Vite Build**: Bundles React app to `dist/` directory
2. **CSS Processing**: `fix-css-vars.ps1` runs post-build to replace CSS variables with static values for better compatibility

## Architecture Patterns

### MVC-Like Structure

- **Model** (`src/model/`): Pure JavaScript classes handling business logic
  - `Deck.js`: Core spaced repetition algorithm, card state management
  - `DataStore.js`: Persistence abstraction over localStorage

- **View** (`src/view/`): React functional components with hooks
  - Receive data via props, emit events via callbacks
  - Each component has colocated CSS file

- **Controller** (`App.jsx`): State coordination
  - Holds global state (decks, current view)
  - Handles view switching and data flow
  - Loads initial data from JSON files

### State Management

- **Local state**: React `useState` within components
- **Global state**: Lifted to `App.jsx`, passed down as props
- **Persistence**: `DataStore` class handles localStorage serialization
- **Data flow**: Unidirectional (props down, callbacks up)

### CSS Architecture

- **CSS Variables**: Defined in `src/vars.css` and `src/index.css`
- **Dark Theme**: GitHub-inspired color palette (`#0d1117` background)
- **Component Styles**: Each component has dedicated `.css` file
- **Responsive**: Mobile-first with touch-friendly targets (44px minimum)

## Key Implementation Details

### Spaced Repetition Algorithm (SM-2 Adapted)

Located in `src/model/Deck.js`:

```javascript
// 4 difficulty levels
DIFFICULTY = { AGAIN: 0, HARD: 1, GOOD: 2, EASY: 3 }

// Base intervals in days
INTERVAL_FACTORS = { 0: 1, 1: 2, 2: 3, 3: 4 }

// Card states: 'new' → 'learning'/'relearning' → 'review'
```

Card progression:
1. New cards start with `easinessFactor = 2.5`
2. "Again" resets repetitions and lowers EF by 0.2
3. "Hard" lowers EF by 0.15
4. "Easy" increases EF by 0.15
5. Intervals grow exponentially based on EF

### Keyboard Shortcuts

Implemented in `StudyView.jsx`:

| Key | Action |
|-----|--------|
| `Space` | Flip card |
| `1` | Rate "Again" |
| `2` | Rate "Hard" |
| `3` | Rate "Good" |
| `4` | Rate "Easy" |

### Data Persistence

- **Storage Key**: `anki_cards_data`
- **Format**: JSON array of deck objects
- **Auto-save**: On every deck mutation via `useEffect`
- **Reset**: Full data clear + reload from JSON files

### JSON Data Format

```json
{
  "id": "subject-id",
  "name": "Display Name",
  "description": "Deck description",
  "subject": "Category",
  "cards": [
    {
      "id": "uuid-or-index",
      "front": "Question text",
      "back": "Answer text (supports \\n)",
      "tags": ["tag1", "tag2"],
      "difficulty": "easy|medium|hard"
    }
  ]
}
```

## Development Guidelines

### Code Style

- **Language**: Spanish for UI text and comments, English for code
- **Quotes**: Single quotes for strings
- **Semicolons**: Required
- **Imports**: Group by external → internal, alphabetically within groups
- **Components**: PascalCase, functions with explicit props destructuring

### ESLint Configuration

```javascript
// eslint.config.js
- Extends: @eslint/js recommended, react-hooks, react-refresh
- Parser: Latest ECMAScript with JSX
- Globals: Browser environment
- Custom rule: Unused vars ignore pattern `^[A-Z_]`
```

### Component Patterns

```jsx
// Functional component with hooks
export function ComponentName({ prop1, prop2, onAction }) {
  const [state, setState] = useState(initial)
  
  // Handlers defined before JSX
  const handleClick = () => { ... }
  
  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  )
}
```

### CSS Conventions

- Use CSS variables for colors (`var(--bg-primary)`)
- BEM-like naming: `.component-element--modifier`
- Animation classes: `.animate-fade-in`
- Responsive breakpoints: Mobile-first approach

## Testing Strategy

**Current State**: No automated tests configured.

**Manual Testing Checklist**:
- Card flip animation (3D transform)
- Keyboard shortcuts in study mode
- Deck CRUD operations
- Statistics calculation accuracy
- localStorage persistence across reloads
- Fullscreen mode toggle
- Reset progress functionality (double confirmation)

## Deployment Considerations

### Pre-Deployment Checklist

1. Run `npm run build` successfully
2. Verify `fix-css-vars.ps1` executed (CSS variables replaced)
3. Check `dist/` contains all assets
4. Test production build with `npm run preview`

### Environment Requirements

- **Build**: Node.js 18+ with npm
- **Runtime**: Modern browser with localStorage support
- **Platform**: Windows (for build script), but app runs anywhere

### Known Limitations

1. **Windows-only build script**: `fix-css-vars.ps1` requires PowerShell
2. **No offline service worker**: Requires network for initial load
3. **Single-user**: No multi-user or sync capabilities
4. **localStorage limits**: ~5MB storage cap per domain

## Security Notes

- **XSS**: React's automatic escaping protects against injection
- **localStorage**: Data is unencrypted in browser storage
- **No authentication**: Anyone with browser access can view/modify data
- **JSON imports**: Static files only, no dynamic code execution

## Adding New Study Materials

1. Create JSON file in `public/data/` following the schema above
2. Import in `App.jsx` `loadData()` function:

```javascript
const response = await fetch('/data/new-subject.json')
const data = await response.json()
const deck = new Deck(data.name, data.id)
// ... populate cards
```

3. Add subject icon to `SubjectIcons` in `DeckList.jsx` if needed

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| White flash on load | Check critical CSS in `index.html` |
| CSS variables not working | Verify `fix-css-vars.ps1` ran during build |
| Cards not appearing | Check browser DevTools → Application → localStorage |
| Study stats wrong | Verify `Deck.recordReview()` is called correctly |

### Debug Tools

- React DevTools: Inspect component hierarchy
- Redux DevTools: Not applicable (no Redux)
- Browser DevTools: Check localStorage, network requests

## File Modification Guide

| If you need to... | Modify... |
|-------------------|-----------|
| Change study algorithm | `src/model/Deck.js` - `Card.review()` |
| Add new chart type | `src/view/StatsView.jsx` |
| Change color theme | `src/vars.css` + `src/index.css` |
| Add new keyboard shortcut | `src/view/StudyView.jsx` - `handleKeyDown` |
| Change card data structure | `src/model/Deck.js` + all JSON files |
| Add database backend | `src/model/DataStore.js` |
