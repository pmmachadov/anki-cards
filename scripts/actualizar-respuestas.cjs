const fs = require("fs");
const dir = "public/data/examenes";

// Read all 3 SI EAC files and update backs with practical commands
const si1 = JSON.parse(fs.readFileSync(dir + "/si-eac1.json", "utf8"));
const si2 = JSON.parse(fs.readFileSync(dir + "/si-eac2.json", "utf8"));
const si3 = JSON.parse(fs.readFileSync(dir + "/si-eac3.json", "utf8"));

// ===== SI EAC1 card backs =====
si1.cards.forEach(c => {
  switch (c.id) {
    case "si-eac1-a1a":
      c.back = "A: Puerto PS/2 para teclado\nB: Puerto PS/2 para ratón\nC: Salida de audio digital óptica S/PDIF (TOSLINK)\nD: Puertos USB\nE: Conectores de audio analógico de 3,5 mm\nF: Puerto de red Ethernet RJ-45\nG: Puerto eSATA\nH: Puerto IEEE 1394 / FireWire\nI: Salida de audio digital coaxial S/PDIF";
      break;
    case "si-eac1-a2a":
      c.back = "PROTOCOLO DE ANÁLISIS:\n1. Identificar cuándo empezó: qué programas se instalaron justo antes\n2. Revisar consumo con Administrador de tareas: CPU, RAM, disco, red\n3. Comprobar programas de inicio automático y servicios en segundo plano\n4. Revisar espacio libre en disco y errores del sistema\n5. Arrancar en modo seguro para aislar el problema\n\nComandos útiles (Windows):\ntaskmgr → Administrador de tareas\nmsconfig → Configuración del sistema (inicio)\nperfmon → Monitor de rendimiento\n\nComandos útiles (Linux):\ntop o htop → ver procesos y consumo\nfree -h → ver memoria RAM\ndf -h → ver espacio en disco\nsystemctl list-unit-files --type=service → servicios\n\nMedidas preventivas: instalar solo lo necesario, mantener actualizado, controlar inicio automático, dejar espacio libre, crear punto de restauración antes de cambios grandes.";
      break;
    case "si-eac1-a2b":
      c.back = "HDD: platos magnéticos que giran + cabezal mecánico → latencia alta, acceso lento a archivos pequeños/dispersos.\nSSD: memoria flash NAND, sin partes móviles → mucho más rápido, silencioso, estable.\n\nDiferencia clave: el SSD se nota sobre todo en:\n- Arranque del sistema (segundos vs. minutos)\n- Apertura de programas\n- Carga de máquinas virtuales\n- Compilación de proyectos\n- Trabajo con muchos archivos pequeños";
      break;
    case "si-eac1-a3a":
      c.back = "a) MBR tiene límite de 2TB y máximo 4 particiones primarias. NVMe necesita UEFI. Legacy+MBR no funcionan bien con NVMe.\n\nb) DIFERENCIAS:\nBIOS/MBR: heredado, 2TB máx, 4 primarias máximo, arranque 16 bits\nUEFI/GPT: moderno, discos grandes, muchas particiones, mejor con NVMe, arranque limpio con partición EFI\n\nc) PROCEDIMIENTO DUAL-BOOT:\n1. Hacer copia de seguridad\n2. Configurar BIOS en modo UEFI (desactivar CSM/Legacy)\n3. Inicializar disco en GPT\n4. Instalar Windows primero (UEFI)\n5. Instalar Linux después (UEFI), reutilizando partición EFI\n6. Verificar gestor de arranque (GRUB)\n7. Desactivar inicio rápido de Windows si da problemas";
      break;
    case "si-eac1-a3b":
      c.back = "a) La fuente de 550W es INSUFICIENTE: CPU 125W + GPU 350W = 475W sin contar el resto. Además caja compacta + refrigeración estándar → sobrecalentamiento.\n\nb) THERMAL THROTTLING: reducción automática de frecuencia cuando CPU/GPU alcanzan temperatura límite. Protege el hardware pero baja el rendimiento.\n\nc) CRITERIOS DE DIMENSIONADO:\n- Calcular consumo total + 20-30% de margen\n- PSU recomendada: 750-850W 80+ Gold\n- Caja con buen flujo de aire\n- Refrigeración adecuada (mejor aire o líquida)\n- Monitorear temperaturas con HWMonitor o similar";
      break;
    case "si-eac1-a3c":
      c.back = "SRAM: más rápida, no necesita refresco, pero muy cara y poca capacidad → se usa para caché.\nDRAM: más capacidad y menor coste/GB, necesita refresco periódico, más latencia → memoria principal.\n\nLa frecuencia de refresco de la DRAM introduce sobrecarga de gestión controlada por hardware.\n\nAdemás del tipo, evaluar: ECC, número de canales, controlador de memoria, CPU, cachés, almacenamiento, ancho de banda del bus.";
      break;
    case "si-eac1-a3d":
      c.back = "a) Varios dispositivos de alto ancho de banda (SSD secundario, USB4, tarjeta 10GbE) comparten el enlace del PCH hacia la CPU. Al usarse simultáneamente, ese enlace se satura.\n\nb) Compartir carriles PCIe significa que no todos los puertos tienen líneas exclusivas; varios dispositivos se reparten el ancho de banda disponible.\n\nc) OPTIMIZACIÓN:\n- GPU y SSD principal a carriles directos de CPU\n- Revisar manual de placa para evitar puertos que compartan líneas\n- No poner dispositivos críticos en ranuras del PCH\n- Usar placa con más carriles o plataforma superior\n- Repartir carga para evitar transferencias simultáneas extremas";
      break;
    case "si-eac1-b1":
      c.back = "Kernel: cerebro del SO, orquesta comunicación hardware-software.\nInterfaz de usuario: entorno gráfico o línea de comandos.\nSistema de archivos: organización, almacenamiento y acceso.\nMultitarea: varias aplicaciones simultáneas.\nMemoria virtual: amplía RAM usando espacio en disco (swap).\nControladores: permiten que el SO reconozca periféricos.\nActualizaciones: seguridad, correcciones, nuevas funciones.\nAdministración de procesos: monitorizar, suspender, reactivar.\nContenedores: comparten núcleo del host, usan recursos eficientemente.";
      break;
    case "si-eac1-b2a":
      c.back = "Instalación limpia: cuando se quiere empezar de cero, eliminar errores, cambiar de disco.\nActualización: cuando se quiere conservar programas, config y datos.\nArranque dual: cuando se necesitan dos SO en el mismo equipo.";
      break;
    case "si-eac1-b2b":
      c.back = "Máquina virtual: emula un ordenador completo con su propio SO. Consume más recursos pero está más aislada.\nContenedor: comparte el núcleo del anfitrión. Más ligero y rápido de desplegar, pero menos aislado.";
      break;
  }
});

