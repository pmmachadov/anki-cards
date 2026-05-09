# Guía de Desarrollo Web en Entorno Cliente (DWEC)

> Resumen de temas extraídos de las pruebas EAC1, EAC3 y proyecto Taller.

---

## 📚 Unidad 1: JavaScript - Sintaxis, Funciones, Arrays y Objetos (EAC1)

### 1.1 Variables y Tipos de Datos
- **`const`**: valor constante, no reasignable. Debe inicializarse.
- **`let`**: variable reasignable, ámbito de bloque.
- Tipos primitivos: `string`, `number`, `boolean`, `null`, `undefined`.

### 1.2 Operadores
- **Aritméticos**: `+`, `-`, `*`, `/`, `%`
- **Comparación**: `===`, `!==`, `<`, `>`, `<=`, `>=`
- **Lógicos**: `&&`, `||`, `!`

### 1.3 Condicionales
```javascript
if (condicion) {
    // código
} else if (otraCondicion) {
    // código
} else {
    // código por defecto
}
```
- Uso de `.toLowerCase()` para comparaciones insensibles a mayúsculas.

### 1.4 Bucles
- **`do-while`**: ejecuta al menos una vez antes de evaluar la condición.
- **`while`**: evalúa la condición antes de cada iteración.
- **`continue`**: salta a la siguiente iteración.

### 1.5 Funciones
- **Declaración tradicional**:
  ```javascript
  function nombre(param) { return valor; }
  ```
- **Arrow functions (ES6)**:
  ```javascript
  const fn = (param) => param * 2;
  ```
- **Métodos de String**: `.trim()`, `.toUpperCase()`, `.toLowerCase()`
- **Métodos de Number**: `.toFixed(2)`

### 1.6 Objetos `Date`
```javascript
const fecha = new Date(2000, 4, 15); // meses: 0-11
const anio = fecha.getFullYear();
const hoy = new Date().getFullYear();
```

### 1.7 Arrays
- **Declaración**: `const arr = [1, 2, 3];`
- **Recorrer**: `.forEach()`
- **Filtrar**: `.filter()`
- **Buscar**: `.find()`, `.findIndex()`
- **Ordenar**: `.sort()` con función de comparación
- **Crear copia**: `[...array]` (spread operator)

### 1.8 Arrays de Objetos
```javascript
const catalogo = [
    { titulo: 'El Padrino', anio: 1972, vista: true },
    { titulo: 'Inception', anio: 2010, vista: false }
];
```

### 1.9 Clases y POO (ES2022)
```javascript
class Producto {
    #stock; // propiedad privada

    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.#stock = stock;
    }

    get info() {
        return `${this.nombre} - ${this.precio.toFixed(2)} €`;
    }

    actualizarStock(cantidad) { ... }
}

const p = new Producto('Cafetera', 49.99, 10);
```

### 1.10 Módulos ES6
```javascript
// Exportar
export function miFuncion() { ... }

// Importar
import { miFuncion } from './modulo.js';
```
- El script HTML debe tener `type="module"`.

### 1.11 Expresiones Regulares (Regex)
```javascript
const soloDigitos = /^\d+$/.test(valor);
```

---

## 🎨 Unidad 2: DOM y Eventos (EAC3)

### 2.1 Selectores del DOM
- `document.getElementById('id')` → un elemento
- `document.querySelectorAll('.clase')` → NodeList
- `document.querySelector('#id')` → primer elemento que coincide

### 2.2 Manipulación de Clases CSS
```javascript
element.classList.add('activo');
element.classList.remove('activo');
element.classList.toggle('activo');
element.classList.contains('activo');
```

### 2.3 Creación y Eliminación de Elementos
```javascript
const div = document.createElement('div');
div.classList.add('item');
div.textContent = 'Texto';
contenedor.appendChild(div);

// Vaciar
contenedor.innerHTML = '';
```

### 2.4 Eventos del Ratón
- `click`, `mouseenter`, `mouseleave`
- `mouseover`, `mouseout`, `mousemove`

### 2.5 Eventos del Teclado
- `keydown`, `keyup`, `keypress`
- `event.key` devuelve la tecla como string

### 2.6 Registro de Eventos
```javascript
element.addEventListener('click', handler);
element.removeEventListener('click', handler);
```

### 2.7 Objeto `event`
- `event.target`: elemento que disparó el evento
- `event.preventDefault()`: evita comportamiento por defecto
- `event.stopPropagation()`: detiene la propagación

### 2.8 Inicialización del DOM
```javascript
document.addEventListener('DOMContentLoaded', () => {
    // código que requiere el DOM cargado
});
```

### 2.9 CSS Dinámico
```javascript
element.style.display = 'none';
element.style.backgroundColor = 'red';
```

---

## 🌐 Unidad 3: Fetch API, Express y Proyecto Completo

### 3.1 Fetch API
```javascript
// GET
const res = await fetch(url);
const data = await res.json();

// POST
const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ campo: 'valor' })
});
```

### 3.2 Async/Await
```javascript
async function cargarDatos() {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Error');
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}
```

### 3.3 Express Básico
```javascript
const express = require('express');
const app = express();

app.use(express.json()); // parsear JSON
app.use(cors());         // habilitar CORS

app.get('/ruta', (req, res) => { ... });
app.post('/ruta', (req, res) => { ... });
app.put('/ruta/:id', (req, res) => { ... });
app.delete('/ruta/:id', (req, res) => { ... });

app.listen(3000);
```

### 3.4 Códigos HTTP Comunes
| Código | Significado |
|--------|-------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

### 3.5 Persistencia con JSON (Node.js)
```javascript
const fs = require('fs');

// Leer
const data = JSON.parse(fs.readFileSync('db.json', 'utf-8'));

// Escribir
fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
```

### 3.6 Validaciones
- Comprobar campos vacíos: `!valor.trim()`
- Longitud mínima: `pass.length < 8`
- Coincidencia: `pass1 === pass2`
- Regex: `/^\d{5}$/.test(cp)`

### 3.7 Formularios
```javascript
form.addEventListener('submit', (e) => {
    e.preventDefault(); // evita recarga
    // validar y enviar...
});
```

### 3.8 Dialogos del Navegador
- `prompt('Mensaje')` → devuelve string o `null`
- `alert('Mensaje')` → muestra mensaje
- `confirm('¿Seguro?')` → devuelve `true` o `false`

### 3.9 Estado de Red
```javascript
navigator.onLine; // true/false
window.addEventListener('online', handler);
window.addEventListener('offline', handler);
```

---

## 🎯 Consejos para el Examen

1. **Saber diferenciar** `const`, `let` y cuándo usar cada uno.
2. **Dominar** arrow functions y funciones tradicionales.
3. **Conocer** los métodos de array: `forEach`, `filter`, `find`, `findIndex`, `sort`.
4. **Entender** `async/await` y manejar errores con `try-catch`.
5. **Saber** construir peticiones fetch GET/POST/PUT/DELETE.
6. **Recordar** que `req.params` es para URL y `req.body` para datos JSON.
7. **Validar** siempre las entradas del usuario antes de procesarlas.
8. **Usar** `e.preventDefault()` en formularios para evitar recargas.
9. **Conocer** los eventos del DOM: ratón, teclado y carga del documento.
10. **Practicar** la creación de clases con propiedades privadas (`#stock`).

---

*Generado para estudios de DAW - Desarrollo Web en Entorno Cliente*
