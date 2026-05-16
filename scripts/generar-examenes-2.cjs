const fs = require('fs');
const dir = 'public/data/examenes';

// ========== DWEC EAC1 ==========
const dwecEac1 = {
  "id": "examen-dwec-eac1",
  "name": "DWEC - EAC1 (Desarrollo Web en Entorno Cliente)",
  "description": "Preguntas de la EAC1 de DWEC - JavaScript: sintaxis, funciones, arrays, objetos",
  "subject": "Desarrollo Web en Entorno Cliente",
  "cards": [
    {
      "id": "examen-dwec-eac1-1",
      "front": "¿Qué diferencia hay entre const y let en JavaScript? ¿Cuándo usar cada uno?",
      "back": "const: valor constante, no reasignable. Debe inicializarse en su declaración.\nlet: variable reasignable, ámbito de bloque (block scope).\nUsar const por defecto, let solo cuando se necesita reasignar. Evitar var (ámbito de función, hoisting).",
      "tags": ["dwec", "eac1", "javascript", "variables"]
    },
    {
      "id": "examen-dwec-eac1-2",
      "front": "¿Qué tipos primitivos tiene JavaScript?",
      "back": "string, number, boolean, null, undefined.",
      "tags": ["dwec", "eac1", "javascript", "tipos"]
    },
    {
      "id": "examen-dwec-eac1-3",
      "front": "¿Cuál es la diferencia entre == y === en JavaScript?",
      "back": "=== compara valor y tipo (estricta, recomendada).\n== compara valor con conversión implícita de tipo (no recomendada).",
      "tags": ["dwec", "eac1", "javascript", "operadores"]
    },
    {
      "id": "examen-dwec-eac1-4",
      "front": "¿Cómo se usa un condicional if comparando strings de forma insensible a mayúsculas?",
      "back": "Usar .toLowerCase() en ambos lados de la comparación:\nif (variable.toLowerCase() === 'valor') { ... }",
      "tags": ["dwec", "eac1", "javascript", "condicionales"]
    },
    {
      "id": "examen-dwec-eac1-5",
      "front": "¿Qué diferencia hay entre do-while y while?",
      "back": "do-while: ejecuta el bloque al menos una vez antes de evaluar la condición.\nwhile: evalúa la condición antes de cada iteración (puede ejecutarse 0 veces).",
      "tags": ["dwec", "eac1", "javascript", "bucles"]
    },
    {
      "id": "examen-dwec-eac1-6",
      "front": "¿Qué hace la instrucción continue dentro de un bucle?",
      "back": "Salta a la siguiente iteración del bucle, omitiendo el código restante de la iteración actual.",
      "tags": ["dwec", "eac1", "javascript", "bucles"]
    },
    {
      "id": "examen-dwec-eac1-7",
      "front": "¿Qué diferencia hay entre una función tradicional y una arrow function?",
      "back": "Función tradicional: function nombre(param) { return valor; }\nArrow function: const fn = (param) => param * 2;\nArrow functions son más concisas, no tienen su propio this ni arguments.",
      "tags": ["dwec", "eac1", "javascript", "funciones"]
    },
    {
      "id": "examen-dwec-eac1-8",
      "front": "¿Cómo se crea un objeto Date en JavaScript para una fecha específica?",
      "back": "const fecha = new Date(2000, 4, 15);\nNota: los meses van de 0 (enero) a 11 (diciembre).\nPara obtener el año: fecha.getFullYear();",
      "tags": ["dwec", "eac1", "javascript", "date"]
    },
    {
      "id": "examen-dwec-eac1-9",
      "front": "¿Qué métodos de array has utilizado en JS? Explica filter, find y sort.",
      "back": "filter(): crea nuevo array con elementos que cumplen condición.\nfind(): devuelve primer elemento que cumple condición (o undefined).\nfindIndex(): devuelve índice del primer elemento que cumple.\nsort(): ordena el array (requiere función de comparación para números).\nforEach(): itera sobre cada elemento.\nspread operator: [...array] crea copia superficial.",
      "tags": ["dwec", "eac1", "javascript", "arrays"]
    },
    {
      "id": "examen-dwec-eac1-10",
      "front": "¿Cómo se declara una propiedad privada en una clase de JavaScript (ES2022)?",
      "back": "Usando el prefijo #:\nclass Producto {\n  #stock; // propiedad privada\n  constructor(nombre, precio, stock) {\n    this.nombre = nombre;\n    this.#stock = stock;\n  }\n  get info() {\n    return `${this.nombre} - ${this.precio.toFixed(2)} €`;\n  }\n}",
      "tags": ["dwec", "eac1", "javascript", "clases", "poo"]
    },
    {
      "id": "examen-dwec-eac1-11",
      "front": "¿Cómo se exporta e importa un módulo en ES6? ¿Qué atributo debe tener el script HTML?",
      "back": "Exportar: export function miFuncion() { ... }\nImportar: import { miFuncion } from './modulo.js';\nEl script HTML debe tener type=\"module\".",
      "tags": ["dwec", "eac1", "javascript", "modulos"]
    },
    {
      "id": "examen-dwec-eac1-12",
      "front": "¿Cómo validar que un string contiene solo dígitos con expresión regular?",
      "back": "const soloDigitos = /^\\d+$/.test(valor);\n.test() devuelve true si el patrón coincide.",
      "tags": ["dwec", "eac1", "javascript", "regex"]
    }
  ]
};

