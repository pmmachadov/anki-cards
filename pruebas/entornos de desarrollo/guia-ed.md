# Guía de Entornos de Desarrollo (ED)

> Resumen de temas extraídos de las pruebas EAC2, EAC3 y proyectos prácticos.

---

## 📐 Unidad 1: Diagramas UML y Modelado Orientado a Objetos (EAC2)

### 1.1 Diagrama de Clases
- **Clase**: rectángulo dividido en nombre, atributos y métodos
- **Visibilidad**: `-` privado, `+` público, `#` protegido
- **Atributo**: `visibilidad nombre: tipo [multiplicidad]`
- **Método**: `visibilidad nombre(param: tipo): retorno`

### 1.2 Relaciones entre Clases
| Relación | Símbolo | Descripción |
|----------|---------|-------------|
| Asociación | Línea sólida | Ambas clases se conocen |
| Herencia | Flecha triangular vacía | Generalización/especialización |
| Composición | Rombo rellido | Fuerte pertenencia (parte no existe sin todo) |
| Agregación | Rombo vacío | Débil pertenencia (parte puede existir sola) |
| Dependencia | Flecha punteada | Una clase usa otra temporalmente |

### 1.3 Multiplicidad
- `1` → exactamente uno
- `0..1` → cero o uno
- `*` → cero o más
- `1..*` → uno o más

### 1.4 Enumeraciones (enum)
```java
public enum Especialidad {
    BIOLOGIA, GEOLOGIA, OCEANOGRAFIA;
}
```

### 1.5 Herencia en Java
```java
public class DirectorEstacion extends Cientifico {
    private double presupuestoAsignado;
    
    public DirectorEstacion(...) {
        super(dni, nombre, especialidad, aniosExperiencia);
        this.presupuestoAsignado = presupuestoAsignado;
    }
}
```

### 1.6 Encapsulamiento
- Atributos `private`
- Getters y setters `public`
- Constructor para inicializar objetos

### 1.7 Diagrama de Casos de Uso
- **Actor**: rol externo (figura humana)
- **Caso de uso**: óvalo con acción
- **`<<include>>`**: obligatorio (un caso SIEMPRE incluye otro)
- **`<<extend>>`**: opcional (extensión bajo condición)

### 1.8 Diagrama de Secuencia
- Líneas de vida verticales (objetos)
- Mensajes horizontales numerados
- Activaciones (rectángulos sobre línea de vida)
- Retornos punteados

### 1.9 Diagrama de Comunicación
- Objetos como rectángulos conectados
- Mensajes numerados indicando orden
- Enfasis en relaciones estructurales

### 1.10 Diagrama de Actividades
- Nodo inicial (círculo negro) / final (círculo doble)
- Actividades (rectángulos redondeados)
- Bifurcaciones paralelas (barras negras = fork/join)
- Decisiones (rombos con guardas `[condición]`)

### 1.11 Diagrama de Estados
- Estados (rectángulos redondeados)
- Transiciones etiquetadas con eventos
- Estados compuestos y submáquinas

---

## 🧪 Unidad 2: Pruebas de Software, Git y Refactorización (EAC3)

### 2.1 Tipos de Pruebas
| Tipo | Descripción |
|------|-------------|
| Caja blanca | Estructura interna del código, caminos de ejecución |
| Caja negra | Entradas/salidas sin conocer implementación |
| Regresión | Detectar errores tras cambios |
| Aceptación (Beta) | Validación con el cliente en entorno real |

### 2.2 Complejidad Ciclomática de McCabe
```
CC = número de ramas - número de nodos + 2
CC = número de condiciones + 1
```
- 1-10: simple
- 11-20: moderado
- 21-50: complejo
- >50: muy complejo

### 2.3 Clases de Equivalencia y Valores Límite
1. Identificar rangos y restricciones de entrada
2. Definir clases válidas e inválidas
3. Seleccionar representantes de cada clase
4. Incluir valores límite (mínimo, máximo, justo fuera)

### 2.4 Git - Comandos Esenciales
```bash
git init                          # Inicializar repositorio
git add archivo.java              # Añadir al staging
git status                        # Ver estado
git commit -m "mensaje"           # Confirmar cambios
git log                           # Ver historial
git branch nombre                 # Crear rama
git checkout nombre               # Cambiar de rama
git merge nombre                  # Fusionar rama
git branch                        # Listar ramas
```