// ===== SI EAC2 card backs with ACTUAL commands from exam =====
si2.cards.forEach(c => {
  switch (c.id) {
    case "examen-si-eac2-act1":
      c.back = "COMANDOS (fdisk):\n1. lsblk (ver discos disponibles)\n2. sudo fdisk /dev/nvme1n1\n3. n → p → 1 → Enter → +2G (partición primaria 1)\n4. n → p → 2 → Enter → +2G (primaria 2)\n5. n → p → 3 → Enter → +2G (primaria 3)\n6. n → e → 4 → Enter → +2G (extendida)\n7. n → l → 5 → Enter → +2G (lógica dentro de extendida)\n8. n → l → 6 → Enter → +2G (segunda lógica)\n9. w (guardar cambios y salir)\n10. lsblk (verificar resultado)\n\nTIPOS DE PARTICIÓN:\n3 primarias (1-3) + 1 extendida (4) + 2 lógicas (5-6)\nMBR permite máximo 4 primarias. Para más de 4, se usa extendida + lógicas.\n\nLIMITACIONES MBR:\n- Máximo 4 particiones primarias\n- Discos de hasta 2 TB\n- Sin protección contra corrupción";
      break;
    case "examen-si-eac2-act2":
      c.back = "COMANDOS (gdisk):\n1. lsblk (ver discos)\n2. sudo gdisk /dev/nvme0n1 (abrir con GPT)\n3. o (crear nueva tabla GPT)\n4. n → 1 → Enter → +2G (partición 1)\n5. n → 2 → Enter → +2G (partición 2)\n6. n → 3 → Enter → +2G (partición 3)\n7. n → 4 → Enter → +2G (partición 4)\n8. n → 5 → Enter → +2G (partición 5)\n9. w (guardar cambios)\n10. lsblk (verificar)\n\nGPT permite hasta 128 particiones primarias DIRECTAMENTE, sin necesitar extendida.";
      break;
    case "examen-si-eac2-act3":
      c.back = "PROCEDIMIENTO GPARTED:\n1. sudo gparted\n2. Seleccionar el disco GPT\n3. Click derecho en la penúltima partición → Redimensionar/Mover\n4. Ampliar tamaño para incluir el espacio de la última partición\n5. Click derecho en la última partición → Eliminar\n6. Aplicar operaciones (✓ verde)\n7. Verificar con lsblk\n\nRESULTADO: la partición resultante tendrá la suma de ambas (4 GB)";
      break;
    case "examen-si-eac2-act4":
      c.back = "a) Formatear y montar EXT4:\nsudo mkfs.ext4 /dev/nvme1n1p1\nsudo mkdir -p /mnt/ioc/ext4\nsudo mount /dev/nvme1n1p1 /mnt/ioc/ext4\ndf -h /mnt/ioc/ext4 (verificar)\n\nb) Formatear y montar NTFS (solo lectura):\nsudo mkfs.ntfs /dev/nvme1n1p2\nsudo mkdir -p /mnt/ioc/ntfs\nsudo mount -o ro /dev/nvme1n1p2 /mnt/ioc/ntfs\n\nc) Configurar SWAP:\nsudo mkswap /dev/nvme1n1p3\nsudo swapon -p 100 /dev/nvme1n1p3\nswapon --show (verificar)\n\nd) Montaje automático en /etc/fstab:\n/dev/nvme1n1p1 /mnt/ioc/ext4 ext4 defaults 0 2\ndf -h (verificar)";
      break;
    case "examen-si-eac2-act5":
      c.back = "COMANDOS LVM:\n1. sudo pvcreate /dev/sdb /dev/sdc (crear volúmenes físicos)\n2. sudo vgcreate machado /dev/sdb /dev/sdc (crear grupo de volúmenes)\n3. sudo lvcreate -L 4G -n datos machado (crear volumen lógico)\n4. sudo mkfs.ext4 /dev/machado/datos (formatear)\n5. sudo mount /dev/machado/datos /mnt (montar)\n\nVERIFICAR:\nsudo pvs → muestra PVs\nsudo vgs → muestra VGs\nsudo lvs → muestra LVs\nlsblk → estructura completa";
      break;
    case "examen-si-eac2-act6":
      c.back = "COMANDOS:\na) sudo apt install gedit (instalar)\nb) which gedit → /usr/bin/gedit (localizar ejecutable)\nc) Sí, está en /usr/bin porque es el directorio estándar FHS para ejecutables del sistema\nd) echo \"12345678X\" > ~/12345678X.txt (crear archivo con DNI)\ne) find ~ -name \"12345678X.txt\" (buscar archivo)";
      break;
    case "examen-si-eac2-act7":
      c.back = "PASOS EN WINDOWS 11:\n1. Win+R → diskmgmt.msc (Administración de discos)\n2. El disco nuevo aparecerá como 'Desconocido' → Inicializar disco (MBR o GPT)\n3. Click derecho en 'No asignado' → Nuevo volumen simple\n4. Siguiente → siguiente → Asignar letra (ej: E:) → Formatear NTFS → Finalizar\n5. El disco aparece en el Explorador de archivos";
      break;
    case "examen-si-eac2-act8":
      c.back = "HERRAMIENTA: rsync + cron (en Ubuntu)\n\n1. Crear script de backup:\nnano ~/backup.sh\n#!/bin/bash\nrsync -avh --delete /home/usuario/ /mnt/backup/\n\n2. Hacer ejecutable:\nchmod +x ~/backup.sh\n\n3. Programar con crontab:\ncrontab -e\n0 2 * * * /home/usuario/backup.sh\n(se ejecuta cada día a las 2:00 AM)\n\n4. Verificar: ls -la /mnt/backup/";
      break;
    case "examen-si-eac2-act9":
      c.back = "COMANDOS:\na) sudo groupadd biblioteca\n   sudo groupadd treballador\n\nb) sudo useradd -g biblioteca -G treballador -m machado\n\nc) Editar /etc/pam.d/common-password → minlen=8\n\nd) sudo passwd machado\n\ne) date > ~/data.txt\n\nf) sudo chown machado:machado data.txt\n   chmod 700 data.txt (rwx------)\n\nVERIFICAR:\nls -la data.txt (permisos y propietario)\ngroups machado (ver grupos)";
      break;
    case "examen-si-eac2-act10":
      c.back = "CONFIGURACIÓN NETPLAN (/etc/netplan/00-installer-config.yaml):\nnetwork:\n  ethernets:\n    eth0:\n      addresses: [192.168.1.100/24]\n      routes:\n        - to: default\n          via: 192.168.1.1\n      nameservers:\n        addresses: [8.8.8.8, 1.1.1.1]\n  version: 2\n\nAPLICAR:\nsudo netplan apply\n\nVERIFICAR:\nip a (ver IP asignada)\nip route (ver ruta por defecto)\nping 8.8.8.8 (probar conectividad)\nping google.com (probar DNS)";
      break;
    case "examen-si-eac2-act11":
      c.back = "COMANDOS:\na) sudo apt install vsftpd\n   sudo systemctl start vsftpd\n   sudo systemctl status vsftpd (ver PID: ej. 12706)\n\nb) ftp 192.168.1.100 (conectar desde máquina física)\n   Usuario: machado\n   Password: Password123\n   Puerto: 21\n   Servidor: 13.62.225.42 (ejemplo AWS)\n\nc) PID: 12706 (visible en systemctl status)\nd) sudo systemctl restart vsftpd\ne) /etc/vsftpd.conf";
      break;
    case "examen-si-eac2-act12":
      c.back = "COMANDOS:\n1. sudo apt install wireshark\n2. sudo wireshark (abrir)\n3. Seleccionar interfaz → Start\n4. En otra terminal: ftp localhost\n5. En Wireshark, filtrar por: ftp\n6. Buscar paquetes:\n   - 'Request: USER machado' (usuario)\n   - 'Request: PASS Password123' (contraseña)\n\n⚠️ FTP envía credenciales en TEXTO PLANO → riesgo de seguridad.";
      break;
    case "examen-si-eac2-act13":
      c.back = "a) rsyslog: servicio de registro del sistema. Escribe logs en /var/log/syslog.\n\nb) logrotate: herramienta que gestiona la rotación de logs.\n- Config: /etc/logrotate.conf\n- Por servicio: /etc/logrotate.d/\n\nc) Periodo por defecto: weekly (semanal), rotate 4, delaycompress\nNO es la misma para todos. Cada servicio puede tener su configuración (daily, monthly, size).\n\nEjemplo /var/log/syslog:\n/var/log/syslog {\n  rotate 4\n  weekly\n  missingok\n  notifempty\n  compress\n  delaycompress\n  sharedscripts\n}\n\nEjemplo de líneas de reinicio FTP:\n2026-04-04T19:42:11 systemd[1]: Starting vsftpd.service...\n2026-04-04T19:42:11 systemd[1]: Started vsftpd.service.";
      break;
    case "examen-si-eac2-act14":
      c.back = "CONFIGURACIÓN: Win+R → secpol.msc\n\na) Directivas de cuenta → Directiva de contraseñas:\n- 'La contraseña debe cumplir requisitos de complejidad' → Habilitada\n\nb) Directivas locales → Asignación de derechos de usuario:\n- Permitir inicio de sesión → definir horario\n\nc) Directivas de cuenta → Directiva de bloqueo:\n- Duración del bloqueo: 30 min\n- Umbral de bloqueo: 3 intentos fallidos\n- Restablecer contador: 30 min después";
      break;
    case "examen-si-eac2-act15":
      c.back = "PASOS:\n1. Administración de equipos → Usuarios → Nuevo usuario\n2. Asignar contraseña\n3. Cerrar sesión e intentar con contraseña incorrecta\n4. Win+R → eventvwr.msc (Visor de eventos)\n5. Registros de Windows → Seguridad\n6. Buscar Event ID 4625 (inicio de sesión fallido)\n\nEl evento 4625 muestra: nombre de usuario, hora del intento y dirección IP desde donde se intentó.";
      break;
  }
});

