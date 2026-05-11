# Lista de Ejercicios Prácticos por Materia

> Extraídos de los enunciados EAC1, EAC2, EAC3 y proyectos de las asignaturas del CFGS DAW/DAM.

---

## 📋 Resumen de Ejercicios Prácticos

Este documento recoge **91 ejercicios prácticos clasificados** por materia y unidad didáctica, extraídos directamente de los enunciados oficiales de las EACs del curso 2025–26.

| Materia | Módulo | Ejercicios | Unidades |
|---------|--------|-----------|----------|
| **DWEC** | 0612 — Desarrollo Web en Entorno Cliente | 25 | 3 (JS, DOM, Fetch/Express) |
| **ED** | 0487 — Entornos de Desarrollo | 24 | 3 (UML, Git/JUnit, Spring/Swing) |
| **SI** | 0483 — Sistemas Informáticos | 42 | 3 (Hardware/VMs, Particiones, Red/Servidores) |
| **TOTAL** | — | **91** | 9 |

### Índice rápido

- [DWEC — Unidad 1: JavaScript (10)](#1-desarrollo-web-en-entorno-cliente-dwec--mòdul-0612)
- [DWEC — Unidad 2: DOM y Eventos (8)](#unidad-2-dom-y-eventos-eac3)
- [DWEC — Unidad 3: Fetch API y Express (7)](#unidad-3-fetch-api-express-y-proyecto-completo)
- [ED — Unidad 1: UML y POO (10)](#2-entorns-de-desenvolupament-ed--mòdul-0487)
- [ED — Unidad 2: Pruebas, Git y Refactorización (7)](#unidad-2-pruebas-de-software-git-y-refactorización-eac3)
- [ED — Unidad 3: Spring Boot y Swing (7)](#unidad-3-spring-boot-y-swing-proyecto)
- [SI — Unidad 1: Hardware y Virtualización (12)](#3-sistemas-informáticos-si--mòdul-0483)
- [SI — Unidad 2: Particiones y Sistema Operativo (15)](#unidad-2-gestió-de-la-informació-i-del-sistema-operatiu-eac2)
- [SI — Unidad 3: Redes y Servidores (15)](#unidad-3-interconnexió-i-gestió-de-sistemes-en-xarxa-eac3)

---

## 1. Desarrollo Web en Entorno Cliente (DWEC) — Mòdul 0612

### Unidad 1: JavaScript — Sintaxis, Funciones, Arrays y Objetos (EAC1)

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

### Unidad 2: DOM y Eventos (EAC3)

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

### Unidad 3: Fetch API, Express y Proyecto Completo

| # | Ejercicio práctico | Conceptos clave |
|---|--------------------|-----------------|
| 3.1 | **Consumo de API pública**: Usar `fetch` para obtener datos de una API (ej. JSONPlaceholder), mostrar lista y manejar estados de carga/error. | `fetch`, `async/await`, `try-catch`, JSON |
| 3.2 | **CRUD con Fetch**: Frontend que haga GET, POST, PUT, DELETE a un backend Express, mostrando resultados en una tabla. | Métodos HTTP, headers, `JSON.stringify` |
| 3.3 | **Servidor Express básico**: Crear servidor con rutas GET/POST/PUT/DELETE, usar `express.json()`, `cors()`, devolver datos estáticos. | Express, routing, middleware |
| 3.4 | **Persistencia con JSON en Node.js**: Leer y escribir datos en un archivo `db.json` usando `fs`, implementar un CRUD completo. | `fs.readFileSync`, `fs.writeFileSync`, `JSON.parse/stringify` |
| 3.5 | **Formulario de contacto con backend**: Formulario HTML que envíe datos vía `fetch` POST a servidor Express, valide campos vacíos y muestre respuesta. | `preventDefault`, validación, POST con body |
| 3.6 | **Detección de estado de red**: Mostrar indicador visual si el usuario está online/offline usando `navigator.onLine` y eventos `online`/`offline`. | API de red del navegador |
| 3.7 | **Proyecto Taller / Garage**: Aplicación completa con Express + frontend para gestionar vehículos (matrícula, km). Validar duplicados, manejar errores 400/409/404. | CRUD completo, validaciones, códigos HTTP |

---

## 2. Entorns de Desenvolupament (ED) — Mòdul 0487

### Unidad 1: Diagramas UML y Modelado Orientado a Objetos (EAC2)

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

### Unidad 2: Pruebas de Software, Git y Refactorización (EAC3)

| # | Ejercicio práctico | Conceptos clave |
|---|--------------------|-----------------|
| 2.1 | **Cálculo de complejidad ciclomática**: Dado un código con condiciones, calcular CC usando `CC = condiciones + 1` o `CC = aristas - nodos + 2`. | McCabe, caminos de ejecución |
| 2.2 | **Clases de equivalencia y valores límite**: Definir clases válidas/inválidas para un campo de entrada y seleccionar representantes (mínimo, máximo, justo fuera). | Testing de caja negra |
| 2.3 | **Secuencia de comandos Git**: Simular el flujo completo: `init → add → commit → branch → checkout → merge`. Resolver un conflicto de merge. | Git básico e intermedio |
| 2.4 | **Refactorización de código**: Dado un código con "números mágicos" y métodos largos, extraer constantes y métodos sin cambiar el comportamiento externo. | Extraer método/constante, renombrar |
| 2.5 | **Documentación Javadoc**: Escribir comentarios Javadoc para una clase y sus métodos (`@param`, `@return`, `@author`, `@version`). Generar documentación con `javadoc`. | Documentación técnica |
| 2.6 | **Tests unitarios con JUnit 5**: Escribir pruebas para una clase Java usando `@Test`, `@BeforeEach`, `assertEquals`, `assertTrue`, `assertThrows`. | Testing de caja blanca |
| 2.7 | **Análisis de tipos de pruebas**: Diferenciar entre pruebas de caja blanca, caja negra, regresión y aceptación (beta). Justificar cuándo usar cada una. | Tipología de pruebas |

### Unidad 3: Spring Boot y Swing (Proyecto)

| # | Ejercicio práctico | Conceptos clave |
|---|--------------------|-----------------|
| 3.1 | **Spring Boot — Controlador MVC**: Crear `@Controller` que reciba una petición GET, añada atributos al `Model` y devuelva una vista Thymeleaf. | `@Controller`, `@GetMapping`, Thymeleaf |
| 3.2 | **Spring Boot — Controlador REST**: Crear `@RestController` con endpoints GET/POST/PUT/DELETE que devuelvan JSON. | `@RestController`, `@RequestParam` |
| 3.3 | **Thymeleaf básico**: Plantilla HTML con `th:text="${atributo}"` para mostrar datos pasados desde el controlador. | Motor de plantillas |
| 3.4 | **Maven y pom.xml**: Configurar `groupId`, `artifactId`, `version` y dependencias en el `pom.xml`. Compilar y empaquetar. | Gestión de dependencias |
| 3.5 | **Interfaz gráfica con Swing**: Crear ventana `JFrame` con `JPanel`, `JLabel`, `JTextField`, `JComboBox` y `JButton`. Usar `setLayout(null)` y `setBounds()`. | Componentes Swing |
| 3.6 | **Eventos en Swing**: Añadir `ActionListener` a un botón usando clase anónima o lambda (`e -> metodo()`). | Gestión de eventos en Java |
| 3.7 | **Conversión de tipos en Java**: Leer un valor de un `JTextField`, convertirlo a `int` o `double` con `Integer.parseInt` / `Double.parseDouble`, manejar excepciones. | Parsing y validación |

---

## 3. Sistemas Informáticos (SI) — Mòdul 0483

### Unidad 1: Avaluació, instal·lació i planificació del sistema informàtic (EAC1)

| # | Ejercicio práctico | Conceptos clave |
|---|--------------------|-----------------|
| 1.1 | **Identificación de componentes de placa base**: Dada una imagen de conectores externos, identificar: PS/2, USB, RJ-45, eSATA, FireWire, S/PDIF, audio analógico. | Hardware básico |
| 1.2 | **Análisis de rendimiento**: Un PC va lento tras instalar software nuevo. Protocolo de análisis paso a paso: administrador de tareas, programas de inicio, espacio en disco, modo seguro. | Diagnóstico de rendimiento |
| 1.3 | **Comparativa SSD vs HDD**: Explicar funcionamiento interno de ambos, latencia, acceso aleatorio. Caso real: arranque del SO o carga de máquinas virtuales. | Almacenamiento |
| 1.4 | **Configuración dual-boot moderno**: Problema: Windows y Linux en modo Legacy/BIOS con MBR. Solución: cambiar a UEFI/GPT, procedimiento recomendado paso a paso. | BIOS/UEFI, MBR/GPT, dual-boot |
| 1.5 | **Dimensionamiento de PSU y refrigeración**: CPU 125W + GPU 350W + PSU 550W + caja compacta. Calcular margen de seguridad del 20-30%, identificar thermal throttling. | PSU, refrigeración, wattage |
| 1.6 | **SRAM vs DRAM en servidores**: Ventajas e inconvenientes de cada tipo. Influencia del refresco en rendimiento. Componentes adicionales a evaluar (ECC, canales, controlador). | Tipos de memoria |
| 1.7 | **Cuello de botella PCIe/PCH**: GPU PCIe 5.0 x16 + SSD NVMe PCIe 5.0 + SSD PCIe 4.0 + 10 GbE + USB4. Explicar por qué comparten carriles y cómo optimizar. | Arquitectura CPU-chipset |
| 1.8 | **Topología de red**: Dado un diagrama, identificar router, switch, equipos finales. Determinar si es estrella, estrella extendida, jerárquica, etc. | Topologías de red |
| 1.9 | **Ergonomía laboral**: Analizar imagen de puesto de trabajo. Medidas correctas: pantalla a 50-70 cm, altura de ojos, ángulos de 90°, espacio libre bajo mesa. | Prevención de riesgos laborales |
| 1.10 | **Instalación de máquina virtual Ubuntu**: Crear VM en VirtualBox, asignar RAM recomendada, disco VDI dinámico, instalar desde ISO, crear usuario específico, instalar Guest Additions. | VirtualBox, VMs |
| 1.11 | **Instalación de máquina virtual Windows 11**: Crear VM con 4 GB RAM mínimo, disco 50 GB dinámico, configurar adaptador puente, desactivar aceleración 3D, instalar en modo UEFI. | VirtualBox, Windows 11 |
| 1.12 | **Actualización de sistemas**: En Ubuntu: `sudo apt update && sudo apt upgrade -y`. En Windows: Windows Update. Explicar diferencia entre actualizar repositorios e instalar paquetes. | Mantenimiento del SO |

### Unidad 2: Gestió de la informació i del sistema operatiu (EAC2)

| # | Ejercicio práctico | Conceptos clave |
|---|--------------------|-----------------|
| 2.1 | **Particionamiento MBR con fdisk**: Añadir disco de 10 GB. Crear 5 particiones de 2 GB usando primarias, extendida y lógicas. Explicar límite de 4 primarias en MBR. Verificar con `lsblk`. | `fdisk`, MBR, particiones |
| 2.2 | **Particionamiento GPT con gdisk**: Sobre segundo disco de 10 GB, crear 5 particiones de 2 GB con GPT. Verificar tamaño y estructura con `lsblk`. | `gdisk`, GPT |
| 2.3 | **Modificación de particiones con GParted**: Fusionar las dos últimas particiones GPT en una sola. Describir procedimiento y verificar resultado. | GParted, redimensionamiento |
| 2.4 | **Formato, montaje y fstab**: Formatear partición 1 en `ext4`, montar en `/mnt/ioc/ext4` con RW. Formatear partición 2 en `NTFS`, montar en RO. Configurar partición 3 como `swap` con prioridad. Añadir partición ext4 a `/etc/fstab` para montaje automático. | `mkfs.ext4`, `mkfs.ntfs`, `mount`, `fstab`, `swapon` |
| 2.5 | **Creación de volumen lógico con LVM**: Añadir dos discos de 2 GB. Crear volumen físico (`pvcreate`), grupo de volumen (`vgcreate`) y volumen lógico de 4 GB (`lvcreate`). Verificar con `pvdisplay`, `vgdisplay`, `lvdisplay`. | LVM, PV, VG, LV |
| 2.6 | **Instalación y localización de ejecutables**: Instalar `gedit` con apt. Localizar el ejecutable con `which` o `whereis`. Justificar ubicación según FHS. Crear archivo con nombre del DNI y localizarlo con `find`. | `apt install`, `which`, `find`, FHS |
| 2.7 | **Gestión de discos en Windows**: Añadir disco virtual de 2 GB, inicializar, crear partición con toda la capacidad, formatear NTFS y asignar letra de unidad. | Administración de discos de Windows |
| 2.8 | **Copia de seguridad programada**: Configurar `cron` o Tareas Programadas para ejecutar una copia automática de un directorio con `tar` o `robocopy`. Verificar funcionamiento. | `cron`, `tar`, `robocopy`, backups |
| 2.9 | **Gestión de usuarios y permisos en Linux**: Crear grupos `biblioteca` y `treballador`. Crear usuario con grupo principal y secundario. Configurar longitud mínima de contraseña. Crear archivo con fecha del sistema y asignar permisos `700`. | `groupadd`, `useradd`, `chage`, `chmod`, `chown` |
| 2.10 | **Configuración de red con Netplan**: Definir configuración estática o dinámica en `/etc/netplan/`. Aplicar con `netplan apply`. Verificar conectividad con `ping`. | Netplan, YAML, IP estática/dinámica |
| 2.11 | **Instalación y gestión de servidor FTP (vsftpd)**: Instalar `vsftpd`, iniciar servicio, conectar desde cliente. Identificar PID, archivo de configuración (`/etc/vsftpd.conf`), comando de reinicio. | `vsftpd`, `systemctl`, `ps`, FTP |
| 2.12 | **Análisis de tráfico con Wireshark**: Capturar tráfico de la interfaz de red durante una conexión FTP. Localizar credenciales (usuario/contraseña) en texto plano dentro de la captura. | Wireshark, análisis de paquetes, seguridad FTP |
| 2.13 | **Análisis de registros del sistema**: Consultar `/var/log/syslog`, localizar reinicios de `vsftpd`. Identificar componente `rsyslog`, mecanismo de rotación `logrotate`, periodicidad y configuración por servicio. | `syslog`, `rsyslog`, `logrotate` |
| 2.14 | **Políticas de seguridad locales en Windows**: Configurar complejidad de contraseñas, horario de inicio de sesión y bloqueo tras 3 intentos fallidos (`secpol.msc` / `gpedit.msc`). | Políticas locales, seguridad Windows |
| 2.15 | **Auditoría y Event Viewer**: Crear usuario, provocar intento fallido de login, localizar evento ID 4625 en Visor de Eventos de Windows. | `eventvwr`, auditoría de seguridad |

### Unidad 3: Interconnexió i gestió de sistemes en xarxa (EAC3)

| # | Ejercicio práctico | Conceptos clave |
|---|--------------------|-----------------|
| 3.1 | **Configuración de red en Ubuntu con `ip`**: Asignar IP estática, máscara, puerta de enlace y DNS con comandos `ip addr`, `ip route`, `resolvectl`. Verificar con `ping` a IP y nombre. | `iproute2`, networking CLI |
| 3.2 | **Configuración de red con `net-tools`**: Repetir ejercicio anterior usando `ifconfig`, `route` y `resolv.conf` (paquete `net-tools`). Diferencias entre herramientas legacy y modernas. | `ifconfig`, `route`, `net-tools` |
| 3.3 | **Configuración de red estática en Windows 11**: Asignar IP, máscara, puerta de enlace y DNS desde GUI. Verificar conectividad. Consultar configuración desde CMD con `ipconfig /all`. | Configuración TCP/IP Windows |
| 3.4 | **Escaneo de puertos con Nmap**: Instalar `nmap`. Escanear `localhost` e IP propia. Identificar puertos abiertos/cerrados/filtrados. Escanear rango 19-100. Comparar TCP SYN (`-sS`) vs TCP Connect (`-sT`). | `nmap`, seguridad de puertos |
| 3.5 | **Análisis de puertos con `netstat`**: Mostrar puertos TCP/UDP en escucha (`-tlnp`, `-ulnp`). Identificar procesos asociados. Instalar `vsftpd`, verificar puerto 21 en estado `LISTEN`. Conectar por FTP y ver estado `ESTABLISHED`. | `netstat`, `ss`, estados TCP |
| 3.6 | **Direcciones MAC y tabla ARP**: Obtener MAC de máquina física y virtual (`ip link`, `getmac`). Obtener MAC del router. Consultar tabla ARP (`ip neigh`, `arp -a`). Forzar comunicación y analizar cambio de estado (`STALE` → `REACHABLE`). Explicar ARP estático vs dinámico y riesgos de ARP spoofing. | ARP, MAC, capa 2 |
| 3.7 | **Instalación de Windows Server 2019 como controlador de dominio**: Crear VM, instalar Server 2019, configurar nombre e IP fija. Promocionar a DC creando nuevo bosque y árbol con dominio `eac3.usuario.home`. | Active Directory, DC, promoción |
| 3.8 | **Configuración del servicio DNS en Windows Server**: Verificar zona directa creada automáticamente. Crear zona inversa. Crear registro A mediante GUI y registro PTR mediante PowerShell. Crear registro CNAME `www`. | DNS, registos A/PTR/CNAME, PowerShell |
| 3.9 | **Administración básica de Active Directory**: Crear grupos de seguridad (`bibliotecari`, `usuari`) y usuarios (`Martí`, `Jana`). Asignar usuarios a grupos. Crear archivo, configurar permisos NTFS diferenciados (Control Total vs Solo Lectura). | AD, grupos, usuarios, ACLs NTFS |
| 3.10 | **Integración de Windows 11 al dominio**: Configurar IP compatible, cambiar nombre de máquina, apuntar DNS al servidor, unir al dominio. Verificar en AD que aparece el equipo. | Unión a dominio, DNS |
| 3.11 | **Compartición de recursos SMB**: En servidor, crear carpeta `documentacio`, compartir por SMB. Configurar permisos de compartición y NTFS para que `bibliotecari` tenga RW y `usuari` solo lectura. | SMB, permisos de compartición |
| 3.12 | **Configuración de DHCP**: Instalar rol DHCP en Windows Server. Crear ámbito con rango de IPs, máscara, puerta de enlace y DNS. Verificar que cliente Windows 11 obtiene IP por DHCP. | DHCP, ámbito, reservas |
| 3.13 | **Conexión remota y SSH**: Habilitar SSH en Ubuntu. Conectar desde Windows con `ssh` o PuTTY. Transferir archivos con `scp` o WinSCP. | OpenSSH, `ssh`, `scp` |
| 3.14 | **Scripts de automatización (PowerShell / Bash)**: Crear script que liste usuarios del dominio, o script bash que haga backup de logs y los comprima con fecha. | PowerShell, Bash, automatización |
| 3.15 | **Firewall básico**: Configurar reglas de entrada/salida en Windows Firewall o `ufw` en Ubuntu para permitir/denegar tráfico SSH, FTP o HTTP. | `ufw`, `iptables`, Windows Firewall |

---

## Consejos para practicar

1. **SI**: Practica en máquinas virtuales reales (VirtualBox). No solo leas los comandos; ejecútalos.
2. **DWEC**: Usa `console.log` abundantemente para depurar. Prueba cada función con datos de prueba.
3. **ED**: Dibuja los diagramas UML a mano o con herramientas como Draw.io antes de codificar.
4. **Exámenes**: Las PAF suelen ser en papel y sin consulta. Memoriza los comandos clave y la sintaxis.

---

*Generado automáticamente a partir de los enunciados EAC de los cursos 2025-26.*
