# <div align="center">🧠 AnkiCards</div>

<div align="center">
  <strong>Aplicación de flashcards con repetición espaciada para estudiantes de FP y universidad</strong>
</div>

<div align="center">
  <br>
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white&style=for-the-badge" alt="React">
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white&style=for-the-badge" alt="Vite">
  <img src="https://img.shields.io/badge/Recharts-3.8-22B5BF?logo=chart.js&logoColor=white&style=for-the-badge" alt="Recharts">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</div>

<br>

<div align="center">
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
</div>

## ✨ Características

| Feature | Descripción |
|---------|-------------|
| 🎴 **Flashcards interactivas** | Volteo 3D, navegación fluida y diseño oscuro optimizado para largas sesiones de estudio |
| 🧮 **Algoritmo SM-2 adaptado** | Repetición espaciada inteligente que optimiza cuándo repasar cada tarjeta |
| ⌨️ **Atajos de teclado** | Estudia sin tocar el ratón: espacio para voltear, 1-4 para puntuar |
| 📊 **Estadísticas visuales** | Gráficos de progreso, distribución de dificultad y evolución del dominio |
| 📝 **Editor de tarjetas** | Crea, edita y elimina tarjetas dentro de cada mazo |
| 🗂️ **Mazos principales + Extras** | Dos materias principales siempre visibles; el resto en un desplegable organizado |
| 💾 **Persistencia local** | Todos los datos se guardan en localStorage; funciona sin servidor |
| 📱 **Responsive** | Adaptado para móvil, tablet y escritorio |

<br>

## 🚀 Demo en vivo

> Despliega tu propia instancia en **Vercel** con un solo clic:
>
> [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/anki-cards)

<br>

## 📸 Vista previa

```
┌─────────────────────────────────────────────────────────────┐
│  🧠 AnkiCards                                    [⛶]       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────┐  ┌──────────┐  ┌──────────┐                  │
│   │ 3 Mazos │  │ 818 Cards│  │  0% Prog │                  │
│   └─────────┘  └──────────┘  └──────────┘                  │
│                                                             │
│   Mis Materias                              [+ Nuevo Mazo] │
│   ─────────────────────────────────────────────────────    │
│                                                             │
│   ┌─────────────────────┐  ┌─────────────────────┐        │
│   │ 💻 Sistemas         │  │ 🔧 Entornos         │        │
│   │ Informaticos        │  │ de Desarrollo       │        │
│   │                     │  │                     │        │
│   │ Progreso 0%         │  │ Progreso 0%         │        │
│   │ ████░░░░░░░░░░░     │  │ ████░░░░░░░░░░░     │        │
│   │                     │  │                     │        │
│   │ 510 nuevas          │  │ 308 nuevas          │        │
│   │ 0 aprendiendo       │  │ 0 aprendiendo       │        │
│   │ 510 repasar         │  │ 0 repasar           │        │
│   │                     │  │                     │        │
│   │ [📖 Estudiar]       │  │ [📖 Estudiar]       │        │
│   └─────────────────────┘  └─────────────────────┘        │
│                                                             │
│   [📂 Extras ▼]  —  8 mazos adicionales                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

<br>

## 🛠️ Stack tecnológico

```
Frontend    React 19 + Hooks
Build       Vite 8
Gráficos    Recharts
Estilos     CSS puro con variables (tema dark)
Persistencia localStorage
Linting     ESLint 9 + react-hooks + react-refresh
```

<br>

## 📦 Instalación local

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/anki-cards.git
cd anki-cards

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173
```

### Build de producción

```bash
npm run build
```

El resultado se genera en la carpeta `dist/`, lista para desplegar en Vercel, Netlify, GitHub Pages o cualquier CDN estático.

<br>

## ⌨️ Atajos de teclado (modo estudio)

| Tecla | Acción |
|-------|--------|
| `Espacio` | Voltear tarjeta |
| `1` | "Otra vez" (Again) |
| `2` | "Difícil" (Hard) |
| `3` | "Bien" (Good) |
| `4` | "Fácil" (Easy) |

<br>

## 📁 Estructura del proyecto

```
anki-cards/
├── public/
│   └── data/               # Mazos JSON precargados
│       ├── sistemas-informaticos.json
│       ├── entornos-desarrollo.json
│       └── interconexion-redes-eac3.json
├── src/
│   ├── model/              # Lógica de negocio
│   │   ├── Deck.js         # Clases Card/Deck + algoritmo SM-2
│   │   └── DataStore.js    # Persistencia localStorage
│   ├── view/               # Componentes React
│   │   ├── DeckList.jsx    # Dashboard con grid de mazos
│   │   ├── StudyView.jsx   # Sesión de estudio
│   │   ├── StatsView.jsx   # Estadísticas con gráficos
│   │   └── CardEditor.jsx  # CRUD de tarjetas
│   ├── App.jsx             # Componente raíz / router
│   └── main.jsx            # Punto de entrada
├── scripts/
│   └── fix-css-vars.js     # Post-build: inlinea variables CSS
├── index.html
├── vite.config.js
└── package.json
```

<br>

## 🧠 Algoritmo SM-2 adaptado

El sistema de repetición espaciada implementa una versión adaptada del algoritmo SM-2:

| Dificultad | Efecto en el factor de facilidad | Intervalo base |
|------------|----------------------------------|----------------|
| 🔴 Again   | −0.20                            | 1 día          |
| 🟠 Hard    | −0.15                            | 2 días         |
| 🟢 Good    | Sin cambio                       | 3 días         |
| 🔵 Easy    | +0.15                            | 4 días         |

Las tarjetas nuevas progresan por los estados: `new → learning → review`.

<br>

## 📝 Añadir nuevas materias

1. Crea un archivo JSON en `public/data/mi-materia.json` siguiendo el esquema:

```json
{
  "id": "mi-materia",
  "name": "Mi Materia",
  "description": "Breve descripción",
  "subject": "Categoría",
  "cards": [
    {
      "id": "uuid",
      "front": "Pregunta",
      "back": "Respuesta",
      "tags": ["tag1"],
      "difficulty": "medium"
    }
  ]
}
```

2. Regístralo en `src/App.jsx` dentro del array `deckFiles`.

3. Recarga la aplicación.

<br>

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si encuentras un bug o quieres proponer una mejora:

1. Abre un **issue** describiendo el problema o la idea
2. Haz un **fork** del repositorio
3. Crea una rama con tu feature: `git checkout -b feat/nueva-funcionalidad`
4. Envía un **pull request**

<br>

## 📄 Licencia

Distribuido bajo licencia **MIT**. Consulta `LICENSE` para más información.

<br>

<div align="center">
  <sub>Hecho con ❤️ para estudiantes de FP y universidad</sub>
</div>