// ===== SI EAC3 card backs with ACTUAL commands =====
si3.cards.forEach(c => {
  switch (c.id) {
    case "examen-si-eac3-a1":
      c.back = "COMANDOS IP (temporal, se pierde al reiniciar):\na) sudo ip addr add 192.168.1.100/24 dev eth0\nb) Ya incluida en la máscara /24\nc) sudo ip route add default via 192.168.1.1\nd) Editar /etc/resolv.conf: nameserver 8.8.8.8\ne) ping 8.8.8.8 / ping google.com\n\nCON NET-TOOLS (ifconfig):\n1. sudo apt install net-tools\n2. sudo ifconfig eth0 192.168.1.100 netmask 255.255.255.0\n3. sudo route add default gw 192.168.1.1\n4. ping 8.8.8.8";
      break;
    case "examen-si-eac3-a2":
      c.back = "PASOS EN WINDOWS:\na) Panel de control → Centro de redes → Cambiar configuración →\n   IPv4 → Propiedades → 'Usar la siguiente dirección IP'\n   IP: 192.168.1.100 / Máscara: 255.255.255.0 / Puerta: 192.168.1.1\n\nb) DNS: 8.8.8.8 y 1.1.1.1\n\nc) ping 8.8.8.8 / ping google.com\n\nd) ipconfig /all (información completa)";
      break;
    case "examen-si-eac3-a3":
      c.back = "COMANDOS:\na) sudo apt install nmap\n\nb) nmap localhost\n   nmap 192.168.1.100\n\nc) Puertos: open (responde), filtered (firewall), closed (no servicio)\n\nd) nmap -p 19-100 localhost (rango específico, más rápido)\n\nEjemplo: solo puerto 22 (SSH) abierto. Tiempo: 17s completo vs 0.06s rango.\n\ne) Puerto 22 → SSH\n\nf) TCP SYN (-sS): no completa handshake, sigiloso, requiere sudo\n   TCP Connect (-sT): conexión completa, más rastro, funciona sin root\n\ng) Exponer puertos innecesarios amplía superficie de ataque. Solo mantener lo necesario.";
      break;
    case "examen-si-eac3-a4":
      c.back = "COMANDOS:\na) sudo netstat -tln (TCP en escucha)\nb) sudo netstat -uln (UDP en escucha)\nc) sudo netstat -tlnp (con PID y nombre del proceso)\n\nd) sudo apt install vsftpd\n   sudo systemctl start vsftpd\n\ne) sudo netstat -tlnp | grep :21 → puerto 21 LISTEN\n\nf) ftp localhost\n\ng) sudo netstat -tn | grep :21 → conexión ESTABLISHED\n\nh) LISTEN: servicio esperando conexiones\n   ESTABLISHED: conexión activa establecida";
      break;
    case "examen-si-eac3-a5":
      c.back = "COMANDOS:\na) Linux: ip link show\n   Windows: ipconfig /all | findstr \"Física\"\n\nb) Ubuntu VM: ip link show o ifconfig\n\nc) ip neigh (Linux) / arp -a (Windows) → buscar IP del router\n\nd) arp -a / ip neigh\n\ne) Solo aparecen dispositivos con los que se ha comunicado recientemente (la tabla ARP expira)\n\nf) ping 192.168.1.1 → ip neigh → cambia STALE → REACHABLE\n\ng) ARP dinámico: aprendizaje automático\n   ARP estático: entrada fija manual\n   ARP spoofing: falsificar MAC para interceptar tráfico → riesgo de seguridad";
      break;
    case "examen-si-eac3-b1":
      c.back = "PASOS:\na) Descargar ISO de Windows Server 2019\n   Requisitos: 2 GB RAM, 32 GB disco, CPU 1.4 GHz\n\nb) Crear VM: 2 GB RAM, disco dinámico 40 GB\n\nc) Nombre servidor: SRV-DC\n   IP fija: 192.168.1.10/24\n\nd) Server Manager → Agregar roles → Active Directory Domain Services\n   Promocionar → Nuevo bosque\n   Dominio: eac3.pmachado.home\n   Contraseña DSRM\n\nVerificar: dcdiag";
      break;
    case "examen-si-eac3-b2":
      c.back = "PASOS:\na) DNS Manager → Zonas directas → eac3.pmachado.home (creada automáticamente)\n\nb) Zona inversa: Nueva zona → ID red: 192.168.1\n\nc) Registro A: SRV-DC → 192.168.1.10\n\nd) Registro PTR (PowerShell):\nAdd-DnsServerResourceRecordPtr -Name 10 -ZoneName 1.168.192.in-addr.arpa -PtrDomainName SRV-DC.eac3.pmachado.home\n\ne) Registro CNAME: www → SRV-DC.eac3.pmachado.home";
      break;
    case "examen-si-eac3-b3":
      c.back = "PASOS:\na) ADUC → New → Group: bibliotecari (Global Security)\n   → New → Group: usuari\n\nb) New → User: Martí, Jana\n\nc) Propiedades → Member Of → añadir grupo\n\nd) echo %date% > fecha.txt o date > fecha.txt\n\ne) Botón derecho → Propiedades → Seguridad:\n   - Martí: Control total\n   - Jana: Leer y ejecutar";
      break;
    case "examen-si-eac3-b4":
      c.back = "PASOS:\na) IP: 192.168.1.20/24, Puerta: 192.168.1.1\n\nb) Sistema → Cambiar nombre → Pablo\n\nc) DNS: 192.168.1.10 (IP del servidor)\n\nd) Sistema → Cambiar nombre → Miembro de dominio:\n   eac3.pmachado.home\n   Credenciales: administrador del dominio\n\ne) ADUC → Computers → debe aparecer 'Pablo'";
      break;
    case "examen-si-eac3-b5":
      c.back = "PASOS:\na) Crear C:\\documentacio\n\nb) Botón derecho → Compartir → Usuarios específicos\n   O PowerShell: New-SmbShare -Name documentacio -Path C:\\documentacio\n\nc) Permisos de compartir:\n   - bibliotecari: Lectura/Escritura\n   - usuari: Lectura\n\nd) Permisos NTFS (Seguridad):\n   - bibliotecari: Control total\n   - usuari: Leer y ejecutar\n\nREGLAS: el permiso más restrictivo entre NTFS y Compartición es el efectivo.";
      break;
    case "examen-si-eac3-b6":
      c.back = "COMANDOS:\n1. sudo apt install samba\n\n2. sudo nano /etc/samba/smb.conf\n[imatges]\n  path = /srv/samba/imatges\n  public = yes\n  writable = yes\n  guest ok = yes\n\n[documents]\n  path = /srv/samba/documents\n  valid users = @bibliotecari\n  writable = yes\n\n3. sudo systemctl restart smbd\n4. sudo smbpasswd -a usuario\n5. Desde Windows: \\IP-UBUNTU\\imatges\n\nVERIFICAR: sudo systemctl status smbd";
      break;
    case "examen-si-eac3-b7":
      c.back = "PASOS:\n1. Instalar Bullzip PDF Printer (o impresora virtual) en el servidor\n2. Configurar como compartida: Dispositivos → Impresoras → Propiedades → Compartir\n3. En Windows 11 cliente:\n   - Agregar impresora → Buscar en red\n   - O: \\SRV-DC\\nombre_impresora\n4. Imprimir documento de prueba";
      break;
    case "examen-si-eac3-b8":
      c.back = "COMANDOS:\na) sudo apt install samba krb5-user krb5-config winbind\n\nb) IP estática en /etc/netplan/\n\nc) sudo samba-tool domain provision --use-rfc2307 --domain=EAC3 --realm=eac3.pmachado.home --dns-backend=SAMBA_INTERNAL --adminpass=Contraseña123\n\nd) El DNS integrado se configura automáticamente\n\ne) sudo systemctl start samba-ad-dc\n   sudo samba-tool domain level show\n\nf) Configurar DNS del cliente Windows a IP del Ubuntu Server\n   Unir al dominio eac3.pmachado.home\n\ng) Iniciar sesión con usuario del dominio";
      break;
    case "examen-si-eac3-c1":
      c.back = "PASOS:\na) sudo apt install thunderbird\n\nb) Configurar cuenta Gmail (usar contraseña de aplicación)\n\nc) IMAP: puerto 993 (SSL/TLS) o 143 (STARTTLS)\n   POP3: puerto 995 (SSL/TLS) o 110 (STARTTLS)\n\nd) SMTP: puerto 465 (SSL/TLS) o 587 (STARTTLS)\n\ne) Enviar correo de prueba\n\nf) Verificar recepción\n\ng) IMAP: 143/993 | POP3: 110/995 | SMTP: 25/465/587\n\nh) SSL/TLS: cifrado desde inicio\n   STARTTLS: inicia en texto plano y negocia cifrado después";
      break;
    case "examen-si-eac3-c2":
      c.back = "COMANDOS:\na) sudo apt install openssh-server\n\nb) sudo systemctl status ssh\n   sudo netstat -tlnp | grep :22\n\nc) PuTTY: Host=IP, Port=22, SSH\n\nd) ssh usuari@192.168.1.100\n\ne) ls, who, df -h, systemctl status\n\nf) ssh-keygen -t rsa (generar clave)\n   ssh-copy-id usuari@192.168.1.100\n\ng) sftp usuari@192.168.1.100\n   put archivo.txt\n\nh) sudo nano /etc/ssh/sshd_config\n   PermitRootLogin no\n   sudo systemctl restart ssh";
      break;
    case "examen-si-eac3-c3a":
      c.back = "COMANDOS:\na) gcc programa.c -o programa\n   (o con Makefile: make)\n\nb) ./programa argumento\n\nc) Crear página man (programa.3):\n.TH PROGRAMA 3\n.SH NAME\nprograma - descripción\n.SH SYNOPSIS\n.B programa [opciones]\n.SH DESCRIPTION\nDescripción completa\n.SH OPTIONS\n.B -h  Muestra ayuda\n.SH AUTHOR\nPablo Machado\n\nd) groff -man -Tascii programa.3 (previsualizar)\ne) sudo cp programa.3 /usr/share/man/man3/\nf) sudo mandb\ng) man 3 programa";
      break;
    case "examen-si-eac3-c3b":
      c.back = "COMANDOS:\na) sudo apt install git\n\nb) git config --global user.name \"Pablo Machado\"\n   git config --global user.email \"pablo@example.com\"\n\nc) mkdir proyecto && cd proyecto\n   git init\n\nd) cp ../programa.c .\n   git add programa.c\n\ne) git commit -m \"Primer commit\"\n   git commit -m \"Segundo commit\"\n\nf) En otra máquina:\n   git clone ssh://usuari@IP:/home/usuari/proyecto";
      break;
  }
});

// Write updated files
fs.writeFileSync(dir + "/si-eac1.json", JSON.stringify(si1, null, 2));
fs.writeFileSync(dir + "/si-eac2.json", JSON.stringify(si2, null, 2));
fs.writeFileSync(dir + "/si-eac3.json", JSON.stringify(si3, null, 2));

console.log("✅ SI EAC1: " + si1.cards.length + " cards actualizadas");
console.log("✅ SI EAC2: " + si2.cards.length + " cards actualizadas");
console.log("✅ SI EAC3: " + si3.cards.length + " cards actualizadas");