// ========== DWEC EAC3 ==========
const dwecEac3 = {
  "id": "examen-dwec-eac3",
  "name": "DWEC - EAC3 (Desarrollo Web en Entorno Cliente)",
  "description": "Preguntas de la EAC3 de DWEC - DOM, Eventos, Fetch API y Express",
  "subject": "Desarrollo Web en Entorno Cliente",
  "cards": [
    {
      "id": "examen-dwec-eac3-1",
      "front": "¿Qué selectores del DOM existen y qué devuelve cada uno?",
      "back": "document.getElementById('id') → un elemento\n  document.querySelectorAll('.clase') → NodeList\n  document.querySelector('#id') → primer elemento que coincide",
      "tags": ["dwec", "eac3", "dom", "selectores"]
    },
    {
      "id": "examen-dwec-eac3-2",
      "front": "¿Cómo se manipulan las clases CSS desde JavaScript?",
      "back": "element.classList.add('activo');\nelement.classList.remove('activo');\nelement.classList.toggle('activo');\nelement.classList.contains('activo');",
      "tags": ["dwec", "eac3", "dom", "css"]
    },
    {
      "id": "examen-dwec-eac3-3",
      "front": "¿Cómo se crea un elemento del DOM y se añade a un contenedor? ¿Cómo se vacía un contenedor?",
      "back": "const div = document.createElement('div');\ndiv.classList.add('item');\ndiv.textContent = 'Texto';\ncontenedor.appendChild(div);\n\nVaciar: contenedor.innerHTML = '';",
      "tags": ["dwec", "eac3", "dom", "creacion"]
    },
    {
      "id": "examen-dwec-eac3-4",
      "front": "¿Qué eventos del ratón existen y cuál es la diferencia entre mouseenter/mouseover?",
      "back": "click, mouseenter, mouseleave, mouseover, mouseout, mousemove.\nmouseenter/mouseleave: no burbujean (solo en el elemento).\nmouseover/mouseout: burbujean (también en hijos).",
      "tags": ["dwec", "eac3", "eventos", "raton"]
    },
    {
      "id": "examen-dwec-eac3-5",
      "front": "¿Cómo se registra y elimina un evento en JavaScript?",
      "back": "element.addEventListener('click', handler);\nelement.removeEventListener('click', handler);\n\nPara poder eliminar el evento, handler debe ser una función nombrada (no anónima).",
      "tags": ["dwec", "eac3", "eventos"]
    },
    {
      "id": "examen-dwec-eac3-6",
      "front": "¿Qué propiedades y métodos del objeto event son más importantes?",
      "back": "event.target: elemento que disparó el evento\nevent.preventDefault(): evita comportamiento por defecto\nevent.stopPropagation(): detiene la propagación (burbujeo)",
      "tags": ["dwec", "eac3", "eventos"]
    },
    {
      "id": "examen-dwec-eac3-7",
      "front": "¿Por qué es importante usar DOMContentLoaded?",
      "back": "document.addEventListener('DOMContentLoaded', () => { ... });\nAsegura que el código se ejecute solo cuando el DOM esté completamente cargado, evitando errores al intentar acceder a elementos que aún no existen.",
      "tags": ["dwec", "eac3", "dom"]
    },
    {
      "id": "examen-dwec-eac3-8",
      "front": "¿Cómo se usa fetch para GET y POST?",
      "back": "GET:\nconst res = await fetch(url);\nconst data = await res.json();\n\nPOST:\nconst res = await fetch(url, {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ campo: 'valor' })\n});",
      "tags": ["dwec", "eac3", "fetch", "api"]
    },
    {
      "id": "examen-dwec-eac3-9",
      "front": "¿Cómo se manejan errores con async/await?",
      "back": "async function cargarDatos() {\n  try {\n    const res = await fetch(url);\n    if (!res.ok) throw new Error('Error');\n    return await res.json();\n  } catch (err) {\n    console.error(err);\n  }\n}",
      "tags": ["dwec", "eac3", "async", "await", "errores"]
    },
    {
      "id": "examen-dwec-eac3-10",
      "front": "¿Qué son req.params y req.body en Express?",
      "back": "req.params: parámetros de ruta URL (ej: /:id).\nreq.body: datos JSON del cuerpo de la petición POST/PUT.\nPara usar req.body hay que configurar: app.use(express.json());",
      "tags": ["dwec", "eac3", "express"]
    },
    {
      "id": "examen-dwec-eac3-11",
      "front": "¿Cuáles son los códigos HTTP más comunes y su significado?",
      "back": "200 OK\n201 Created\n400 Bad Request\n404 Not Found\n409 Conflict\n500 Internal Server Error",
      "tags": ["dwec", "eac3", "http", "codigos"]
    },
    {
      "id": "examen-dwec-eac3-12",
      "front": "¿Cómo se usa e.preventDefault() en un formulario?",
      "back": "form.addEventListener('submit', (e) => {\n  e.preventDefault(); // evita recarga de página\n  // validar y enviar...\n});",
      "tags": ["dwec", "eac3", "formularios"]
    },
    {
      "id": "examen-dwec-eac3-13",
      "front": "¿Qué diálogos del navegador existen y qué devuelven?",
      "back": "prompt('Mensaje'): devuelve string o null\nalert('Mensaje'): muestra mensaje\nconfirm('¿Seguro?'): devuelve true o false",
      "tags": ["dwec", "eac3", "dialogos"]
    }
  ]
};

