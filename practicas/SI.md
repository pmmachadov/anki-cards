# SI — Sistemas Informáticos (Mòdul 0483)

> 42 ejercicios prácticos extraídos de EAC1, EAC2 y EAC3.

---

## Unidad 1: Avaluació, instal·lació i planificació del sistema informàtic (EAC1)

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

---

## Unidad 2: Gestió de la informació i del sistema operatiu (EAC2)

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

---

## Unidad 3: Interconnexió i gestió de sistemes en xarxa (EAC3)

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
