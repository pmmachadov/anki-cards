const fs = require("fs");
const dir = "public/data/examenes";

const si2 = JSON.parse(fs.readFileSync(dir + "/si-eac2.json", "utf8"));
const si3 = JSON.parse(fs.readFileSync(dir + "/si-eac3.json", "utf8"));

// Map card IDs to new backs
const si2backs = {
  "si-eac2-act1": "COMANDOS (fdisk):\n1. lsblk (ver discos disponibles)\n2. sudo fdisk /dev/nvme1n1\n3. n → p → 1 → Enter → +2G (partición primaria 1)\n4. n → p → 2 → Enter → +2G (primaria 2)\n5. n → p → 3 → Enter → +2G (primaria 3)\n6. n → e → 4 → Enter → +2G (extendida contenedora)\n7. n → l → 5 → Enter → +2G (lógica dentro de extendida)\n8. n → l → 6 → Enter → +2G (segunda lógica)\n9. w (guardar y salir)\n10. lsblk (verificar)\n\nTIPOS: 3 primarias (1-3) + 1 extendida (4) + 2 lógicas (5-6)\nMBR permite máx 4 primarias. Para más de 4 se usa extendida+lógicas.\n\nLIMITACIONES MBR:\n- Máx 4 primarias\n- Discos hasta 2 TB\n- Sin protección contra corrupción",
  "si-eac2-act2": "COMANDOS (gdisk):\n1. lsblk (ver discos)\n2. sudo gdisk /dev/nvme0n1\n3. o (crear nueva tabla GPT)\n4. n → 1 → Enter → +2G\n5. n → 2 → Enter → +2G\n6. n → 3 → Enter → +2G\n7. n → 4 → Enter → +2G\n8. n → 5 → Enter → +2G\n9. w (guardar)\n10. lsblk (verificar)\n\n✅ GPT: hasta 128 primarias directamente, sin necesitar extendida.",
  "si-eac2-act3": "PROCEDIMIENTO GPARTED:\n1. sudo gparted\n2. Seleccionar disco GPT\n3. Click derecho en penúltima partición → Redimensionar/Mover\n4. Ampliar para incluir espacio de la última\n5. Click derecho en última → Eliminar\n6. Aplicar operaciones (✓)\n7. lsblk (verificar)\n\nRESULTADO: partición única de 4 GB",
  "si-eac2-act4": "a) EXT4:\nsudo mkfs.ext4 /dev/nvme1n1p1\nsudo mkdir -p /mnt/ioc/ext4\nsudo mount /dev/nvme1n1p1 /mnt/ioc/ext4\ndf -h (verificar)\n\nb) NTFS (solo lectura):\nsudo mkfs.ntfs /dev/nvme1n1p2\nsudo mkdir -p /mnt/ioc/ntfs\nsudo mount -o ro /dev/nvme1n1p2 /mnt/ioc/ntfs\n\nc) SWAP:\nsudo mkswap /dev/nvme1n1p3\nsudo swapon -p 100 /dev/nvme1n1p3\nswapon --show\n\nd) Montaje automático (/etc/fstab):\n/dev/nvme1n1p1 /mnt/ioc/ext4 ext4 defaults 0 2",
  "si-eac2-act5": "COMANDOS LVM:\n1. sudo pvcreate /dev/sdb /dev/sdc (PV)\n2. sudo vgcreate machado /dev/sdb /dev/sdc (VG)\n3. sudo lvcreate -L 4G -n datos machado (LV)\n4. sudo mkfs.ext4 /dev/machado/datos\n5. sudo mount /dev/machado/datos /mnt\n\nVERIFICAR:\nsudo pvs → PVs\nsudo vgs → VGs\nsudo lvs → LVs\nlsblk",
  "si-eac2-act6": "COMANDOS:\na) sudo apt install gedit\nb) which gedit → /usr/bin/gedit\nc) Sí, /usr/bin es el directorio estándar FHS para ejecutables\nd) echo \"12345678X\" > ~/12345678X.txt\ne) find ~ -name \"12345678X.txt\"",
  "si-eac2-act7": "PASOS WINDOWS 11:\n1. Win+R → diskmgmt.msc\n2. Inicializar disco (MBR o GPT)\n3. Click en 'No asignado' → Nuevo volumen simple\n4. Siguiente → Asignar letra (ej E:) → NTFS → Finalizar\n5. Aparece en Explorador de archivos",
  "si-eac2-act8": "HERRAMIENTA: rsync + cron (Ubuntu)\n\n1. Crear script backup:\nnano ~/backup.sh\n#!/bin/bash\nrsync -avh --delete /home/ /mnt/backup/\n\n2. chmod +x ~/backup.sh\n\n3. Programar:\ncrontab -e\n0 2 * * * /home/usuario/backup.sh\n(cada día a las 2:00 AM)\n\n4. Verificar: ls /mnt/backup/",
  "si-eac2-act9": "COMANDOS:\na) sudo groupadd biblioteca\n   sudo groupadd treballador\n\nb) sudo useradd -g biblioteca -G treballador -m machado\n\nc) /etc/pam.d/common-password → minlen=8\n\nd) sudo passwd machado\n\ne) date > ~/data.txt\n\nf) sudo chown machado:machado data.txt\n   chmod 700 data.txt (rwx------)\n\nVerificar:\nls -la data.txt\ngroups machado",
  "si-eac2-act10": "NETPLAN (/etc/netplan/00-installer-config.yaml):\nnetwork:\n  ethernets:\n    eth0:\n      addresses: [192.168.1.100/24]\n      routes:\n        - to: default\n          via: 192.168.1.1\n      nameservers:\n        addresses: [8.8.8.8, 1.1.1.1]\n  version: 2\n\nAPLICAR:\nsudo netplan apply\n\nVERIFICAR:\nip a\nip route\nping 8.8.8.8\nping google.com",
  "si-eac2-act11": "COMANDOS:\na) sudo apt install vsftpd\n   sudo systemctl start vsftpd\n   sudo systemctl status vsftpd\n\nb) ftp 192.168.1.100\n   User: machado / Pass: Password123 / Port: 21\n\nc) PID: 12706 (visible en systemctl status)\nd) sudo systemctl restart vsftpd\ne) /etc/vsftpd.conf",
  "si-eac2-act12": "PASOS:\n1. sudo apt install wireshark\n2. sudo wireshark\n3. Seleccionar interfaz → Start\n4. En otra terminal: ftp localhost\n5. En Wireshark filtrar: ftp\n6. Buscar 'Request: USER' (usuario) y 'Request: PASS' (contraseña)\n\n⚠️ FTP = texto plano, credenciales visibles",
  "si-eac2-act13": "a) rsyslog: servicio de registro del sistema. Escribe en /var/log/syslog.\n\nb) logrotate: rotación automática de logs.\n   Config: /etc/logrotate.conf\n   Por servicio: /etc/logrotate.d/\n\nc) Defecto: weekly, rotate 4, delaycompress\n   NO es igual para todos (cada servicio puede tener daily, monthly, size)\n\nEjemplo líneas reinicio FTP:\n2026-04-04T19:42:11 systemd[1]: Starting vsftpd.service...\n2026-04-04T19:42:11 systemd[1]: Started vsftpd.service.\n\nEjemplo logrotate /var/log/syslog {\n  rotate 4\n  weekly\n  missingok\n  notifempty\n  compress\n  delaycompress\n  sharedscripts\n}",
  "si-eac2-act14": "CONFIGURACIÓN: Win+R → secpol.msc\n\na) Directivas de cuenta → Directiva de contraseñas:\n   'Requisitos de complejidad' → Habilitada\n\nb) Usuarios → Propiedades → Horas de inicio de sesión\n   (ej: L-V 9:00-18:00)\n\nc) Directivas de cuenta → Directiva de bloqueo:\n   - Duración: 30 min\n   - Umbral: 3 intentos\n   - Restablecer: 30 min",
  "si-eac2-act15": "PASOS:\n1. Administración de equipos → Usuarios → Nuevo usuario\n2. Asignar contraseña\n3. Cerrar sesión e intentar con contraseña incorrecta\n4. Win+R → eventvwr.msc\n5. Registros de Windows → Seguridad → Event ID 4625\n\nEvento 4625 muestra: usuario, hora, IP del intento fallido",
};