// ========== ED EAC2 (UML) ==========
const edEac2 = {
  "id": "examen-ed-eac2",
  "name": "ED - EAC2 (Entornos de Desarrollo)",
  "description": "Preguntas de la EAC2 de ED - Diagramas UML y Modelado Orientado a Objetos",
  "subject": "Entornos de Desarrollo",
  "cards": [
    {
      "id": "examen-ed-eac2-1",
      "front": "¿Qué elementos componen un diagrama de clases UML?",
      "back": "Una clase se representa como un rectángulo dividido en 3 secciones:\n1. Nombre de la clase\n2. Atributos (visibilidad nombre: tipo)\n3. Métodos/Operaciones (visibilidad nombre(param: tipo): retorno)",
      "tags": ["ed", "eac2", "uml", "diagrama-clases"]
    },
    {
      "id": "examen-ed-eac2-2",
      "front": "¿Qué símbolos de visibilidad se usan en UML y qué significan?",
      "back": "+ público (public)\n- privado (private)\n# protegido (protected)\n~ paquete/package",
      "tags": ["ed", "eac2", "uml", "visibilidad"]
    },
    {
      "id": "examen-ed-eac2-3",
      "front": "¿Qué tipos de relaciones entre clases existen en UML y cómo se representan?",
      "back": "Asociación: línea sólida entre clases\nHerencia: flecha triangular vacía apuntando a la superclase\nComposición: rombo relleno (pertenencia fuerte)\nAgregación: rombo vacío (pertenencia débil)\nDependencia: flecha punteada (uso temporal)",
      "tags": ["ed", "eac2", "uml", "relaciones"]
    },
    {
      "id": "examen-ed-eac2-4",
      "front": "¿Qué diferencia hay entre composición y agregación en UML?",
      "back": "Composición (rombo relleno): relación fuerte, las partes NO pueden existir sin el todo. Ej: Mano ◆--- Dedo\nAgregación (rombo vacío): relación débil, las partes pueden existir sin el todo. Ej: Frutería ◇--- Fruta\n\nSi desaparece el todo: en composición desaparecen las partes; en agregación no.",
      "tags": ["ed", "eac2", "uml", "composicion", "agregacion"]
    },
    {
      "id": "examen-ed-eac2-5",
      "front": "¿Qué significa la multiplicidad en UML y qué valores se usan?",
      "back": "1 → exactamente uno\n0..1 → cero o uno\n* → cero o más\n1..* → uno o más",
      "tags": ["ed", "eac2", "uml", "multiplicidad"]
    },
    {
      "id": "examen-ed-eac2-6",
      "front": "¿Cómo se declara una enumeración en Java?",
      "back": "public enum Especialidad {\n  BIOLOGIA, GEOLOGIA, OCEANOGRAFIA;\n}",
      "tags": ["ed", "eac2", "java", "enum"]
    },
    {
      "id": "examen-ed-eac2-7",
      "front": "¿Cómo se implementa la herencia en Java?",
      "back": "public class DirectorEstacion extends Cientifico {\n  private double presupuestoAsignado;\n  public DirectorEstacion(...) {\n    super(dni, nombre, especialidad, aniosExperiencia);\n    this.presupuestoAsignado = presupuestoAsignado;\n  }\n}\n\nextends para heredar, super() como primera línea del constructor.",
      "tags": ["ed", "eac2", "java", "herencia"]
    },
    {
      "id": "examen-ed-eac2-8",
      "front": "¿Qué es y cómo se representa un diagrama de casos de uso?",
      "back": "Actor: rol externo (figura humana)\nCaso de uso: óvalo con acción\n<<include>>: obligatorio (un caso SIEMPRE incluye otro)\n<<extend>>: opcional (extensión bajo condición)",
      "tags": ["ed", "eac2", "uml", "casos-de-uso"]
    },
    {
      "id": "examen-ed-eac2-9",
      "front": "¿Qué elementos tiene un diagrama de secuencia?",
      "back": "Líneas de vida verticales (objetos)\nMensajes horizontales numerados\nActivaciones (rectángulos sobre línea de vida)\nRetornos punteados",
      "tags": ["ed", "eac2", "uml", "secuencia"]
    },
    {
      "id": "examen-ed-eac2-10",
      "front": "¿Qué diferencia hay entre diagrama de secuencia y diagrama de comunicación?",
      "back": "Secuencia: énfasis en el orden temporal de los mensajes (líneas de vida verticales).\nComunicación: énfasis en las relaciones estructurales entre objetos (rectángulos conectados con mensajes numerados).",
      "tags": ["ed", "eac2", "uml", "secuencia", "comunicacion"]
    },
    {
      "id": "examen-ed-eac2-11",
      "front": "¿Qué elementos componen un diagrama de actividades?",
      "back": "Nodo inicial (círculo negro)\nNodo final (círculo doble)\nActividades (rectángulos redondeados)\nBifurcaciones paralelas (barras negras: fork/join)\nDecisiones (rombos con guardas [condición])",
      "tags": ["ed", "eac2", "uml", "actividades"]
    }
  ]
};

