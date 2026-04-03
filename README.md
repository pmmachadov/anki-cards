# 🧠 AnkiCards

Aplicación moderna de tarjetas de estudio con **repetición espaciada**, diseñada para optimizar el aprendizaje mediante el algoritmo SM-2.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

![screenshot](https://raw.githubusercontent.com/pmmachadov/anki-cards/main/screenshots/app-preview.png)

## ✨ Características

- 🎨 **Dark theme minimalista** - Interfaz limpia y moderna
- 🧠 **Repetición espaciada** - Algoritmo SM-2 adaptado
- 📊 **Estadísticas detalladas** - Gráficos de progreso y retención
- 🎯 **4 niveles de dificultad** - Otra vez, Difícil, Bien, Fácil
- 📁 **Gestión de mazos** - Crear, editar, eliminar mazos
- ✏️ **Editor de tarjetas** - Añadir y editar con etiquetas
- 💾 **Persistencia local** - Datos guardados en localStorage
- ⌨️ **Atajos de teclado** - Espacio para voltear, 1-4 para puntuar

## 🚀 Demo en vivo

[Ver demo](https://pmmachadov.github.io/anki-cards) *(próximamente)*

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/pmmachadov/anki-cards.git

# Entrar al directorio
cd anki-cards

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 🎯 Uso

### Estudiar

1. Selecciona un mazo y haz clic en **"📚 Estudiar"**
2. Lee la pregunta y haz clic (o Espacio) para voltear
3. Evalúa tu respuesta:
   - **1 - Otra vez**: No la sabías → repetir en <1 min
   - **2 - Difícil**: Costó recordar → 5 min
   - **3 - Bien**: Correcto → 10 min
   - **4 - Fácil**: Muy fácil → 20 min

### Ver estadísticas

Haz clic en **"📊"** en cualquier mazo para ver:
- Distribución de tarjetas (gráfico circular)
- Actividad de estudio (gráfico de área)
- Respuestas por dificultad (barras)
- Tasa de retención y progreso

### Gestión de mazos

| Botón | Función |
|-------|---------|
| 📚 Estudiar | Iniciar sesión de estudio |
| 📊 | Ver estadísticas detalladas |
| ✏️ Editar | Añadir/modificar tarjetas |
| 🔄 | Reiniciar progreso (mantener tarjetas) |
| 🗑️ | Eliminar mazo completamente |

## 📚 Materiales incluidos

### Sistemas Informáticos (323 tarjetas)

Contenido traducido del catalán al español:

| Unidad | Tema | Tarjetas |
|--------|------|----------|
| **Unidad 1** | Hardware, Redes, SO y Virtualización | 60 |
| **Unidad 2** | Sistemas de ficheros, CLI, Directorios | 39 |
| **Unidad 2** | Ejercicios prácticos (wildcards, compresión) | 26 |
| **Unidad 2** | Autoevaluación comandos y FHS | 33 |
| **Unidad 2** | Administración de discos (teoría: MBR, particiones, LVM) | 25 |
| **Unidad 2** | Actividades prácticas discos (fdisk, LVM, fstab) | 19 |
| **Unidad 2** | Autoevaluación discos (V/F, relaciones, completar) | 26 |
| **Unidad 2** | Trabajo con archivos (permisos, enlaces, búsqueda) | 23 |
| **Unidad 2** | Actividades archivos (permisos, enlaces, find, dpkg) | 16 |
| **Unidad 2** | Autoevaluación archivos (V/F, umask, mklink, dpkg) | 30 |
| **Unidad 3** | Dominios LDAP (conceptos, DIT, DN, instalación) | 25 |

**Temas principales cubiertos:**
- 🔧 **Hardware**: CPU, RAM, GPU, placa base, almacenamiento
- 🌐 **Redes**: Modelo OSI, TCP/IP, switches, routers, VLANs, subnetting
- 🛡️ **Seguridad**: Riesgos físicos/lógicos, normativa, copias de seguridad
- 💻 **Sistemas Operativos**: Windows, Linux, macOS, kernel, virtualización
- 📦 **Virtualización**: Hipervisores tipos 1/2, VMs, contenedores, Docker
- 📁 **Sistemas de archivos**: NTFS, ext4, FAT32, transacciones, journaling
- 🗂️ **Directorios**: Estructura FHS, rutas absolutas/relativas
- ⌨️ **Comandos**: Linux (ls, cd, tar, gzip) y Windows (dir, cd)
- 💾 **Particiones**: MBR, GPT, primarias/extendidas/lógicas
- 🔧 **LVM**: Volúmenes físicos, grupos, volúmenes lógicos
- 🛠️ **Mantenimiento**: Montaje, fstab, fsck, desfragmentación

## ⌨️ Atajos de teclado

| Tecla | Acción |
|-------|--------|
| `Espacio` | Voltear tarjeta |
| `1` | Puntuar "Otra vez" |
| `2` | Puntuar "Difícil" |
| `3` | Puntuar "Bien" |
| `4` | Puntuar "Fácil" |

## 🏗️ Arquitectura

```
src/
├── model/              # Lógica de negocio
│   ├── Deck.js         # Clases Card y Deck + algoritmo SM-2
│   └── DataStore.js    # Persistencia localStorage
├── view/               # Componentes de UI
│   ├── DeckList.jsx    # Lista de mazos
│   ├── StudyView.jsx   # Vista de estudio con flip 3D
│   ├── StatsView.jsx   # Estadísticas con gráficos
│   └── CardEditor.jsx  # Editor de tarjetas
├── data/               # Datos JSON de materiales
└── App.jsx             # Controlador principal
```

## 🛠️ Tecnologías

- [React 18](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Recharts](https://recharts.org/) - Gráficos
- [localStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage) - Persistencia

## 📝 Añadir nuevos materiales

Crea un archivo JSON en `public/data/nueva-materia.json`:

```json
{
  "id": "nombre-materia",
  "name": "Nombre Materia",
  "description": "Descripción",
  "subject": "Categoría",
  "cards": [
    {
      "id": 1,
      "front": "¿Pregunta?",
      "back": "Respuesta detallada",
      "tags": ["tag1", "tag2"],
      "difficulty": "easy"
    }
  ]
}
```

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- Algoritmo SM-2 de [SuperMemo](https://www.supermemo.com/en/blog/application-of-a-computer-to-improve-the-results-obtained-in-working-with-the-supermemo-method)
- Diseño inspirado en [Anki](https://apps.ankiweb.net/)
- Material de estudio de Anna Bach - Sistemas Informáticos

---

<p align="center">Hecho con ❤️ para estudiantes de FP y universidad</p>