### 2.5 Git - Conceptos Clave
- **HEAD**: commit más reciente de la rama actual
- **Conflicto**: al fusionar cambios en las mismas líneas
- **.gitignore**: archivos que Git debe ignorar

### 2.6 Refactorización
- **Extraer método**: convertir bloque de código en método independiente
- **Extraer constantes**: eliminar números mágicos
- **Renombrar**: mejorar legibilidad de nombres
- No altera el comportamiento externo

### 2.7 Javadoc
```java
/**
 * Descripción.
 * @param param Descripción
 * @return Descripción
 * @author Nombre
 * @version 1.0
 */
```
Generar: `javadoc -d docs Clase.java`

### 2.8 JUnit 5
Anotaciones:
- `@Test`: marca método de prueba
- `@BeforeEach` / `@AfterEach`: antes/después de cada test
- `@BeforeAll` / `@AfterAll`: antes/después de todos (estático)

Aserciones:
- `assertEquals(esperado, actual)`
- `assertTrue(condicion)`
- `assertThrows(Tipo.class, () -> código)`

---

## 🖥️ Unidad 3: Spring Boot y Swing (Proyecto)

### 3.1 Spring Boot - Anotaciones
| Anotación | Función |
|-----------|---------|
| `@SpringBootApplication` | Combina @Configuration, @EnableAutoConfiguration, @ComponentScan |
| `@Controller` | Controlador MVC (devuelve vistas) |
| `@RestController` | Controlador REST (devuelve datos) |
| `@GetMapping("/ruta")` | Mapea peticiones GET |
| `@PostMapping("/ruta")` | Mapea peticiones POST |
| `@RequestParam` | Extrae parámetros de la petición |

### 3.2 Spring Boot - Modelo-Vista-Controlador
```java
@Controller
public class MiController {
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("clave", valor);
        return "nombreTemplate"; // src/main/resources/templates/nombreTemplate.html
    }
}
```

### 3.3 Thymeleaf
- Motor de plantillas por defecto en Spring Boot
- Sintaxis: `th:text="${atributo}"`
- Plantillas en `src/main/resources/templates/`

### 3.4 Maven y pom.xml
- Gestión de dependencias y construcción
- `groupId`, `artifactId`, `version`
- Plugins para compilar, empaquetar, testear

### 3.5 Swing - Componentes Básicos
| Componente | Descripción |
|------------|-------------|
| `JFrame` | Ventana principal |
| `JPanel` | Contenedor |
| `JLabel` | Etiqueta de texto |
| `JTextField` | Campo de texto una línea |
| `JTextArea` | Campo de texto multilínea |
| `JComboBox` | Lista desplegable |
| `JButton` | Botón |

### 3.6 Swing - Eventos
```java
btn.addActionListener(new ActionListener() {
    public void actionPerformed(ActionEvent e) {
        // código al pulsar
    }
});

// Lambda (Java 8+)
btn.addActionListener(e -> metodo());
```

### 3.7 Swing - Layout null
```java
panel.setLayout(null);
componente.setBounds(x, y, ancho, alto);
```

### 3.8 Conversión de Tipos en Java
```java
int entero = Integer.parseInt("25");
double decimal = Double.parseDouble("12.5");
```

---

## 🎯 Consejos para el Examen

1. **UML**: Saber diferenciar composición (rombo relleno) de agregación (rombo vacío)
2. **Herencia**: `extends` + `super()` como primera línea del constructor
3. **Pruebas**: Caja blanca = estructura interna; Caja negra = entradas/salidas
4. **Complejidad ciclomática**: `CC = condiciones + 1` o `CC = aristas - nodos + 2`
5. **Git**: `init → add → commit → branch → checkout → merge`
6. **Refactorización**: Extraer métodos y constantes, sin cambiar comportamiento
7. **JUnit**: `@Test` + `assertEquals` / `assertThrows`
8. **Spring**: `@Controller` devuelve templates; `@RestController` devuelve JSON
9. **Thymeleaf**: `model.addAttribute()` en Controller → `th:text="${var}"` en template
10. **Swing**: `ActionListener` para eventos, `setEnabled()` para habilitar/deshabilitar

---

*Generado para estudios de DAW/DAM - Entornos de Desarrollo*