const edEac3 = {
  "id": "examen-ed-eac3",
  "name": "ED - EAC3 (Entornos de Desarrollo)",
  "description": "Preguntas de la EAC3 de ED - Pruebas de Software, Git, Refactorización, Spring Boot y Swing",
  "subject": "Entornos de Desarrollo",
  "cards": [
    {
      "id": "examen-ed-eac3-1",
      "front": "¿Qué tipos de pruebas de software existen?",
      "back": "Caja blanca: analiza estructura interna del código, caminos de ejecución.\nCaja negra: entradas/salidas sin conocer implementación.\nRegresión: detectar errores tras cambios.\nAceptación (Beta): validación con el cliente en entorno real.",
      "tags": ["ed", "eac3", "pruebas", "testing"]
    },
    {
      "id": "examen-ed-eac3-2",
      "front": "¿Cómo se calcula la complejidad ciclomática de McCabe?",
      "back": "CC = número de condiciones + 1\nCC = número de aristas - número de nodos + 2\n\nValores:\n1-10: simple\n11-20: moderado\n21-50: complejo\n>50: muy complejo",
      "tags": ["ed", "eac3", "mccabe", "complejidad"]
    },
    {
      "id": "examen-ed-eac3-3",
      "front": "¿Cómo se aplican las clases de equivalencia y valores límite en pruebas?",
      "back": "1. Identificar rangos y restricciones de entrada\n2. Definir clases válidas e inválidas\n3. Seleccionar representantes de cada clase\n4. Incluir valores límite (mínimo, máximo, justo fuera)",
      "tags": ["ed", "eac3", "pruebas", "equivalencia"]
    },
    {
      "id": "examen-ed-eac3-4",
      "front": "¿Cuáles son los comandos esenciales de Git y su orden?",
      "back": "git init → inicializar repositorio\ngit add archivo.java → añadir al staging\ngit status → ver estado\ngit commit -m \"mensaje\" → confirmar cambios\ngit log → ver historial\ngit branch nombre → crear rama\ngit checkout nombre → cambiar de rama\ngit merge nombre → fusionar rama",
      "tags": ["ed", "eac3", "git"]
    },
    {
      "id": "examen-ed-eac3-5",
      "front": "¿Qué es HEAD en Git? ¿Qué es un conflicto?",
      "back": "HEAD: commit más reciente de la rama actual.\nConflicto: ocurre al fusionar cambios que modifican las mismas líneas en ambos archivos. Git no puede resolverlo automáticamente.",
      "tags": ["ed", "eac3", "git"]
    },
    {
      "id": "examen-ed-eac3-6",
      "front": "¿Qué es refactorización y qué técnicas se aplican?",
      "back": "Refactorización: mejorar el código sin alterar su comportamiento externo.\nTécnicas:\n- Extraer método: convertir bloque en método independiente\n- Extraer constantes: eliminar números mágicos\n- Renombrar: mejorar legibilidad de nombres",
      "tags": ["ed", "eac3", "refactorizacion"]
    },
    {
      "id": "examen-ed-eac3-7",
      "front": "¿Cómo se generan y qué etiquetas tiene un Javadoc?",
      "back": "/**\n * Descripción.\n * @param param Descripción\n * @return Descripción\n * @author Nombre\n * @version 1.0\n */\n\nGenerar: javadoc -d docs Clase.java",
      "tags": ["ed", "eac3", "javadoc"]
    },
    {
      "id": "examen-ed-eac3-8",
      "front": "¿Qué anotaciones y aserciones de JUnit 5 son las más importantes?",
      "back": "Anotaciones:\n@Test: marca método de prueba\n@BeforeEach / @AfterEach: antes/después de cada test\n@BeforeAll / @AfterAll: antes/después de todos (método estático)\n\nAserciones:\nassertEquals(esperado, actual)\nassertTrue(condicion)\nassertThrows(Tipo.class, () -> código)",
      "tags": ["ed", "eac3", "junit", "testing"]
    },
    {
      "id": "examen-ed-eac3-9",
      "front": "¿Qué diferencia hay entre @Controller y @RestController en Spring Boot?",
      "back": "@Controller: devuelve vistas (templates Thymeleaf).\n@RestController: devuelve datos directamente (JSON).\n\nAmbas se usan con @GetMapping, @PostMapping, etc.",
      "tags": ["ed", "eac3", "spring", "controller"]
    },
    {
      "id": "examen-ed-eac3-10",
      "front": "¿Cómo funciona Thymeleaf con Spring Boot?",
      "back": "Motor de plantillas por defecto en Spring Boot.\nEn el Controller: model.addAttribute(\"clave\", valor);\nEn el template HTML: th:text=\"${clave}\"\nPlantillas en src/main/resources/templates/",
      "tags": ["ed", "eac3", "thymeleaf", "spring"]
    },
    {
      "id": "examen-ed-eac3-11",
      "front": "¿Qué componentes de Swing se usan para crear una interfaz gráfica?",
      "back": "JFrame: ventana principal\nJPanel: contenedor\nJLabel: etiqueta de texto\nJTextField: campo de texto una línea\nJTextArea: campo multilínea\nJComboBox: lista desplegable\nJButton: botón",
      "tags": ["ed", "eac3", "swing"]
    },
    {
      "id": "examen-ed-eac3-12",
      "front": "¿Cómo se manejan eventos en Swing?",
      "back": "btn.addActionListener(new ActionListener() {\n  public void actionPerformed(ActionEvent e) {\n    // código al pulsar\n  }\n});\n\nO con lambda (Java 8+):\nbtn.addActionListener(e -> metodo());\nsetLayout(null) + setBounds(x, y, ancho, alto) para posicionamiento absoluto.",
      "tags": ["ed", "eac3", "swing", "eventos"]
    }
  ]
};

// Escribir archivos
fs.writeFileSync(`${dir}/dwec-eac1.json`, JSON.stringify(dwecEac1, null, 2));
fs.writeFileSync(`${dir}/dwec-eac3.json`, JSON.stringify(dwecEac3, null, 2));
fs.writeFileSync(`${dir}/ed-eac2.json`, JSON.stringify(edEac2, null, 2));
fs.writeFileSync(`${dir}/ed-eac3.json`, JSON.stringify(edEac3, null, 2));

console.log('=== FICHEROS CREADOS ===');
console.log(`${dir}/dwec-eac1.json - ${dwecEac1.cards.length} cartas`);
console.log(`${dir}/dwec-eac3.json - ${dwecEac3.cards.length} cartas`);
console.log(`${dir}/ed-eac2.json - ${edEac2.cards.length} cartas`);
console.log(`${dir}/ed-eac3.json - ${edEac3.cards.length} cartas`);
console.log(`Total: ${dwecEac1.cards.length + dwecEac3.cards.length + edEac2.cards.length + edEac3.cards.length} cartas`);
