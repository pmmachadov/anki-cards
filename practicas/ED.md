# ED — Entornos de Desarrollo (Mòdul 0487)

> 24 ejercicios prácticos extraídos de EAC2, EAC3 y proyectos.

---

## Unidad 1: Diagramas UML y Modelado Orientado a Objetos (EAC2)

| # | Ejercicio práctico | Conceptos clave |
|---|--------------------|-----------------|
| 1.1 | **Diagrama de clases**: Dado un enunciado (ej. sistema de biblioteca, estación científica), identificar clases, atributos, métodos y visibilidad (`+`, `-`, `#`). | Clases, atributos, métodos, visibilidad |
| 1.2 | **Relaciones entre clases**: Establecer relaciones de asociación, herencia, composición, agregación y dependencia entre las clases del sistema. | Símbolos UML, multiplicidad (`1`, `0..1`, `*`, `1..*`) |
| 1.3 | **Herencia en Java**: Crear clase base y clase hija con `extends`, usar `super()` en el constructor, añadir atributos específicos en la hija. | Herencia, `super()`, `extends` |
| 1.4 | **Enumeraciones (enum)**: Definir un `enum` para especialidades, estados o roles. Usarlo como tipo de atributo en una clase. | `enum` en Java |
| 1.5 | **Encapsulamiento**: Crear clase con atributos `private`, getters/setters `public`, constructor parametrizado. | POO básica en Java |
| 1.6 | **Diagrama de casos de uso**: Identificar actores y casos de uso. Indicar relaciones `<<include>>` y `<<extend>>`. | Actores, óvalos, relaciones |
| 1.7 | **Diagrama de secuencia**: Representar la interacción entre objetos con líneas de vida, mensajes numerados, activaciones y retornos. | Secuencia temporal |
| 1.8 | **Diagrama de comunicación**: Versión alternativa del de secuencia enfocada en relaciones estructurales entre objetos. | Enfasis en enlaces |
| 1.9 | **Diagrama de actividades**: Flujo de un proceso con nodos inicial/final, actividades, decisiones (rombos) y bifurcaciones paralelas (fork/join). | Actividades, guardas `[condición]` |
| 1.10 | **Diagrama de estados**: Modelar los estados de un objeto (ej. pedido: pendiente → enviado → entregado) con transiciones etiquetadas. | Estados, transiciones, eventos |

---

## Unidad 2: Pruebas de Software, Git y Refactorización (EAC3)

| # | Ejercicio práctico | Conceptos clave |
|---|--------------------|-----------------|
| 2.1 | **Cálculo de complejidad ciclomática**: Dado un código con condiciones, calcular CC usando `CC = condiciones + 1` o `CC = aristas - nodos + 2`. | McCabe, caminos de ejecución |
| 2.2 | **Clases de equivalencia y valores límite**: Definir clases válidas/inválidas para un campo de entrada y seleccionar representantes (mínimo, máximo, justo fuera). | Testing de caja negra |
| 2.3 | **Secuencia de comandos Git**: Simular el flujo completo: `init → add → commit → branch → checkout → merge`. Resolver un conflicto de merge. | Git básico e intermedio |
| 2.4 | **Refactorización de código**: Dado un código con "números mágicos" y métodos largos, extraer constantes y métodos sin cambiar el comportamiento externo. | Extraer método/constante, renombrar |
| 2.5 | **Documentación Javadoc**: Escribir comentarios Javadoc para una clase y sus métodos (`@param`, `@return`, `@author`, `@version`). Generar documentación con `javadoc`. | Documentación técnica |
| 2.6 | **Tests unitarios con JUnit 5**: Escribir pruebas para una clase Java usando `@Test`, `@BeforeEach`, `assertEquals`, `assertTrue`, `assertThrows`. | Testing de caja blanca |
| 2.7 | **Análisis de tipos de pruebas**: Diferenciar entre pruebas de caja blanca, caja negra, regresión y aceptación (beta). Justificar cuándo usar cada una. | Tipología de pruebas |

---

## Unidad 3: Spring Boot y Swing (Proyecto)

| # | Ejercicio práctico | Conceptos clave |
|---|--------------------|-----------------|
| 3.1 | **Spring Boot — Controlador MVC**: Crear `@Controller` que reciba una petición GET, añada atributos al `Model` y devuelva una vista Thymeleaf. | `@Controller`, `@GetMapping`, Thymeleaf |
| 3.2 | **Spring Boot — Controlador REST**: Crear `@RestController` con endpoints GET/POST/PUT/DELETE que devuelvan JSON. | `@RestController`, `@RequestParam` |
| 3.3 | **Thymeleaf básico**: Plantilla HTML con `th:text="${atributo}"` para mostrar datos pasados desde el controlador. | Motor de plantillas |
| 3.4 | **Maven y pom.xml**: Configurar `groupId`, `artifactId`, `version` y dependencias en el `pom.xml`. Compilar y empaquetar. | Gestión de dependencias |
| 3.5 | **Interfaz gráfica con Swing**: Crear ventana `JFrame` con `JPanel`, `JLabel`, `JTextField`, `JComboBox` y `JButton`. Usar `setLayout(null)` y `setBounds()`. | Componentes Swing |
| 3.6 | **Eventos en Swing**: Añadir `ActionListener` a un botón usando clase anónima o lambda (`e -> metodo()`). | Gestión de eventos en Java |
| 3.7 | **Conversión de tipos en Java**: Leer un valor de un `JTextField`, convertirlo a `int` o `double` con `Integer.parseInt` / `Double.parseDouble`, manejar excepciones. | Parsing y validación |
