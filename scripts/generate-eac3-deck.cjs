const crypto = require('crypto');
const uuid = () => crypto.randomUUID();

const cards = [
  // ==================== A1 ====================
  {
    front: 'A1: ¿Por qué configurar la red con ip en vez de netplan?',
    back: 'iproute2 (comando ip) configura la red de forma TEMPORAL. Al reiniciar se pierde.\n\n¿Por qué usarlo?\n- Para pruebas rápidas sin tocar archivos del sistema\n- Para diagnóstico de conectividad inmediato\n- netplan (EAC2) es permanente porque escribe en /etc/netplan/',
    tags: ['a1','ubuntu','red'], difficulty: 'easy'
  },
  {
    front: 'A1: Pasos para IP estática con ip y por qué cada uno',
    back: '1. sudo ip addr add IP/máscara dev interfaz\n   → Le dice al kernel qué IP usar en esa tarjeta de red\n\n2. sudo ip route add default via gateway\n   → Indica dónde enviar los paquetes que NO son de la red local\n\n3. Editar /etc/resolv.conf (nameserver)\n   → Sin DNS no puedes resolver nombres (google.com), solo IPs\n\n4. ping a IP y a nombre\n   → Verifica que todo funciona: red local (IP) + DNS (nombre)',
    tags: ['a1','ubuntu','red'], difficulty: 'medium'
  },
  {
    front: 'A1: ¿Por qué instalar net-tools si ya existe ip?',
    back: 'net-tools (ifconfig, route, netstat) es LEGACY.\n\n¿Por qué conocerlo?\n- Muchos servidores antiguos aún lo usan\n- Documentación antigua y tutoriales lo emplean\n- Es útil saber ambos para trabajar en cualquier entorno\n\nDiferencia clave: ip es más potente y moderno; ifconfig es más simple pero limitado.',
    tags: ['a1','ubuntu','red'], difficulty: 'easy'
  },

  // ==================== A2 ====================
  {
    front: 'A2: ¿Por qué configurar IP estática en Windows?',
    back: 'Una IP dinámica (DHCP) puede cambiar al reiniciar.\n\n¿Por qué estática?\n- Servidores y VMs necesitan una dirección fija para ser localizables\n- Si la IP cambia, los clientes no encuentran el servidor\n- Es imprescindible antes de promocionar a DC o compartir recursos',
    tags: ['a2','windows','red'], difficulty: 'easy'
  },
  {
    front: 'A2: Pasos red estática en Windows y su lógica',
    back: '1. Panel de control > Adaptador > IPv4 > IP fija\n   → Asignas tu dirección para que no cambie\n\n2. Máscara de subred\n   → Define qué parte de la IP es red y qué parte es host (tamaño de la red)\n\n3. Puerta de enlace (gateway)\n   → Router que conecta tu red local con el exterior (Internet)\n\n4. DNS\n   → Servidor que traduce nombres a IPs; en dominio debe apuntar al DC\n\n5. ipconfig /all\n   → Verificación desde consola; útil para scripts y documentación',
    tags: ['a2','windows','red'], difficulty: 'medium'
  },

  // ==================== A3 ====================
  {
    front: 'A3: ¿Por qué escanear puertos con Nmap?',
    back: 'Los puertos abiertos son "puertas" a tu sistema.\n\n¿Por qué importa?\n- Cada puerto abierto es un servicio escuchando → potencial vulnerabilidad\n- Nmap te dice QUÉ servicios corren y en qué versión\n- Es el primer paso de cualquier auditoría de seguridad\n\nRegla de oro: solo deben estar abiertos los puertos estrictamente necesarios.',
    tags: ['a3','nmap','seguridad'], difficulty: 'easy'
  },
  {
    front: 'A3: ¿Qué diferencia hay entre escanear localhost y la IP real?',
    back: 'localhost (127.0.0.1) usa la interfaz de loopback interna.\n\nLa IP real (ej. 192.168.1.50) usa la tarjeta de red física/virtual.\n\n¿Por qué ambos?\n- localhost verifica servicios locales sin red\n- IP real verifica lo que un atacante en la red local vería\n- Pueden haber diferencias si hay firewalls por interfaz',
    tags: ['a3','nmap','red'], difficulty: 'medium'
  },
  {
    front: 'A3: ¿Por qué TCP SYN (-sS) es más sigiloso que TCP Connect (-sT)?',
    back: 'TCP SYN (-sS):\n- Envía SYN, recibe SYN-ACK, pero NUNCA completa el handshake (envía RST)\n- El servidor no registra una conexión completa → menos logs\n- Requiere root porque manipula paquetes a bajo nivel\n\nTCP Connect (-sT):\n- Completa el handshake completo (SYN → SYN-ACK → ACK)\n- El servicio registra la conexión → deja rastro\n- Funciona sin root pero es más lento y ruidoso',
    tags: ['a3','nmap','tcp','seguridad'], difficulty: 'hard'
  },
  {
    front: 'A3: ¿Por qué es peligroso tener puertos innecesarios abiertos?',
    back: 'Superficie de ataque: cada puerto es una entrada potencial.\n\nRiesgos concretos:\n- FTP (21) / Telnet (23): transmiten en texto plano → robo de credenciales\n- SSH (22): seguro pero debe estar actualizado y con contraseñas fuertes\n- Servicios desconocidos: pueden tener vulnerabilidades sin parchear\n\nSolución: principio del mínimo privilegio. Solo abrir lo imprescindible.',
    tags: ['a3','seguridad','puertos'], difficulty: 'medium'
  },

  // ==================== A4 ====================
  {
    front: 'A4: ¿Por qué usar netstat para ver puertos en escucha?',
    back: 'netstat -tlnp te dice QUÉ servicios están activos en tu máquina.\n\nColumnas clave:\n- Proto: TCP o UDP\n- Local Address: IP:puerto donde escucha\n- PID/Program name: qué proceso lo controla\n\n¿Por qué importa?\n- Detectar servicios no deseados o malware\n- Verificar que un servicio (FTP, SSH) arrancó correctamente\n- Documentar el estado de un servidor',
    tags: ['a4','netstat','ubuntu'], difficulty: 'easy'
  },
  {
    front: 'A4: Diferencia LISTEN vs ESTABLISHED y por qué importa',
    back: 'LISTEN:\n- El servicio espera conexiones NUEVAS\n- No hay datos circulando aún\n- Ejemplo: vsftpd espera en puerto 21\n\nESTABLISHED:\n- Ya existe una conexión activa entre cliente y servidor\n- Se intercambian datos\n- Ejemplo: un cliente FTP conectado y transfiriendo archivos\n\n¿Por qué saberlo?\n- LISTEN confirma que el servicio arrancó\n- ESTABLISHED confirma que alguien está usando el servicio',
    tags: ['a4','netstat','tcp'], difficulty: 'medium'
  },
  {
    front: 'A4: ¿Por qué instalar vsftpd si FTP es inseguro?',
    back: 'FTP es antiguo y transmite en texto plano, PERO sigue usándose en entornos controlados.\n\n¿Por qué en esta práctica?\n- Para entender conceptos de servicios de red\n- Para practicar netstat y ver conexiones reales\n- Como base para entender por qué existen alternativas seguras (SFTP)\n\nEn producción real: usar SFTP (sobre SSH) o FTPS (FTP + TLS).',
    tags: ['a4','ftp','ubuntu'], difficulty: 'medium'
  },

  // ==================== A5 ====================
  {
    front: 'A5: ¿Por qué necesitamos direcciones MAC si ya tenemos IP?',
    back: 'IP es lógica y jerárquica (para enrutar entre redes).\n\nMAC es física y única (para comunicar dentro de la misma red local).\n\nAnalogía:\n- IP = dirección postal completa (ciudad, calle, número)\n- MAC = número de serie de tu buzón físico\n\nLos switches de red usan MAC, no IP, para enviar datos al dispositivo correcto.',
    tags: ['a5','mac','red'], difficulty: 'medium'
  },
  {
    front: 'A5: ¿Qué hace ARP y por qué es necesario?',
    back: 'ARP (Address Resolution Protocol) responde a:\n"Tengo esta IP, ¿cuál es su MAC?"\n\nProceso:\n1. Tu PC pregunta en broadcast: "¿Quién tiene 192.168.1.1?"\n2. El router responde con su MAC\n3. Tu PC guarda la relación en la tabla ARP\n\n¿Por qué?\nSin MAC no puedes enviar tramas Ethernet. ARP es el puente entre capa 3 (IP) y capa 2 (Ethernet).',
    tags: ['a5','arp','red'], difficulty: 'medium'
  },
  {
    front: 'A5: ¿Por qué la tabla ARP tiene estados STALE y REACHABLE?',
    back: 'ARP dinámico expira para evitar información obsoleta.\n\nSTALE:\n- La entrada existe pero no se ha verificado recientemente\n- Puede ser válida o no (el dispositivo pudo cambiar/cambiar de red)\n\nREACHABLE:\n- Se confirmó activamente que el dispositivo responde\n- Se actualizó tras una comunicación reciente\n\n¿Por qué forzar comunicación?\nPara refrescar la tabla y asegurar que la MAC sigue siendo la correcta antes de enviar datos.',
    tags: ['a5','arp','red'], difficulty: 'hard'
  },
  {
    front: 'A5: ¿Qué es ARP spoofing y por qué es peligroso?',
    back: 'Ataque donde un equipo envía respuestas ARP falsas.\n\nEscenario:\n1. Atacante dice: "Yo soy el router (192.168.1.1)"\n2. Las víctimas envían tráfico al atacante en lugar del router\n3. El atacante reenvía el tráfico (Man in the Middle)\n\nConsecuencias:\n- Lectura de contraseñas si el tráfico no está cifrado\n- Denegación de servicio si el atacante no reenvía\n\nDefensa: ARP estático, VLANs, o herramientas como arpwatch.',
    tags: ['a5','arp','seguridad'], difficulty: 'hard'
  },

  // ==================== B1 ====================
  {
    front: 'B1: ¿Por qué necesitamos un Controlador de Dominio?',
    back: 'Sin DC, cada PC gestiona sus usuarios y contraseñas de forma independiente.\n\nCon DC:\n- Autenticación CENTRALIZADA: un solo usuario para todos los equipos\n- Políticas de grupo (GPO): configuraciones automáticas en todos los PCs\n- Seguridad uniforme: permisos consistentes en toda la red\n\nAnalogía: DC es como la conserjería de un edificio que da llaves y reglas a todos.',
    tags: ['b1','windows-server','dc'], difficulty: 'medium'
  },
  {
    front: 'B1: ¿Por qué IP estática antes de promocionar a DC?',
    back: 'El DC es el CORAZÓN de la red.\n\nSi su IP cambia:\n- Los clientes no encuentran el dominio\n- El DNS integrado deja de funcionar\n- Toda la autenticación falla\n\nAdemás, el propio DC actúa como DNS, por lo que debe conocer su propia dirección de forma permanente.',
    tags: ['b1','windows-server','dc','dns'], difficulty: 'easy'
  },
  {
    front: 'B1: Bosque, árbol y dominio: ¿qué son y por qué esta jerarquía?',
    back: 'Dominio: unidad básica (ej. eac3.usuario.home)\n→ Usuarios, equipos y políticas definidos aquí\n\nÁrbol: dominios que comparten el mismo sufijo DNS\n→ ej. ventas.eac3.home y rrhh.eac3.home\n\nBosque: colección de árboles que confían entre sí\n→ Comparten esquema y catálogo global\n\n¿Por qué jerarquía?\nPermite escalar desde una pequeña empresa hasta una multinacional.',
    tags: ['b1','active-directory','dominio'], difficulty: 'hard'
  },

  // ==================== B2 ====================
  {
    front: 'B2: ¿Por qué necesitamos zona inversa en DNS?',
    back: 'Zona directa: nombre → IP (para conectar A un servidor)\nZona inversa: IP → nombre (para saber QUIÉN es quien se conecta)\n\nUsos de la inversa:\n- Logs de seguridad: identificar equipos por nombre\n- Servidores de correo: anti-spam verifica que la IP tenga nombre válido\n- Diagnóstico de red: traceroute con nombres\n\nForma: 1.168.192.in-addr.arpa (se invierten los octetos)',
    tags: ['b2','dns','windows-server'], difficulty: 'hard'
  },
  {
    front: 'B2: Registros DNS: A, PTR y CNAME. ¿Qué hace cada uno y por qué?',
    back: 'A (Address): nombre → IP\n→ "servidor.eac3.home es 192.168.1.10"\n\nPTR (Pointer): IP → nombre\n→ "192.168.1.10 es servidor.eac3.home"\n\nCNAME (Alias): nombre → nombre\n→ "www.eac3.home apunta a servidor.eac3.home"\n\n¿Por qué CNAME?\nPermite cambiar la IP del servidor real sin tocar todos los aliases.',
    tags: ['b2','dns','windows-server'], difficulty: 'medium'
  },
  {
    front: 'B2: ¿Por qué crear PTR con PowerShell en vez de GUI?',
    back: 'La GUI suele crear el PTR automáticamente si marcas la casilla al crear el registro A.\n\n¿Por qué PowerShell entonces?\n- Automatización: scripts para crear muchos registros\n- Documentación reproducible\n- Menos errores humanos\n- Es la forma profesional de gestionar DNS en entornos empresariales',
    tags: ['b2','dns','powershell'], difficulty: 'medium'
  },

  // ==================== B3 ====================
  {
    front: 'B3: ¿Por qué usar grupos en Active Directory en vez de usuarios sueltos?',
    back: 'Imagina 100 usuarios y 50 carpetas compartidas.\n\nSin grupos:\n- 100 × 50 = 5000 permisos que gestionar manualmente\n\nCon grupos:\n- Creas "bibliotecari" y "usuari"\n- Asignas permisos por grupo\n- Añades/quitas usuarios del grupo\n\nPrincipio: gestionar POcos grupos es infinitamente más eficiente que gestionar MUCHOS usuarios individuales.',
    tags: ['b3','active-directory','grupos'], difficulty: 'easy'
  },
  {
    front: 'B3: Permisos NTFS vs permisos de compartición: ¿por qué ambos?',
    back: 'Son dos capas de seguridad INDEPENDIENTES.\n\nPermisos de compartición:\n- Aplican cuando accedes por RED (\\servidor\carpeta)\n- Solo 3 niveles: Control total, Cambiar, Lectura\n\nPermisos NTFS:\n- Aplican siempre, sea local o por red\n- Más granulares: 6 niveles distintos\n\nAcceso efectivo = EL MÁS RESTRICTIVO de ambos.\n\n¿Por qué ambos?\nLa compartición protege la entrada; NTFS protege el contenido.',
    tags: ['b3','windows-server','permisos'], difficulty: 'hard'
  },

  // ==================== B4 ====================
  {
    front: 'B4: ¿Por qué el DNS de Windows 11 debe apuntar al DC antes de unirse al dominio?',
    back: 'Unirse a un dominio requiere ENCONTRAR el DC.\n\nProceso:\n1. Win11 pregunta al DNS: "¿dónde está eac3.usuario.home?"\n2. El DNS del DC responde con los registros SRV (ubicación de controladores)\n3. Win11 contacta al DC y pide unirse\n\nSi el DNS apunta a Google (8.8.8.8):\n→ Google NO sabe de tu dominio privado → unión FALLA\n\nPor eso el DNS del cliente SIEMPRE debe ser el DC.',
    tags: ['b4','windows','dominio','dns'], difficulty: 'medium'
  },
  {
    front: 'B4: ¿Por qué cambiar el nombre del PC antes de unirlo al dominio?',
    back: 'El nombre del equipo en Active Directory es su IDENTIDAD.\n\nProblemas si no lo cambias:\n- Nombres genéricos (DESKTOP-AB12CD) son difíciles de gestionar\n- Políticas de grupo se aplican por nombre de equipo\n- Los logs de seguridad son confusos\n\nBuena práctica: nombrar el PC con el usuario o función (ej. MARTI-PC).',
    tags: ['b4','windows','dominio'], difficulty: 'easy'
  },

  // ==================== B5 ====================
  {
    front: 'B5: ¿Por qué SMB y no FTP para compartir carpetas en red Windows?',
    back: 'SMB (Server Message Block) es el protocolo NATIVO de Windows.\n\nVentajas sobre FTP:\n- Integración con permisos NTFS y AD\n- Acceso transparente como si fuera una unidad local\n- Soporte para archivos en uso y bloqueos\n- No requiere cliente adicional en Windows\n\nFTP es más universal (Linux, web) pero menos integrado en entornos Windows puros.',
    tags: ['b5','windows-server','smb'], difficulty: 'medium'
  },
  {
    front: 'B5: ¿Por qué configurar permisos NTFS Y de compartición?',
    back: 'Porque operan en momentos distintos:\n\n1. Permisos de compartición: filtran quién ENTRA por la red\n2. Permisos NTFS: filtran qué puede hacer una vez dentro\n\nEjemplo real:\n- Compartición: "usuari" tiene Lectura → entra a la carpeta\n- NTFS: "usuari" tiene Denegar escritura → no puede modificar nada\n\nSi solo configuras uno, dejas un agujero de seguridad.',
    tags: ['b5','windows-server','permisos'], difficulty: 'hard'
  },

  // ==================== B6 ====================
  {
    front: 'B6: ¿Por qué Samba en Ubuntu si ya tenemos Windows Server?',
    back: 'Samba permite que Linux "hable SMB" como si fuera un servidor Windows.\n\nUsos:\n- Compartir archivos Linux → clientes Windows sin instalar nada extra\n- Alternativa LIBRE y gratuita a las licencias de Windows Server\n- Controlador de dominio con Samba AD DC (B8)\n\nEn esta práctica: demuestra interoperabilidad entre sistemas.',
    tags: ['b6','ubuntu','samba'], difficulty: 'easy'
  },
  {
    front: 'B6: ¿Por qué guest ok = yes en el recurso público de Samba?',
    back: '"guest ok = yes" permite acceso SIN autenticar.\n\n¿Por qué en el recurso "imatges"?\n- Es un recurso PÚBLICO de solo lectura\n- Cualquiera en la red puede acceder sin usuario/contraseña\n- Útil para documentación, drivers, instaladores compartidos\n\n¡Cuidado! Nunca usar "guest ok" en carpetas con datos sensibles.',
    tags: ['b6','ubuntu','samba','seguridad'], difficulty: 'medium'
  },
  {
    front: 'B6: ¿Por qué valid users = @bibliotecari en Samba?',
    back: 'El @ indica que es un GRUPO del sistema Linux.\n\nLógica:\n- Solo los usuarios que pertenezcan al grupo "bibliotecari" pueden acceder\n- El sistema valida credenciales contra /etc/group y /etc/passwd\n\n¿Por qué no poner usuarios sueltos?\n- Más fácil de gestionar: añades/quitas usuarios del grupo\n- Coherente con Active Directory: la gestión por grupos es estándar',
    tags: ['b6','ubuntu','samba','permisos'], difficulty: 'medium'
  },

  // ==================== B7 ====================
  {
    front: 'B7: ¿Por qué compartir una impresora desde el servidor?',
    back: 'Centralizar recursos reduce costes y simplifica gestión.\n\nVentajas:\n- Un solo driver en el servidor; los clientes no lo necesitan\n- Cola de impresión centralizada: gestionar trabajos y prioridades\n- Seguimiento de uso: quién imprime qué y cuánto\n- Ahorro: una impresora potente para todos en vez de una por puesto\n\nBullzip PDF Printer es útil para practicar sin gastar papel.',
    tags: ['b7','windows-server','impresora'], difficulty: 'easy'
  },

  // ==================== B8 ====================
  {
    front: 'B8: ¿Por qué usar Samba como Controlador de Dominio?',
    back: 'Windows Server DC requiere licencias costosas.\n\nSamba AD DC ofrece:\n- Compatible con Active Directory de Microsoft\n- Clientes Windows se unen sin notar diferencia\n- DNS integrado, GPOs, LDAP, Kerberos\n- Software libre: sin costes de licencia\n\nLimitación: algunas funciones avanzadas de AD no están implementadas, pero para la mayoría de PYMES es más que suficiente.',
    tags: ['b8','ubuntu','samba','dc'], difficulty: 'hard'
  },
  {
    front: 'B8: ¿Qué hace samba-tool domain provision exactamente?',
    back: 'Crea desde CERO la estructura de Active Directory en Linux.\n\nParámetros clave:\n--server-role=dc → Es un controlador de dominio\n--realm → Nombre DNS del dominio (EAC3.USUARIO.HOME)\n--domain → NetBIOS corto (EAC3)\n--dns-backend=SAMBA_INTERNAL → El propio Samba gestiona DNS\n\nResultado:\n- Base de datos LDAP con usuarios/equipos\n- Zonas DNS directa e inversa\n- Cuenta Administrator lista para usar',
    tags: ['b8','ubuntu','samba','dc'], difficulty: 'hard'
  },

  // ==================== C1 ====================
  {
    front: 'C1: ¿Por qué IMAP es mejor que POP3 para uso moderno?',
    back: 'POP3 descarga los correos y (por defecto) los borra del servidor.\n\nProblema:\n- Si tienes móvil + PC + tablet, solo uno de ellos tiene los correos\n\nIMAP mantiene todo en el servidor:\n- Todos los dispositivos ven lo mismo\n- Carpetas sincronizadas\n- Puedes recuperar correos si formateas el PC\n\nPOP3 solo tiene sentido si tienes MUY poco espacio en el servidor.',
    tags: ['c1','correo','imap'], difficulty: 'easy'
  },
  {
    front: 'C1: SSL/TLS vs STARTTLS: ¿cuál usar y por qué?',
    back: 'SSL/TLS (puertos dedicados):\n- Cifrado desde el PRIMER paquete\n- Más seguro contra ataques de downgrade\n- Puertos: 465 (SMTP), 993 (IMAP), 995 (POP3)\n\nSTARTTLS (mismo puerto sin cifrar):\n- Empieza en texto plano y "upgradear" a TLS\n- Más flexible (un solo puerto para ambos)\n- Riesgo: un atacante puede bloquear el comando STARTTLS\n\nRecomendación: preferir puertos dedicados con cifrado nativo.',
    tags: ['c1','correo','seguridad'], difficulty: 'hard'
  },

  // ==================== C2 ====================
  {
    front: 'C2: ¿Por qué SSH en vez de Telnet para acceso remoto?',
    back: 'Telnet envía TODO en texto plano: usuario, contraseña, comandos, resultados.\n\nCualquiera con un sniffer en la red los ve.\n\nSSH cifra TODO:\n- Autenticación segura\n- Comandos y datos cifrados\n- Integridad: detecta si alguien modificó los datos en tránsito\n\nTelnet está OBSOLETO. SSH es el estándar absoluto desde los años 90.',
    tags: ['c2','ssh','seguridad'], difficulty: 'easy'
  },
  {
    front: 'C2: ¿Por qué usar clave pública en vez de contraseña?',
    back: 'Contraseña:\n- Puede adivinarse (fuerza bruta)\n- Se transmite en cada conexión (aunque cifrada)\n- Debe memorizarse → suele ser corta\n\nClave pública (RSA 4096):\n- Imposible de adivinar por fuerza bruta práctica\n- La clave privada NUNCA sale de tu PC\n- Puedes deshabilitar contraseñas → ataque de fuerza bruta imposible\n\nEs el método profesional para servidores en producción.',
    tags: ['c2','ssh','seguridad'], difficulty: 'medium'
  },
  {
    front: 'C2: ¿Por qué desactivar el acceso SSH de root?',
    back: 'Root tiene poder TOTAL sobre el sistema.\n\nSi un atacante adivina la contraseña de root (o roba la clave):\n→ Control completo del servidor\n\nEstrategia de defensa:\n- Permitir solo usuarios normales vía SSH\n- Si necesitan root, usan "sudo" después de conectar\n- Añade una capa extra: primero comprometer usuario normal, luego escalar privilegios\n\nPrincipio: minimizar la exposición de cuentas con privilegios máximos.',
    tags: ['c2','ssh','seguridad'], difficulty: 'medium'
  },
  {
    front: 'C2: ¿Por qué SFTP y no FTP para transferencia de archivos?',
    back: 'SFTP = SSH File Transfer Protocol\n\nVentajas:\n- Usa el mismo puerto 22 que SSH (no hace falta abrir más puertos)\n- Todo el tráfico está cifrado por el túnel SSH\n- Usa la misma autenticación (claves o contraseña)\n\nFTP tradicional:\n- Puerto 21 para comandos + puertos aleatorios para datos\n- Todo en texto plano\n- Problemático con firewalls (modos activo/pasivo)',
    tags: ['c2','ssh','sftp'], difficulty: 'medium'
  },

  // ==================== C3 ====================
  {
    front: 'C3: ¿Por qué compilar en C en vez de usar un ejecutable ya hecho?',
    back: 'Compilar desde código fuente te da CONTROL TOTAL.\n\nVentajas:\n- Eliges opciones de optimización (-O2, -O3)\n- Añades warnings (-Wall) para detectar errores\n- Depuración (-g) para usar gdb\n- Portabilidad: el mismo código funciona en cualquier CPU/OS con recompilación\n\nEn producción: los administradores compilan software específico porque los paquetes del repositorio pueden estar desactualizados.',
    tags: ['c3','ubuntu','c','gcc'], difficulty: 'easy'
  },
  {
    front: 'C3: ¿Por qué crear una página de manual (man page)?',
    back: 'Documentación integrada en el sistema operativo.\n\nVentajas:\n- Accesible sin internet: man programa\n- Formato estándar en todos los UNIX/Linux\n- Buscable con apropos y mandb\n- Los administradores esperan que todo programa serio tenga man page\n\nSe instala en /usr/share/man/manX donde X es la sección (1=comandos, 3=funciones, 5=configuración).',
    tags: ['c3','ubuntu','man','documentacion'], difficulty: 'medium'
  },

  // ==================== C4 ====================
  {
    front: 'C4: ¿Por qué usar Git si puedo hacer copias de archivos?',
    back: 'Copias manuales:\n- "proyecto_final.zip", "proyecto_final2.zip", "proyecto_final_REAL.zip"\n- Caos, duplicados, imposible saber qué cambió cuándo\n\nGit:\n- Historial completo de cada cambio (quién, cuándo, qué, por qué)\n- Ramas: experimentar sin romper el código principal\n- Revertir errores en segundos\n- Colaboración: varios programadores sin pisarse\n\nEs el estándar de la industria del software.',
    tags: ['c4','git','control-versiones'], difficulty: 'easy'
  },
  {
    front: 'C4: ¿Por qué hacer commits descriptivos y no "asdf" o "cambios"?',
    back: 'Un commit es un PUNTO EN EL TIEMPO con un mensaje.\n\nMal:\n- "cambios" → ¿Qué cambios? ¿Por qué?\n- "fix" → ¿Qué arreglaste?\n\nBien:\n- "Añadido Makefile para compilación automática"\n- "Corregido buffer overflow en función leer_datos"\n\n¿Por qué importa?\n- Cuando algo falla, git log te dice DÓNDE buscar\n- Otros desarrolladores entienden tu código sin preguntar\n- Documentación viva del proyecto',
    tags: ['c4','git','control-versiones'], difficulty: 'easy'
  },

  // ==================== CONCEPTOS GENERALES ====================
  {
    front: 'Concepto: ¿Por qué TCP es "fiable" y UDP es "rápido"?',
    back: 'TCP (Transmission Control Protocol):\n- Handshake de 3 pasos para establecer conexión\n- Acknowledgements: confirma que cada paquete llegó\n- Reenvío si falta algo\n- Orden garantizado\n→ Fiable pero con más latencia (web, correo, SSH)\n\nUDP (User Datagram Protocol):\n- Envía y olvida\n- Sin confirmaciones\n- Más rápido pero puede perder datos\n→ Streaming, DNS, juegos online',
    tags: ['red','tcp','udp','conceptos'], difficulty: 'medium'
  },
  {
    front: 'Concepto: ¿Por qué existen rangos de IP privadas?',
    back: 'IPv4 tiene ~4.300 millones de direcciones. No alcanzan para todos los dispositivos del mundo.\n\nSolución: IPs privadas (RFC 1918):\n- Reutilizables en cada red local\n- Solo necesitas 1 IP pública para toda tu casa/empresa\n- El router hace NAT (Network Address Translation)\n\nRangos:\n- 10.0.0.0/8 (grandes empresas)\n- 172.16.0.0/12 (medianas)\n- 192.168.0.0/16 (hogares y pequeñas oficinas)',
    tags: ['red','ip','conceptos'], difficulty: 'easy'
  },
  {
    front: 'Concepto: ¿Por qué siempre preferir protocolos cifrados?',
    back: 'Redes locales NO son seguras por defecto.\n\nAtaques posibles:\n- Sniffing: capturar todo el tráfico con Wireshark\n- Man in the Middle: interceptar y modificar comunicaciones\n- Spoofing: suplantar identidad\n\nProtocolos cifrados (HTTPS, SSH, SFTP, SMTPS):\n- El atacante ve datos pero no puede leerlos\n- Garantizan autenticidad (estás hablando con quien crees)\n- Garantizan integridad (nadie modificó los datos)\n\nHTTP, FTP, Telnet, SMTP sin cifrar = prohibidos en producción.',
    tags: ['seguridad','protocolos','conceptos'], difficulty: 'easy'
  },
  {
    front: 'Concepto: ¿Qué es NAT y por qué lo hace el router?',
    back: 'Network Address Translation: traduce IPs privadas ↔ pública.\n\nEscenario:\n- Tu PC tiene 192.168.1.50 (privada)\n- El router tiene 203.0.113.1 (pública)\n\nProceso:\n1. PC envía petición a Google\n2. Router cambia la IP origen (192.168.1.50 → 203.0.113.1)\n3. Google responde al router\n4. Router reenvía la respuesta a la PC correcta\n\n¿Por qué?\n- Permite que miles de dispositivos compartan una sola IP pública\n- Aísla la red local de Internet (firewall implícito)',
    tags: ['red','nat','conceptos'], difficulty: 'medium'
  },
];

const deck = {
  id: 'interconexion-redes-eac3',
  name: 'Interconexion y Gestion de Redes',
  description: 'Pasos practicos y explicaciones del por que de cada actividad. EAC3 de Sistemas Informaticos: redes, servicios, dominios, seguridad y gestion.',
  subject: 'Sistemas Informaticos',
  created: '2026-04-20',
  cards: cards.map((c, i) => ({ id: uuid(), ...c }))
};

const fs = require('fs');
fs.writeFileSync('public/data/interconexion-redes-eac3.json', JSON.stringify(deck, null, 2));
console.log('Creado public/data/interconexion-redes-eac3.json con', deck.cards.length, 'tarjetas');