const si3backs = {
  "si-eac3-a1": "COMANDOS IP (temporal, se pierde al reiniciar):\na) sudo ip addr add 192.168.1.100/24 dev eth0\nb) La máscara va en la notación /24\nc) sudo ip route add default via 192.168.1.1\nd) Editar /etc/resolv.conf: nameserver 8.8.8.8\ne) ping 8.8.8.8 / ping google.com\n\nCON NET-TOOLS:\n1. sudo apt install net-tools\n2. sudo ifconfig eth0 192.168.1.100 netmask 255.255.255.0\n3. sudo route add default gw 192.168.1.1\n4. ping 8.8.8.8",
  "si-eac3-a2": "PASOS WINDOWS:\na) Panel control → Centro redes → Cambiar adaptador → IPv4 → Propiedades\n   IP: 192.168.1.100 / Másc: 255.255.255.0 / Puerta: 192.168.1.1\n\nb) DNS: 8.8.8.8\n\nc) ping 8.8.8.8\n\nd) ipconfig /all",
  "si-eac3-a3": "COMANDOS:\na) sudo apt install nmap\n\nb) nmap localhost\n   nmap 192.168.1.100\n\nc) open=responde, filtered=firewall, closed=sin servicio\n\nd) nmap -p 19-100 localhost\n\ne) Puerto 22 → SSH\n\nf) TCP SYN (-sS): sin handshake, rápido, requiere sudo\n   TCP Connect (-sT): conexión completa, más rastro, sin root\n\ng) Puertos innecesarios = más superficie de ataque. Solo mantener lo necesario.",
  "si-eac3-a4": "COMANDOS:\na) sudo netstat -tln (TCP escucha)\nb) sudo netstat -uln (UDP escucha)\nc) sudo netstat -tlnp (con PID/proceso)\n\nd) sudo apt install vsftpd\n   sudo systemctl start vsftpd\n\ne) sudo netstat -tlnp | grep :21 → LISTEN\n\nf) ftp localhost\n\ng) sudo netstat -tn | grep :21 → ESTABLISHED\n\nh) LISTEN = esperando conexiones\n   ESTABLISHED = conexión activa",
  "si-eac3-a5": "COMANDOS:\na) Linux: ip link show\n   Windows: ipconfig /all | findstr \"Física\"\n\nb) Ubuntu VM: ip link show\n\nc) ip neigh (Linux) / arp -a (Windows)\n\nd) arp -a / ip neigh\n\ne) Solo dispositivos comunicados recientemente (la tabla ARP expira)\n\nf) ping 192.168.1.1 → ip neigh (STALE → REACHABLE)\n\ng) ARP dinámico: automático\n   ARP estático: entrada manual fija\n   ARP spoofing: falsificar MAC para interceptar tráfico",
  "si-eac3-b1": "PASOS:\na) Descargar ISO Win Server 2019\n   Requisitos: 2 GB RAM, 32 GB disco, CPU 1.4 GHz\n\nb) VM: 2 GB RAM, disco 40 GB dinámico\n\nc) Nombre: SRV-DC\n   IP fija: 192.168.1.10/24\n\nd) Server Manager → Add roles → AD DS → Promocionar\n   Nuevo bosque → Dominio: eac3.pmachado.home\n   Contraseña DSRM\n\nVerificar: dcdiag",
  "si-eac3-b2": "PASOS:\na) DNS Mgr → Zonas directas → dominio creado automáticamente\n\nb) Zona inversa: Nueva → ID red 192.168.1\n\nc) Registro A: SRV-DC → 192.168.1.10\n\nd) PTR (PowerShell):\nAdd-DnsServerResourceRecordPtr -Name 10 -ZoneName 1.168.192.in-addr.arpa -PtrDomainName SRV-DC.eac3.pmachado.home\n\ne) CNAME: www → SRV-DC.eac3.pmachado.home",
  "si-eac3-b3": "PASOS:\na) ADUC → New → Group: bibliotecari, usuari\n\nb) New → User: Martí, Jana\n\nc) Propiedades → Member Of → añadir al grupo\n\nd) echo %date% > fecha.txt\n\ne) Propiedades → Seguridad:\n   - Martí: Control total\n   - Jana: Leer y ejecutar",
  "si-eac3-b4": "PASOS:\na) IP: 192.168.1.20/24, Puerta: 192.168.1.1\n\nb) Sistema → Cambiar nombre → Pablo\n\nc) DNS: 192.168.1.10\n\nd) Sistema → Unir a dominio: eac3.pmachado.home\n   Credenciales: administrador del dominio\n\ne) ADUC → Computers → aparece 'Pablo'",
  "si-eac3-b5": "PASOS:\na) Crear C:\\documentacio\n\nb) Botón derecho → Compartir\n   O: New-SmbShare -Name documentacio -Path C:\\documentacio\n\nc) Permisos de compartir:\n   - bibliotecari: Lectura/Escritura\n   - usuari: Lectura\n\nd) Permisos NTFS:\n   - bibliotecari: Control total\n   - usuari: Leer y ejecutar\n\n⚠️ Permiso efectivo = el más restrictivo entre NTFS y Compartición.",
  "si-eac3-b6": "COMANDOS:\n1. sudo apt install samba\n\n2. /etc/samba/smb.conf:\n[imatges]\n  path = /srv/samba/imatges\n  public = yes\n  writable = yes\n  guest ok = yes\n\n[documents]\n  path = /srv/samba/documents\n  valid users = @bibliotecari\n  writable = yes\n\n3. sudo systemctl restart smbd\n4. sudo smbpasswd -a usuario\n5. Desde Windows: \\IP-UBUNTU\\imatges\n\nVerificar: sudo systemctl status smbd",
  "si-eac3-b7": "PASOS:\n1. Instalar Bullzip PDF Printer en servidor\n2. Compartir: Dispositivos → Impresoras → Propiedades → Compartir\n3. En W11: Agregar impresora → Buscar en red → \\SRV-DC\\nombre_impresora\n4. Imprimir documento de prueba",
  "si-eac3-b8": "COMANDOS:\na) sudo apt install samba krb5-user krb5-config winbind\n\nb) IP estática en netplan\n\nc) sudo samba-tool domain provision --use-rfc2307 --domain=EAC3 --realm=eac3.pmachado.home --dns-backend=SAMBA_INTERNAL --adminpass=Contraseña123\n\nd) DNS integrado se configura automáticamente\n\ne) sudo systemctl start samba-ad-dc\n   sudo samba-tool domain level show\n\nf) Cliente Windows: DNS → IP Ubuntu, unir a dominio\n\ng) Iniciar sesión con usuario del dominio",
  "si-eac3-c1": "PASOS:\na) sudo apt install thunderbird\n\nb) Configurar Gmail (contraseña de aplicación)\n\nc) IMAP: 993 (SSL) o 143 (STARTTLS)\n   POP3: 995 (SSL) o 110 (STARTTLS)\n\nd) SMTP: 465 (SSL) o 587 (STARTTLS)\n\ne) Enviar correo de prueba\n\nf) Verificar recepción\n\ng) IMAP: 143/993 | POP3: 110/995 | SMTP: 25/465/587\n\nh) SSL/TLS: cifra desde inicio\n   STARTTLS: texto plano→negocia cifrado",
  "si-eac3-c2": "COMANDOS:\na) sudo apt install openssh-server\n\nb) sudo systemctl status ssh\n   sudo netstat -tlnp | grep :22\n\nc) PuTTY: Host=IP, Port=22, SSH\n\nd) ssh usuario@192.168.1.100\n\ne) ls; who; df -h; systemctl status\n\nf) ssh-keygen -t rsa\n   ssh-copy-id usuario@192.168.1.100\n\ng) sftp usuario@192.168.1.100\n   put archivo.txt\n\nh) sudo nano /etc/ssh/sshd_config\n   PermitRootLogin no\n   sudo systemctl restart ssh",
  "si-eac3-c3a": "COMANDOS:\na) gcc programa.c -o programa\n   (o con Makefile: make)\n\nb) ./programa argumento\n\nc) Crear página man (programa.3):\n.TH PROGRAMA 3\n.SH NAME\nprograma - descripción\n.SH SYNOPSIS\n.B programa [opciones]\n.SH DESCRIPTION\nTexto descriptivo\n.SH AUTHOR\nPablo Machado\n\nd) groff -man -Tascii programa.3\ne) sudo cp programa.3 /usr/share/man/man3/\nf) sudo mandb\ng) man 3 programa",
  "si-eac3-c3b": "COMANDOS:\na) sudo apt install git\n\nb) git config --global user.name \"Pablo\"\n   git config --global user.email \"pablo@mail.com\"\n\nc) mkdir proyecto && cd proyecto\n   git init\n\nd) cp programa.c .\n   git add programa.c\n\ne) git commit -m \"Primer commit\"\n   git commit -m \"Segundo commit\"\n\nf) En otra máquina:\n   git clone ssh://user@IP:/home/user/proyecto",
};

// Apply SI EAC2 updates
si2.cards.forEach(c => {
  if (si2backs[c.id]) {
    c.back = si2backs[c.id];
    console.log("✅ SI2 " + c.id);
  } else {
    console.log("⚠️ SI2 " + c.id + " NOT FOUND");
  }
});

// Apply SI EAC3 updates
si3.cards.forEach(c => {
  if (si3backs[c.id]) {
    c.back = si3backs[c.id];
    console.log("✅ SI3 " + c.id);
  } else {
    console.log("⚠️ SI3 " + c.id + " NOT FOUND");
  }
});

fs.writeFileSync(dir + "/si-eac2.json", JSON.stringify(si2, null, 2));
fs.writeFileSync(dir + "/si-eac3.json", JSON.stringify(si3, null, 2));
console.log("✅ Archivos guardados");
