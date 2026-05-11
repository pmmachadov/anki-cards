# DWEC — Desarrollo Web en Entorno Cliente (Mòdul 0612)

> 25 ejercicios prácticos extraídos de EAC1, EAC3 y proyectos.

---

## Unidad 1: JavaScript — Sintaxis, Funciones, Arrays y Objetos (EAC1)

| # | Ejercicio práctico | Conceptos clave |
|---|--------------------|-----------------|
| 1.1 | **Contador de caracteres en tiempo real**: Crear un campo de texto que muestre un contador de caracteres escrito y un botón para limpiar el campo. | `input`, `textContent`, eventos, DOM básico |
| 1.2 | **Validación de contraseña con intentos limitados**: Pedir contraseña mediante `prompt`, validar contra una predefinida, máximo 3 intentos con `do-while`, mostrar mensajes de éxito o bloqueo. | `do-while`, `prompt`, `alert`, `continue`, lógica condicional |
| 1.3 | **Calculadora de operaciones básicas**: Dos inputs numéricos, un `<select>` para elegir operación (suma, resta, multiplicación, división) y botón calcular. Manejar división por cero. | `parseFloat`, `switch` / `if-else`, eventos, DOM |
| 1.4 | **Catálogo de películas con arrays y objetos**: Crear un array de objetos `{titulo, director, anio, vista}`. Funciones para: mostrar catálogo, filtrar por año con `filter`, contar vistas. | Arrays de objetos, `forEach`, `filter`, arrow functions |
| 1.5 | **Gestión de productos con clases ES2022**: Clase `Producto` con propiedad privada `#stock`, constructor, getter `info`, método `actualizarStock()`. Instanciar y probar. | Clases, propiedades privadas, getters, métodos |
| 1.6 | **Módulos ES6**: Separar funciones de utilidad (validaciones, cálculos) en un archivo `utils.js`, exportarlas e importarlas en `main.js` con `type="module"`. | `export` / `import`, módulos ES6 |
| 1.7 | **Validación con expresiones regulares**: Formulario que valide DNI, código postal, teléfono y email usando regex. Mostrar mensajes de error específicos. | Regex (`^\d{8}[A-Z]$`, etc.), validación de formularios |
| 1.8 | **Ordenación de arrays complejos**: Dado un array de objetos, ordenar por múltiples criterios (por ejemplo, año descendente y título ascendente). | `sort()` con función de comparación, spread `[...array]` |
| 1.9 | **Conversor de formatos de fecha**: Recibir una fecha en formato string, convertirla a objeto `Date` y mostrarla en diferentes formatos (DD/MM/YYYY, texto largo, etc.). | `Date`, `getFullYear`, `getMonth`, `getDate` |
| 1.10 | **Juego de adivinanza**: Generar número aleatorio, pedir al usuario que adivine, indicar si es mayor o menor, contar intentos. Usar `Math.random`, bucles y condicionales. | `Math.random`, `while`, lógica de control |

---

## Unidad 2: DOM y Eventos (EAC3)

| # | Ejercicio práctico | Conceptos clave |
|---|--------------------|-----------------|
| 2.1 | **Manipulación de clases CSS**: Botones que al hacer clic añadan, quiten o alternen clases de un elemento para cambiar su apariencia. | `classList.add/remove/toggle/contains` |
| 2.2 | **Lista dinámica de tareas**: Input + botón para añadir elementos a una lista `<ul>`, con botón de eliminar cada ítem. Vaciar lista completa. | `createElement`, `appendChild`, `innerHTML`, eventos delegados |
| 2.3 | **Teclado virtual**: Detectar teclas presionadas (`keydown`) y mostrar en pantalla la tecla pulsada, diferenciando entre caracteres y modificadores. | `keydown`, `event.key`, `event.preventDefault` |
| 2.4 | **Galería de imágenes interactiva**: Miniaturas que al pasar el ratón (`mouseenter`) cambian la imagen principal. | `mouseenter` / `mouseleave`, `event.target` |
| 2.5 | **Formulario con validación en tiempo real**: Validar campos mientras el usuario escribe (email, longitud mínima, coincidencia de contraseñas). | `input` events, validación dinámica, feedback visual |
| 2.6 | **Inicialización segura del DOM**: Todo el código de manipulación DOM encapsulado dentro de `DOMContentLoaded`. | `document.addEventListener('DOMContentLoaded')` |
| 2.7 | **Cambio de tema (modo oscuro/claro)**: Botón que cambia variables CSS mediante `element.style` o clases, guardando preferencia en `localStorage`. | CSS dinámico, `localStorage` |
| 2.8 | **Propagación de eventos**: Crear elementos anidados y demostrar `stopPropagation` vs comportamiento por defecto. | `stopPropagation`, bubbling/capturing |

---

## Unidad 3: Fetch API, Express y Proyecto Completo

| # | Ejercicio práctico | Conceptos clave |
|---|--------------------|-----------------|
| 3.1 | **Consumo de API pública**: Usar `fetch` para obtener datos de una API (ej. JSONPlaceholder), mostrar lista y manejar estados de carga/error. | `fetch`, `async/await`, `try-catch`, JSON |
| 3.2 | **CRUD con Fetch**: Frontend que haga GET, POST, PUT, DELETE a un backend Express, mostrando resultados en una tabla. | Métodos HTTP, headers, `JSON.stringify` |
| 3.3 | **Servidor Express básico**: Crear servidor con rutas GET/POST/PUT/DELETE, usar `express.json()`, `cors()`, devolver datos estáticos. | Express, routing, middleware |
| 3.4 | **Persistencia con JSON en Node.js**: Leer y escribir datos en un archivo `db.json` usando `fs`, implementar un CRUD completo. | `fs.readFileSync`, `fs.writeFileSync`, `JSON.parse/stringify` |
| 3.5 | **Formulario de contacto con backend**: Formulario HTML que envíe datos vía `fetch` POST a servidor Express, valide campos vacíos y muestre respuesta. | `preventDefault`, validación, POST con body |
| 3.6 | **Detección de estado de red**: Mostrar indicador visual si el usuario está online/offline usando `navigator.onLine` y eventos `online`/`offline`. | API de red del navegador |
| 3.7 | **Proyecto Taller / Garage**: Aplicación completa con Express + frontend para gestionar vehículos (matrícula, km). Validar duplicados, manejar errores 400/409/404. | CRUD completo, validaciones, códigos HTTP |
