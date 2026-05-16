const fs = require('fs');

// ========== SI EAC1 ==========
const siEac1 = {
  "id": "examen-si-eac1",
  "name": "SI - EAC1 (Sistemes Informàtics)",
  "description": "Preguntes exactes de l'EAC1 de Sistemes Informàtics - U1: Avaluació, instal·lació i planificació del sistema informàtic",
  "subject": "Sistemes Informàtics",
  "cards": [
    {
      "id": "si-eac1-a1a",
      "front": "Identifiqueu en la imatge de connectors externs d'una placa base, cadascun dels elements: A, B, C, D, E, F, G, H, I",
      "back": "A: Puerto PS/2 para teclado\nB: Puerto PS/2 para ratón\nC: Salida de audio digital óptica S/PDIF (TOSLINK)\nD: Puertos USB\nE: Conectores de audio analógico de 3,5 mm\nF: Puerto de red Ethernet RJ-45\nG: Puerto eSATA\nH: Puerto IEEE 1394 / FireWire\nI: Salida de audio digital coaxial S/PDIF",
      "tags": ["si", "eac1", "hardware", "placa-base"]
    },
    {
      "id": "si-eac1-a2a",
      "front": "Un equip informàtic comença a funcionar amb molta lentitud després d'instal·lar diverses aplicacions noves. Com analitzaríeu la situació per determinar si el problema és de programari, de manca de recursos o d'un possible error de configuració? Descriviu un protocol d'anàlisi pas a pas i proposeu mesures preventives.",
      "back": "1. Comparar el estado actual con el anterior: desde cuándo empezó la lentitud, qué programas se instalaron y si el problema aparece siempre o solo en ciertas tareas.\n2. Revisar consumo de CPU, RAM, disco y red con el administrador de tareas.\n3. Comprobar programas que arrancan con el sistema y servicios en segundo plano.\n4. Revisar espacio libre en disco, errores del sistema, actualizaciones pendientes y conflictos de controladores.\n5. Arrancar en modo seguro o inicio limpio para aislar el problema.\n\nMedidas preventivas: instalar solo software necesario, mantener actualizado el sistema, controlar arranque automático, dejar espacio libre en disco, crear puntos de restauración antes de cambios importantes.",
      "tags": ["si", "eac1", "rendimiento", "diagnostico"]
    },
    {
      "id": "si-eac1-a2b",
      "front": "Expliqueu per què un disc SSD millora el rendiment general del sistema respecte d'un disc dur mecànic (HDD). Compareu el funcionament intern de tots dos dispositius i descriviu una situació real en què la diferència de velocitat sigui especialment rellevant.",
      "back": "Un HDD guarda datos en platos magnéticos que giran y usa un cabezal mecánico para leer y escribir. Por eso tiene más latencia y tarda más en acceder a archivos pequeños o dispersos.\nUn SSD usa memoria flash NAND, no tiene partes móviles, el acceso es mucho más rápido, silencioso y estable.\n\nLa mejora se nota sobre todo al arrancar el sistema operativo, abrir programas, cargar máquinas virtuales, compilar proyectos o trabajar con muchos archivos pequeños. Un caso real: el arranque del sistema en un SSD tarda segundos, mientras que con un HDD es bastante más lento.",
      "tags": ["si", "eac1", "ssd", "hdd", "almacenamiento"]
    },
    {
      "id": "si-eac1-a3a",
      "front": "Situació 1: Instal·lació de sistema operatiu i errors d'arrencada. Una empresa intenta instal·lar Windows i Linux en un mateix equip modern amb disc NVMe de 2TB. Després de la instal·lació, el sistema no mostra menú d'arrencada i només inicia un dels sistemes. La placa base està configurada en mode Legacy (BIOS) i el disc utilitza esquema MBR.\n\na) Expliqueu per què aquesta configuració pot generar limitacions en equips actuals.\nb) Quines diferències hi ha entre BIOS/MBR i UEFI/GPT?\nc) Quin seria el procediment recomanat per configurar correctament un entorn dual-boot modern?",
      "back": "a) MBR tiene límite de 2TB y máximo 4 particiones primarias. NVMe necesita controladores UEFI, y Legacy no los soporta correctamente.\n\nb) BIOS/MBR: sistema heredado, límite 2TB, 4 particiones primarias, arranque en modo 16 bits.\nUEFI/GPT: sistema moderno, admite discos grandes, más particiones, mejor integración con NVMe y arranque dual más limpio mediante partición EFI.\n\nc) Procedimiento:\n1. Hacer copia de seguridad.\n2. Configurar placa en modo UEFI, desactivar Legacy/CSM.\n3. Inicializar disco en GPT.\n4. Instalar primero Windows en modo UEFI.\n5. Instalar Linux en modo UEFI, reutilizando partición EFI.\n6. Verificar gestor de arranque, desactivar inicio rápido en Windows si causa problemas.",
      "tags": ["si", "eac1", "bios", "uefi", "mbr", "gpt", "dual-boot"]
    },
    {
      "id": "si-eac1-a3b",
      "front": "Situació 2: Control del rendiment en renderització 3D. Un usuari amb un equip gaming d'alt rendiment (CPU de 125W i GPU de 350W) experimenta reinicis sobtats durant sessions de renderització i joc intensiu. Configuració: font d'alimentació de 550W (80 Plus Bronze), refrigeració per aire estàndard, caixa compacta amb poc flux d'aire.\n\na) Analitzeu si el problema pot estar relacionat amb la PSU o amb la refrigeració.\nb) Què és el thermal throttling i com afecta el rendiment?\nc) Quins criteris tècnics caldria aplicar per dimensionar correctament la font d'alimentació i el sistema de refrigeració?",
      "back": "a) La fuente de 550W es insuficiente: solo CPU (125W) + GPU (350W) suman ~475W sin contar placa, discos y picos. Además, caja compacta con poco flujo y refrigeración estándar favorecen sobretemperaturas.\n\nb) Thermal throttling: reducción automática de frecuencia cuando CPU/GPU alcanzan altas temperaturas. Protege el hardware pero baja el rendimiento de forma visible.\n\nc) Criterios:\n- Calcular consumo total y dejar margen del 20-30%.\n- PSU de calidad: en este caso 750-850W.\n- Caja con buen flujo de aire.\n- Refrigeración adecuada (mejor aire o líquida según carga).\n- Monitorizar temperaturas con software.",
      "tags": ["si", "eac1", "psu", "refrigeracion", "rendimiento"]
    },
    {
      "id": "si-eac1-a3c",
      "front": "Situació 3: Memòria SRAM o DRAM en servidors. Un tècnic de sistemes ha de triar entre SRAM i DRAM per configurar la memòria principal d'un servidor d'alta disponibilitat.\n\na) Quines són les principals avantatges i inconvenients de cada tipus?\nb) Com influeix la freqüència de refresc en el rendiment i estabilitat del sistema?\nc) Quins altres components hauria d'avaluar el tècnic per assegurar el millor rendiment possible?",
      "back": "a) SRAM: más rápida, no necesita refresco, pero muy cara y poca capacidad (se usa como caché). DRAM: más capacidad y menor coste/GB, adecuada como memoria principal, pero necesita refresco periódico y tiene más latencia.\n\nb) La frecuencia de refresco introduce cierta sobrecarga de gestión controlada por hardware. Si la memoria o el controlador no trabajan de forma estable, pueden aparecer errores o pérdida de rendimiento.\n\nc) Además: memoria ECC, número de canales, controlador de memoria, CPU, cachés, almacenamiento, ancho de banda del bus y equilibrio general del sistema.",
      "tags": ["si", "eac1", "sram", "dram", "memoria", "servidor"]
    },
    {
      "id": "si-eac1-a3d",
      "front": "Situació 4: Coll d'ampolla en la interconnexió del sistema. Un tècnic munta un ordinador amb: GPU PCIe 5.0 x16, SSD NVMe PCIe 5.0 (M.2), Segon SSD NVMe PCIe 4.0, Targeta de xarxa 10 GbE, Diversos dispositius USB4. Quan es transfereixen dades simultàniament des de l'SSD secundari mentre es fa còpia per USB4 i transferència per xarxa, el rendiment cau dràsticament.\n\na) Expliqueu què pot estar passant a nivell d'arquitectura CPU–xipset (PCH).\nb) Què significa que alguns dispositius comparteixin carrils PCIe?\nc) Com es podria optimitzar la configuració per reduir el coll d'ampolla?",
      "back": "a) Varios dispositivos de alto ancho de banda cuelgan del chipset (PCH) y comparten el enlace hacia la CPU. Cuando coinciden transferencias del SSD secundario, USB4 y la tarjeta de red, ese enlace puede saturarse.\n\nb) Significa que no todos tienen líneas exclusivas; algunos puertos o ranuras se reparten el ancho de banda disponible.\n\nc) Optimización:\n- Conectar GPU y SSD principal a carriles directos de CPU.\n- Revisar en el manual de placa qué puertos comparten líneas.\n- Evitar poner varios dispositivos críticos en ranuras dependientes del PCH.\n- Usar placa con más carriles o plataforma superior.\n- Repartir mejor los dispositivos y evitar transferencias simultáneas extremas.",
      "tags": ["si", "eac1", "pcie", "pch", "cuello-botella"]
    },
    {
      "id": "si-eac1-a4a",
      "front": "Observeu el diagrama de xarxa proporcionat.\na) Identifiqueu quins dispositius corresponen a router, switch i equips finals. Expliqueu la funció de cada un dins la xarxa.",
      "back": "Router: dispositivo central que conecta redes distintas y enruta el tráfico hacia Internet u otros segmentos.\nSwitch: conecta varios equipos dentro de la red local cableada.\nEquipos finales: hosts que usan u ofrecen servicios (servidores, estaciones de trabajo, portátiles, móviles).\n\nAdemás pueden aparecer módem y punto de acceso inalámbrico como elementos de interconexión.",
      "tags": ["si", "eac1", "red", "router", "switch"]
    },
    {
      "id": "si-eac1-a4b",
      "front": "Observeu el diagrama de xarxa proporcionat.\nb) Quin tipus de topologia representa el diagrama? Justifiqueu la resposta segons la definició de topologia.",
      "back": "La parte cableada local está organizada alrededor del switch (punto central). El router conecta varios segmentos adicionales (switch, tramo inalámbrico, otros equipos). Por eso no es una estrella simple, sino una estrella extendida o jerárquica.",
      "tags": ["si", "eac1", "red", "topologia"]
    },
    {
      "id": "si-eac1-a5",
      "front": "Observeu la imatge, i analitzeu les mesures, dimensions i distàncies clau per garantir una postura corporal correcta en l'entorn laboral. Identifiqueu els elements que poden representar riscos ergonòmics i com es podrien corregir.",
      "back": "Análisis ergonómico:\n1. Pantalla: frente al usuario, 50-70 cm, borde superior a la altura de los ojos.\n2. Espalda y cuello: recta y apoyada, cuello sin inclinar.\n3. Brazos y muñecas: codos ~90°, muñecas en posición neutra.\n4. Silla: respaldo con apoyo lumbar regulable.\n5. Ratón y teclado: cerca del cuerpo, misma altura.\n6. Rodillas: ángulo ~90°, espacio libre bajo mesa.\n7. Pies: apoyados completamente.\n\nRiesgos: fatiga cervical, sobrecarga hombros/muñecas, riesgo lumbar, riesgo circulatorio.",
      "tags": ["si", "eac1", "ergonomia", "prevencion"]
    },
    {
      "id": "si-eac1-b1",
      "front": "Expliqueu la funció del kernel, la interfície d'usuari, el sistema de fitxers, la multitasca, la memòria virtual, els controladors, les actualitzacions, l'administració de processos i els contenidors virtuals dins d'un sistema operatiu.",
      "back": "Kernel: cerebro del SO, orquesta la comunicación entre hardware y software.\nInterfície d'usuari: entorno gráfico o línea de comandos para dirigir el sistema.\nSistema de fitxers: organización, almacenamiento y acceso a archivos.\nMultitasca: varias aplicaciones funcionan simultáneamente.\nMemoria virtual: amplía capacidad gestionando información entre RAM y disco.\nControladores: esenciales para que el sistema reconozca y controle periféricos.\nActualizaciones: mantienen el sistema al día.\nAdministración de procesos: monitorizar, suspender y reactivar procesos.\nContenedores virtuales: comparten el mismo núcleo y usan recursos más eficientemente.",
      "tags": ["si", "eac1", "so", "kernel"]
    },
    {
      "id": "si-eac1-b2a",
      "front": "A l'hora d'instal·lar un sistema operatiu, hi ha opcions com instal·lació neta, actualització o arrencada dual (dual boot). Expliqueu en quin cas triaries cadascuna d'aquestes opcions i per què.",
      "back": "Instalación limpia: cuando quiero empezar desde cero, eliminar errores previos, cambiar de disco o dejar el sistema estable sin basura acumulada.\nActualización: cuando quiero conservar programas, configuración y datos, y el sistema actual funciona razonablemente bien.\nArranque dual: cuando necesito dos SO en el mismo equipo (ej: Windows para software concreto y Linux para desarrollo).",
      "tags": ["si", "eac1", "instalacion", "so"]
    },
    {
      "id": "si-eac1-b2b",
      "front": "Quina és la diferència principal entre una màquina virtual i un contenidor? Expliqueu-ho amb les teves paraules.",
      "back": "Una máquina virtual emula un ordenador completo con su propio SO invitado. Consume más recursos pero está más aislada.\nUn contenedor no virtualiza todo el hardware ni arranca un SO completo; comparte el núcleo del anfitrión. Es más ligero y rápido de desplegar, aunque el aislamiento es menor.",
      "tags": ["si", "eac1", "vm", "contenedor", "virtualizacion"]
    },
    {
      "id": "si-eac1-b8a",
      "front": "Quins són els motius principals per als quals s'hauria d'actualitzar contínuament el sistema operatiu?",
      "back": "Los motivos principales son mejorar la seguridad, corregir errores y aumentar la estabilidad del sistema. Las actualizaciones solucionan vulnerabilidades, corrigen fallos de funcionamiento, mejoran la compatibilidad con nuevo hardware, controladores y aplicaciones, y en algunos casos incorporan nuevas funciones o mejoras de rendimiento.",
      "tags": ["si", "eac1", "actualizaciones", "seguridad"]
    },
    {
      "id": "si-eac1-b8b",
      "front": "En què es diferencien el procés d'actualitzar la llista de repositoris i el de baixar i instal·lar les actualitzacions dels paquets?",
      "back": "Actualizar la lista de repositorios (apt update): renovar la información sobre qué versiones de paquetes están disponibles. No instala nada, solo actualiza el índice.\nBajar e instalar actualizaciones (apt upgrade): instalar las versiones más recientes de los programas ya instalados. Esto sí modifica el sistema porque descarga e instala las actualizaciones disponibles.",
      "tags": ["si", "eac1", "apt", "actualizaciones", "linux"]
    }
  ]
};

// ========== SI EAC2 ==========
const siEac2 = {
  "id": "examen-si-eac2",
  "name": "SI - EAC2 (Sistemes Informàtics)",
  "description": "Preguntes exactes de l'EAC2 de Sistemes Informàtics - U2: Gestió de la informació i del sistema operatiu",
  "subject": "Sistemes Informàtics",
  "cards": [
    {
      "id": "si-eac2-act1",
      "front": "Particionament d'un disc amb esquema MBR. Afegiu dos discs virtuals nous de 10 GB cadascun. Sobre el primer disc, creeu una taula de particions de tipus MBR i utilitzeu fdisk per crear cinc particions de 2 GB cadascuna.\n\na) Indiqueu quin tipus de particions heu utilitzat (primàries, estesa o lògiques) i expliqueu per què ha estat necessari utilitzar aquests tipus de partició.\nb) Descriviu les limitacions principals del sistema de particionament MBR.\nc) Utilitzeu lsblk per identificar el disc i totes les particions creades, mostrant la seva mida i estructura.",
      "back": "a) Se han usado 3 particiones primarias (MBR permite máximo 4 primarias). Para la quinta partición, fue necesario crear una partición extendida que actúa como contenedor, y dentro de ella crear 2 particiones lógicas. Esto permite superar el límite de 4 particiones primarias de MBR.\n\nb) Limitaciones principales de MBR:\n- Máximo 4 particiones primarias\n- Discos de hasta 2 TB\n- Tabla de particiones en el primer sector (MBR)\n- Sin protección contra corrupción del MBR\n\nc) lsblk muestra el disco y todas las particiones con su tamaño y estructura.",
      "tags": ["si", "eac2", "mbr", "particiones", "fdisk"]
    },
    {
      "id": "si-eac2-act2",
      "front": "Particionament d'un disc amb esquema GPT. Utilitzant el segon disc de 10 GB, creeu una taula de particions utilitzant l'esquema GPT amb l'eina gdisk. Genereu cinc particions de 2 GB cadascuna. Verifiqueu amb lsblk.",
      "back": "GPT (GUID Partition Table):\n- Permite hasta 128 particiones primarias\n- Soporta discos de más de 2 TB\n- Almacena tablas de particiones redundantes (protección)\n- Usa UUID para identificar particiones\n- No tiene el límite de 4 primarias como MBR\n\ngdisk permite crear las 5 particiones directamente como primarias sin necesidad de extendida/lógicas.\nVerificación con lsblk.",
      "tags": ["si", "eac2", "gpt", "particiones", "gdisk"]
    },
    {
      "id": "si-eac2-act3",
      "front": "Modificació de particions amb eina gràfica GParted. Utilitzeu GParted per gestionar el disc particionat amb GPT. Identifiqueu les dues últimes particions creades i fusioneu-les en una sola. Descriviu el procediment i indiqueu la mida final de la nova partició resultant.",
      "back": "Procediment en GParted:\n1. Seleccionar el disc GPT\n2. Identificar las dos últimas particiones\n3. Seleccionar la primera de las dos y hacer clic en \"Redimensionar/Mover\"\n4. Ampliar el tamaño para incluir el espacio de la segunda partición\n5. Eliminar la segunda partición (los datos se pierden)\n6. Aplicar las operaciones\n\nMida final: 4 GB (suma de las dos particiones de 2 GB)",
      "tags": ["si", "eac2", "gparted", "particiones"]
    },
    {
      "id": "si-eac2-act4",
      "front": "Format, muntatge i configuració de particions. Sobre el disc particionat amb MBR:\na) Formateu la primera partició amb ext4. Creeu /mnt/ioc/ext4 i munteu-la amb permisos de lectura i escriptura.\nb) Formateu la segona partició amb NTFS. Creeu /mnt/ioc/ntfs i munteu-la en mode només lectura.\nc) Configureu la tercera partició com a swap. Activeu-la amb prioritat.\nd) Configureu el sistema perquè la partició 4a es munti automàticament durant l'arrencada.",
      "back": "a) mkfs.ext4 /dev/nvme1n1p1\nmkdir -p /mnt/ioc/ext4\nmount /dev/nvme1n1p1 /mnt/ioc/ext4\n\nb) mkfs.ntfs /dev/nvme1n1p2\nmkdir -p /mnt/ioc/ntfs\nmount -o ro /dev/nvme1n1p2 /mnt/ioc/ntfs\n\nc) mkswap /dev/nvme1n1p3\nswapon -p 100 /dev/nvme1n1p3\n\nEl muntatge automàtic es configura a /etc/fstab:\n/dev/nvme1n1p1 /mnt/ioc/ext4 ext4 defaults 0 2",
      "tags": ["si", "eac2", "ext4", "ntfs", "swap", "fstab"]
    },
    {
      "id": "si-eac2-act5",
      "front": "Creació d'un volum lògic amb LVM. Afegiu dos discs virtuals nous de 2 GB cadascun. Utilitzant LVM, convertiu-los en volums físics, creeu un grup de volums (amb el vostre nom) i creeu un volum lògic de 4 GB. Expliqueu les etapes principals.",
      "back": "Etapes:\n1. Crear volúmenes físicos (PV): pvcreate /dev/sdb /dev/sdc\n2. Crear grupo de volúmenes (VG): vgcreate Nombre_Apellido /dev/sdb /dev/sdc\n3. Crear volumen lógico (LV): lvcreate -L 4G -n datos Nombre_Apellido\n4. Formatear: mkfs.ext4 /dev/Nombre_Apellido/datos\n5. Montar: mount /dev/Nombre_Apellido/datos /mnt\n\nVerificación: pvs, vgs, lvs, lsblk",
      "tags": ["si", "eac2", "lvm", "volumen-logico"]
    },
    {
      "id": "si-eac2-act6",
      "front": "Instal·lació de programari i localització d'executables.\na) Instal·leu gedit amb el gestor de paquets.\nb) Utilitzeu una comanda per localitzar l'executable del programa.\nc) Indiqueu si esperàveu trobar l'executable en aquesta ubicació segons l'estructura estàndard de Linux.\nd) Creeu un fitxer de text amb el nom del vostre DNI i deseu-lo al directori personal.\ne) Localitzeu aquest fitxer amb find.",
      "back": "a) sudo apt install gedit\nb) which gedit → /usr/bin/gedit\nc) Sí, porque /usr/bin es el directorio estándar para ejecutables del sistema en Linux (FHS).\nd) echo \"contenido\" > ~/12345678X.txt\ne) find ~ -name \"12345678X.txt\"",
      "tags": ["si", "eac2", "apt", "which", "find", "linux"]
    },
    {
      "id": "si-eac2-act7",
      "front": "Gestió de discs en Windows 11. Afegiu un disc virtual nou de 2 GB. Utilitzeu l'eina de gestió de discs per inicialitzar el disc i crear-hi una partició que ocupi tot l'espai. Formateu amb NTFS i assigneu una lletra d'unitat.",
      "back": "1. Abrir Administración de discos (diskmgmt.msc)\n2. Inicializar el disco (MBR o GPT)\n3. Crear un volumen simple que ocupe todo el espacio\n4. Formatear con NTFS\n5. Asignar letra de unidad (ej: E:)\n\nVerificación: el disco aparece en el Explorador de archivos con la letra asignada.",
      "tags": ["si", "eac2", "windows", "discos", "ntfs"]
    },
    {
      "id": "si-eac2-act8",
      "front": "Configuració d'una còpia de seguretat programada. Configureu un sistema de còpia de seguretat programada utilitzant un dels sistemes operatius disponibles. Expliqueu l'eina seleccionada, per què és adequada, i configureu la còpia perquè s'executi automàticament segons una planificació.",
      "back": "Eina: rsync + cron (a Ubuntu)\nPer què rsync: eficiente, solo copia cambios incrementales, soporta compresión y SSH.\n\nConfiguración:\n1. Crear script de backup: rsync -avh /origen/ /destino/\n2. Programar con crontab:\n   crontab -e\n   0 2 * * * /ruta/script-backup.sh  # cada día a las 2:00\n\nVerificación: comprobar que el archivo se ha copiado correctamente.",
      "tags": ["si", "eac2", "backup", "rsync", "cron"]
    },
    {
      "id": "si-eac2-act9",
      "front": "Gestió d'usuaris i permisos a Ubuntu:\na) Creeu els grups biblioteca i treballador.\nb) Creeu un usuari amb el vostre primer cognom, amb biblioteca com a grup principal i treballador com a secundari.\nc) Configureu contrasenyes amb longitud mínima de 8 caràcters.\nd) Assigneu contrasenya.\ne) Creeu un document de text amb la data actual generada per comanda.\nf) Configureu el fitxer perquè sigui propietat de l'usuari creat i amb permisos totals per al propietari i cap permís per a la resta.",
      "back": "a) sudo groupadd biblioteca\n   sudo groupadd treballador\n\nb) sudo useradd -g biblioteca -G treballador -m cognom\n\nc) Editar /etc/pam.d/common-password: minlen=8\n\nd) sudo passwd cognom\n\ne) date > ~/data.txt\n\nf) sudo chown cognom:cognom data.txt\n   chmod 700 data.txt  # rwx------",
      "tags": ["si", "eac2", "usuarios", "grupos", "permisos", "linux"]
    },
    {
      "id": "si-eac2-act10",
      "front": "Configuració de xarxa amb Netplan a Ubuntu. Configureu la xarxa de la màquina amb Ubuntu usant Netplan. Definiu una configuració amb connectivitat a la xarxa. Verifiqueu que s'ha aplicat correctament.",
      "back": "Configuració Netplan (/etc/netplan/00-installer-config.yaml):\nnetwork:\n  ethernets:\n    eth0:\n      addresses:\n        - 192.168.1.100/24\n      routes:\n        - to: default\n          via: 192.168.1.1\n      nameservers:\n        addresses: [8.8.8.8, 1.1.1.1]\n  version: 2\n\nAplicar: sudo netplan apply\nVerificar: ip a, ping 8.8.8.8",
      "tags": ["si", "eac2", "netplan", "red", "linux"]
    },
    {
      "id": "si-eac2-act11",
      "front": "Instal·lació i gestió d'un servidor FTP (vsftpd).\na) Instal·leu vsftpd, inicieu el servei i verifiqueu.\nb) Connecteu-vos per FTP des de la màquina física.\nc) Quin PID té el procés del servei?\nd) Com es pot reiniciar el servei?\ne) Quin és el fitxer principal de configuració?",
      "back": "a) sudo apt install vsftpd\n   sudo systemctl start vsftpd\n   sudo systemctl status vsftpd\n\nb) ftp <IP_maquina_virtual>\n\nc) PID: ver con ps aux | grep vsftpd o systemctl status vsftpd\n   Ejemplo: 12706\n\nd) sudo systemctl restart vsftpd\n\ne) /etc/vsftpd.conf",
      "tags": ["si", "eac2", "ftp", "vsftpd", "servidor"]
    },
    {
      "id": "si-eac2-act12",
      "front": "Anàlisi de trànsit de xarxa amb Wireshark a Ubuntu. Instal·leu Wireshark i inicieu una captura. Mentre la captura està activa, feu una connexió FTP. Analitzeu els paquets capturats i identifiqueu les credencials utilitzades durant l'autenticació.",
      "back": "1. Instalar: sudo apt install wireshark\n2. Iniciar captura en la interfaz de red\n3. Hacer conexión FTP\n4. En Wireshark, filtrar por \"ftp\"\n5. Buscar paquetes con \"Request: USER\" (usuario) y \"Request: PASS\" (contraseña)\n6. FTP envía las credenciales en texto plano, visible en la captura.",
      "tags": ["si", "eac2", "wireshark", "ftp", "seguridad"]
    },
    {
      "id": "si-eac2-act13",
      "front": "Anàlisi de registres del sistema. Accediu a /var/log/syslog i localitzeu les entrades del reinici del servei FTP.\na) Quin component és responsable de generar i escriure aquest fitxer?\nb) Quin mecanisme gestiona la rotació dels fitxers de log?\nc) En quines circumstàncies es produeix la rotació? És la mateixa per tots els serveis?",
      "back": "a) rsyslog: servicio de registro del sistema. Recoge mensajes de kernel, servicios y aplicaciones y los escribe en /var/log/syslog.\n\nb) logrotate: herramienta que gestiona la rotación de logs.\n- Configuración principal: /etc/logrotate.conf\n- Configuraciones por servicio: /etc/logrotate.d/\n\nc) Periodicidad por defecto: weekly (semanal), rotate 4, delaycompress.\nNO es la misma para todos los servicios. Cada servicio puede tener su propia configuración en /etc/logrotate.d/ (daily, monthly, size, etc.).\n\nEjemplo rsyslog:\n/var/log/syslog {\n  rotate 4\n  weekly\n  missingok\n  notifempty\n  compress\n  delaycompress\n  sharedscripts\n}",
      "tags": ["si", "eac2", "syslog", "logrotate", "linux"]
    },
    {
      "id": "si-eac2-act14",
      "front": "Configuració de polítiques de seguretat a Windows 11:\na) Configureu contrasenyes amb requisits de complexitat.\nb) Restringiu inici de sessió a horari laboral.\nc) Bloqueig de compte després de 3 intents fallits.\nExpliqueu on es configuren i verifiqueu.",
      "back": "Se configura en Polítiques de Seguretat Locals (secpol.msc):\n\na) Directivas de cuenta → Directiva de contraseñas:\n- La contraseña debe cumplir requisitos de complejidad: Habilitada\n\nb) Directivas locales → Asignación de derechos de usuario → Permitir inicio de sesión local (o usar Horas de inicio de sesión en Usuarios y grupos locales)\n\nc) Directivas de cuenta → Directiva de bloqueo de cuenta:\n- Duración del bloqueo: 30 min\n- Umbral de bloqueo: 3 intentos fallidos\n- Restablecer contador: 30 min",
      "tags": ["si", "eac2", "seguridad", "windows", "politicas"]
    },
    {
      "id": "si-eac2-act15",
      "front": "Verificació de polítiques i registre d'esdeveniments a Windows 11. Creeu un usuari nou, assigneu contrasenya. Intenteu iniciar sessió amb contrasenya incorrecta. Obriu el Windows Event Viewer i localitzeu l'esdeveniment registrat de l'intent fallit.",
      "back": "1. Crear usuario en Administración de equipos\n2. Asignar contraseña\n3. Intentar inicio de sesión con contraseña incorrecta\n4. Abrir Visor de eventos (eventvwr.msc)\n5. Ir a Registros de Windows → Seguridad\n6. Buscar Event ID 4625 (inicio de sesión fallido)\n\nEl evento ID 4625 muestra: nombre de usuario, hora del intento y dirección IP.",
      "tags": ["si", "eac2", "event-viewer", "windows", "seguridad"]
    }
  ]
};

// ========== SI EAC3 ==========
const siEac3 = {
  "id": "examen-si-eac3",
  "name": "SI - EAC3 (Sistemes Informàtics)",
  "description": "Preguntes exactes de l'EAC3 de Sistemes Informàtics - U3: Interconnexió i gestió de sistemes en xarxa",
  "subject": "Sistemes Informàtics",
  "cards": [
    {
      "id": "si-eac3-a1",
      "front": "Configuració de la xarxa amb Ubuntu usant la comanda ip (temporal):\na) Assigna una IP estàtica.\nb) Configura la màscara de xarxa.\nc) Defineix la porta d'enllaç.\nd) Configura el servidor DNS.\ne) Comprova la connectivitat amb ping a través de ip i nom.\nf) Repetiu amb les eines de net-tools (ifconfig, route, etc.).",
      "back": "Amb ip (iproute2):\na) sudo ip addr add 192.168.1.100/24 dev eth0\nb) Ya incluida en la máscara /24\nc) sudo ip route add default via 192.168.1.1\nd) Editar /etc/resolv.conf: nameserver 8.8.8.8\ne) ping 8.8.8.8 / ping google.com\n\nAmb net-tools:\na) sudo ifconfig eth0 192.168.1.100 netmask 255.255.255.0\nb) sudo route add default gw 192.168.1.1\nc) Editar /etc/resolv.conf\nd) ping",
      "tags": ["si", "eac3", "red", "ip", "ifconfig"]
    },
    {
      "id": "si-eac3-a2",
      "front": "Configuració de la xarxa amb Windows de forma estàtica:\na) Assigna IP estàtica, màscara i porta d'enllaç.\nb) Configura servidor DNS.\nc) Comprova la connectivitat.\nd) Mostreu una comanda per consultar la configuració des de línia de comandes.",
      "back": "a) Configuració: Panell de control → Centre de xarxes → Canviar configuració → IPv4 → Propietats → Usar la siguiente dirección IP\n\nb) DNS: 8.8.8.8 / 1.1.1.1\n\nc) ping 8.8.8.8 / ping google.com\n\nd) ipconfig (mostra IP, màscara, porta d'enllaç)\n   ipconfig /all (informació completa incloent DNS)",
      "tags": ["si", "eac3", "windows", "red", "ipconfig"]
    },
    {
      "id": "si-eac3-a3",
      "front": "Anàlisis de ports amb nmap:\na) Instal·leu nmap.\nb) Executeu exploració bàsica sobre localhost i IP assignada.\nc) Identifiqueu ports oberts, filtrats i tancats.\nd) Exploreu el rang 19-100 i compareu amb l'exploració completa.\ne) Identifiqueu el servei de cada port detectat.\nf) Quina diferència hi ha entre TCP SYN i TCP Connect?\ng) Justifiqueu els riscos de seguretat d'exposar ports innecessaris.",
      "back": "a) sudo apt install nmap\n\nb) nmap localhost\n   nmap 192.168.1.100\n\nc) Puertos abiertos: responden (estado open)\n   Puertos filtrados: firewall bloquea (filtered)\n   Puertos cerrados: no hay servicio (closed)\n\nd) nmap -p 19-100 localhost (más rápido, solo rango específico)\n\nEjemplo: solo puerto 22 (SSH) abierto, resto cerrados. Diferencia: 17s completo vs 0.06s rango.\n\ne) Puerto 22: SSH\n\nf) TCP SYN (-sS): no completa el handshake, más rápido y sigiloso.\n   TCP Connect (-sT): establece conexión completa, más rastro, funciona sin root.\n\ng) Exponer puertos innecesarios amplía la superficie de ataque. Servicios como Telnet (23) o FTP (21) sin cifrar son vulnerabilidades críticas. Solo mantener lo estrictamente necesario.",
      "tags": ["si", "eac3", "nmap", "puertos", "seguridad"]
    },
    {
      "id": "si-eac3-a4",
      "front": "Anàlisi de ports en escolta amb netstat i servei FTP:\na) Mostreu ports TCP en escolta amb netstat.\nb) Mostreu ports UDP en escolta.\nc) Identifiqueu processos associats a cada port.\nd) Instal·leu i inicieu vsftpd.\ne) Verifiqueu que FTP escolta al port 21.\nf) Connecteu-vos per FTP a localhost.\ng) Executeu netstat i identifiqueu connexions establertes.\nh) Diferencieu entre LISTEN i ESTABLISHED.",
      "back": "a) sudo netstat -tln (TCP en escucha)\nb) sudo netstat -uln (UDP en escucha)\nc) sudo netstat -tlnp (con PID y nombre del proceso)\n\nd) sudo apt install vsftpd\n   sudo systemctl start vsftpd\n\ne) sudo netstat -tlnp | grep :21 (puerto 21 en LISTEN)\n\nf) ftp localhost (conectarse a sí mismo)\n\ng) netstat -tn | grep :21 (ver conexión ESTABLISHED)\n\nh) LISTEN: servicio esperando conexiones entrantes.\n   ESTABLISHED: conexión activa establecida entre cliente y servidor.",
      "tags": ["si", "eac3", "netstat", "ftp", "puertos"]
    },
    {
      "id": "si-eac3-a5",
      "front": "Adreces MAC i taula ARP:\na) Determineu l'adreça MAC de la màquina física.\nb) Determineu l'adreça MAC de la VM Ubuntu.\nc) Identifiqueu l'adreça MAC del router.\nd) Consulteu la correspondència IP-MAC amb arp.\ne) Per què només apareixen determinades entrades?\nf) Forceu comunicació amb el router i actualitzeu ARP.\ng) Diferència entre ARP dinàmic i ARP estàtic. Riscos d'ARP spoofing.",
      "back": "a) Windows: ipconfig /all | findstr \"Dirección física\"\n   Linux: ip link show\n\nb) Ubuntu VM: ip link show o ifconfig\n\nc) arp -a (Windows) / ip neigh (Linux) - buscar IP del router\n\nd) arp -a / ip neigh\n\ne) Solo aparecen dispositivos con los que se ha comunicado recientemente. La tabla ARP tiene tiempo de expiración.\n\nf) ping <IP_router> y luego arp -a / ip neigh (cambia de STALE a REACHABLE)\n\ng) ARP dinámico: aprendizaje automático.\n   ARP estático: entrada manual fija.\n   ARP spoofing: ataque donde se falsifica la MAC asociada a una IP para interceptar tráfico.",
      "tags": ["si", "eac3", "mac", "arp", "red"]
    },
    {
      "id": "si-eac3-b1",
      "front": "Instal·lació i configuració de Windows Server 2019 com a controlador de domini:\na) Descarregueu la ISO i reviseu requisits.\nb) Creeu VM i instal·leu Windows Server 2019.\nc) Configureu nom del servidor i IP fixa.\nd) Promocioneu a Controlador de Domini creant un bosc amb domini eac3.<teu_ioc_user>.home.",
      "back": "a) Requisits: 2 GB RAM, 32 GB disc, CPU 1.4 GHz, connexió a Internet.\n\nb) VM amb 2 GB RAM mínim, disc dinàmic 40 GB.\n\nc) Nom del servidor: SRV-DC\n   IP fixa: 192.168.1.10/24\n\nd) Server Manager → Agregar roles → Active Directory Domain Services\n   Promocionar a controlador de dominio:\n   - Agregar un nuevo bosque\n   - Nombre: eac3.pmachado.home\n   - Establecer contraseña DSRM\n\nVerificación: dcdiag, netdom query fsmo.",
      "tags": ["si", "eac3", "windows-server", "active-directory"]
    },
    {
      "id": "si-eac3-b2",
      "front": "Configuració del servei DNS al controlador de domini:\na) Verifiqueu que s'ha creat la zona directa del domini.\nb) Creeu la zona inversa.\nc) Creeu un registre A amb l'assistent gràfic.\nd) Creeu un registre PTR amb PowerShell.\ne) Creeu un registre CNAME anomenat www com a àlies.",
      "back": "a) DNS Manager → Zonas directas → eac3.pmachado.home (creada automàticamente)\n\nb) Zona inversa: DNS Manager → Zonas inversas → Nueva zona\n   ID de red: 192.168.1\n\nc) Registro A: botón derecho → Nuevo host (A)\n   Nombre: SRV-DC, IP: 192.168.1.10\n\nd) PowerShell:\n   Add-DnsServerResourceRecordPtr -Name 10 -ZoneName 1.168.192.in-addr.arpa -PtrDomainName SRV-DC.eac3.pmachado.home\n\ne) Registro CNAME:\n   Nombre: www, Destino: SRV-DC.eac3.pmachado.home",
      "tags": ["si", "eac3", "dns", "windows-server"]
    },
    {
      "id": "si-eac3-b3",
      "front": "Administració bàsica d'Active Directory:\na) Creeu dos grups de seguretat: bibliotecari i usuari.\nb) Creeu dos usuaris: Martí i Jana.\nc) Afegiu Martí a bibliotecari i Jana a usuari.\nd) Creeu un fitxer de text amb la data actual.\ne) Configureu permisos: Martí control total, Jana només lectura.",
      "back": "a) Active Directory Users and Computers (ADUC)\n   → New → Group: bibliotecari (Global Security)\n   → New → Group: usuari (Global Security)\n\nb) New → User: Martí, Jana\n\nc) Propietats de l'usuari → Member Of → Afegir grup\n\nd) Crear fitxer de text amb data: \"date > fitxer.txt\" o manualment\n\ne) Botó dret al fitxer → Propiedades → Seguridad:\n   - Martí: Control total\n   - Jana: Leer y ejecutar / Leer\n\nQuitar herencia si es necesario.",
      "tags": ["si", "eac3", "active-directory", "usuarios", "permisos"]
    },
    {
      "id": "si-eac3-b4",
      "front": "Integració d'una màquina Windows 11 al domini:\na) Configureu la xarxa amb IP compatible.\nb) Assigneu com a nom de màquina el vostre nom.\nc) Configureu DNS apuntant al Windows Server.\nd) Uniu la màquina al domini eac3.<teu_ioc_user>.home.\ne) Verifiqueu des d'Active Directory que apareix.",
      "back": "a) IP: 192.168.1.20/24, Puerta: 192.168.1.1\n\nb) Sistema → Cambiar nombre de este PC → Nombre: Pablo\n\nc) DNS: 192.168.1.10 (IP del servidor)\n\nd) Sistema → Cambiar nombre → Miembro de dominio:\n   eac3.pmachado.home\n   Credenciales: administrador del dominio\n\ne) ADUC → Computers → Debe aparecer la máquina Pablo",
      "tags": ["si", "eac3", "dominio", "windows-11", "dns"]
    },
    {
      "id": "si-eac3-b5",
      "front": "Compartició de recursos al servidor (SMB):\na) Creeu una carpeta anomenada documentacio.\nb) Compartiu-la per SMB.\nc) Bibliotecari: lectura i escriptura.\nd) Usuari: només lectura.\ne) Ajusteu permisos NTFS i de compartició.",
      "back": "a) Crear C:\\documentacio\n\nb) Botó dret → Compartir → Usuarios específicos\n   o: New-SmbShare -Name documentacio -Path C:\\documentacio\n\nc) Permisos de compartir:\n   - bibliotecari: Lectura/Escritura\n   \nd) - usuari: Lectura\n\ne) Permisos NTFS (Seguridad):\n   - bibliotecari: Modificar / Control total\n   - usuari: Leer y ejecutar\n\nRegla general: el permiso más restrictivo entre NTFS y Compartición es el efectivo.",
      "tags": ["si", "eac3", "smb", "compartir", "permisos"]
    },
    {
      "id": "si-eac3-b6",
      "front": "Compartició de recursos amb Samba a Ubuntu:\na) Instal·leu samba.\nb) Creeu carpeta imatges (pública).\nc) Creeu carpeta documents (lectura tots, només bibliotecari pot escriure).\nd) Creeu grup bibliotecari.\ne) Comproveu accés des de Windows.",
      "back": "a) sudo apt install samba\n\nb) /etc/samba/smb.conf:\n[imatges]\n  path = /srv/samba/imatges\n  public = yes\n  writable = yes\n  guest ok = yes\n\nc) [documents]\n  path = /srv/samba/documents\n  public = no\n  writable = no\n  valid users = @bibliotecari\n\nd) sudo groupadd bibliotecari\n   sudo usermod -aG bibliotecari usrname\n\ne) Verificar: sudo systemctl status smbd\n   Desde Windows: \\IP_UBUNTU\\imatges",
      "tags": ["si", "eac3", "samba", "linux", "compartir"]
    },
    {
      "id": "si-eac3-b7",
      "front": "Compartir una impressora al servidor i usar-la des de Windows 11. Instal·leu un servidor d'impressió i implementeu la impressora. Podeu usar Bullzip com a impressora virtual. L'objectiu és publicar-la i usar-la des del W11.",
      "back": "1. Instal·lar Bullzip PDF Printer (o impressora virtual similar) al servidor\n2. Configurar com a compartida: Dispositivos → Impresoras → Propiedades → Compartir\n3. Al Windows 11 client:\n   - Agregar impresora → Buscar en red\n   - O conectar a \\SERVIDOR\\nombre_impresora\n4. Imprimir un documento de prueba desde W11\n\nPermisos: pueden configurarse para impresión o administración según el usuario/grupo.",
      "tags": ["si", "eac3", "impresora", "compartir"]
    },
    {
      "id": "si-eac3-b8",
      "front": "Promoció d'Ubuntu a Controlador de Domini (Samba AD DC):\na) Instal·leu paquets de Samba.\nb) Configureu IP estàtica.\nc) Provisioneu el domini amb samba-tool.\nd) Configureu DNS integrat de Samba.\ne) Inicieu el servei i verifiqueu.\nf) Uniu client Windows al domini.\ng) Inicieu sessió amb usuari del domini.",
      "back": "a) sudo apt install samba krb5-user krb5-config winbind\n\nb) IP estàtica a /etc/netplan/ o /etc/network/interfaces\n\nc) sudo samba-tool domain provision --use-rfc2307 --domain=EAC3 --realm=eac3.pmachado.home --dns-backend=SAMBA_INTERNAL --adminpass=Contraseña123\n\nd) El DNS integrat es configura automàticament amb el provisionament.\n\ne) sudo systemctl start samba-ad-dc\n   sudo samba-tool domain level show\n\nf) Configurar DNS del client Windows a IP del Ubuntu Server\n   Unir al domini eac3.pmachado.home\n\ng) Iniciar sessió amb usuari del domini.",
      "tags": ["si", "eac3", "samba", "ad-dc", "dominio"]
    },
    {
      "id": "si-eac3-c1",
      "front": "Correu electrònic:\na) Instal·leu un client de correu (Thunderbird).\nb) Configureu un compte real (Gmail).\nc) Configureu IMAP/POP3.\nd) Configureu SMTP autenticat.\ne) Envieu un correu de prova.\nf) Verifiqueu la recepció.\ng) Quins ports usa IMAP/POP3 i SMTP?\nh) Diferència entre SSL/TLS i STARTTLS.",
      "back": "a) sudo apt install thunderbird\n\nb) Gmail: Habilitar acceso a apps menos seguras o usar contraseña de aplicación.\n\nc) IMAP: puerto 993 (SSL/TLS) o 143 (STARTTLS)\n   POP3: puerto 995 (SSL/TLS) o 110 (STARTTLS)\n\nd) SMTP: puerto 465 (SSL/TLS) o 587 (STARTTLS)\n\ne) Enviar correo de prueba\n\nf) Verificar recepción en el otro cuenta\n\ng) IMAP: 143/993 | POP3: 110/995 | SMTP: 25/465/587\n\nh) SSL/TLS: cifrado desde el inicio de la conexión.\n   STARTTLS: inicia en texto plano y negocia cifrado después.",
      "tags": ["si", "eac3", "correo", "imap", "smtp", "ssl"]
    },
    {
      "id": "si-eac3-c2",
      "front": "Accés remot segur amb SSH i transferència SFTP:\na) Instal·leu OpenSSH a Ubuntu.\nb) Verifiqueu que està actiu al port 22.\nc) Instal·leu client SSH a Windows (PuTTY).\nd) Connecteu-vos remotament.\ne) Executeu comandes administratives bàsiques.\nf) Configureu autenticació per clau pública.\ng) Realitzeu transferència SFTP.\nh) Desactiveu l'accés SSH de root.",
      "back": "a) sudo apt install openssh-server\n\nb) sudo systemctl status ssh\n   sudo netstat -tlnp | grep :22\n\nc) PuTTY: Host=IP, Port=22, Connection type=SSH\n\nd) ssh usuari@192.168.1.100\n\ne) ls, who, df -h, systemctl status\n\nf) ssh-keygen -t rsa (cliente)\n   ssh-copy-id usuari@192.168.1.100\n\ng) sftp usuari@192.168.1.100\n   put fitxer.txt / destí\n\ng) sudo nano /etc/ssh/sshd_config\n   PermitRootLogin no\n   sudo systemctl restart ssh\n\nVerificar que root ya no puede conectarse.",
      "tags": ["si", "eac3", "ssh", "sftp", "seguridad"]
    },
    {
      "id": "si-eac3-c3a",
      "front": "Compilació d'un programa en C i empaquetament:\na) Compileu un programa C amb gcc.\nb) Executeu-lo amb un paràmetre de prova.\nc) Creeu una pàgina de manual en format roff.\nd) Incloeu: NAME, SYNOPSIS, DESCRIPTION, OPTIONS, FILES, AUTHOR.\ne) Visualitzeu-la amb groff.\nf) Instal·leu-la a /usr/share/man/man3/.\ng) Actualitzeu base de dades de manuals.\nh) Comproveu amb man.",
      "back": "a) gcc programa.c -o programa\n\no alternatiu amb Makefile:\nmake\n\nb) ./programa argument\n\nc) Fitxer .roff (ex: programa.3):\n.TH PROGRAMA 3\n.SH NAME\nprograma - descripció\n.SH SYNOPSIS\n.B programa\n[opcions]\n.SH DESCRIPTION\nDescripció completa\n.SH OPTIONS\n.B -h\nMostra ajuda\n.SH FILES\n/usr/bin/programa\n.SH AUTHOR\nPablo Machado\n\ne) groff -man -Tascii programa.3\n\nf) sudo cp programa.3 /usr/share/man/man3/\n\ng) sudo mandb\n\nh) man 3 programa",
      "tags": ["si", "eac3", "c", "gcc", "man-page"]
    },
    {
      "id": "si-eac3-c3b",
      "front": "Control de versions amb Git:\na) Instal·leu Git a Ubuntu.\nb) Configureu nom i correu globals.\nc) Creeu un repositori local.\nd) Afegiu el codi font de la compilació en C.\ne) Feu almenys dos commits.\nf) Cloneu el repositori des d'una altra màquina.",
      "back": "a) sudo apt install git\n\nb) git config --global user.name \"Pablo Machado\"\n   git config --global user.email \"pablo@example.com\"\n\nc) mkdir projecte && cd projecte\n   git init\n\nd) cp ../programa.c .\n   git add programa.c\n\ne) git commit -m \"Primer commit: programa en C\"\n   (modificar algo)\n   git commit -m \"Segon commit: millores\"\n\nf) En otra máquina:\n   git clone usuari@IP:/home/usuari/projecte",
      "tags": ["si", "eac3", "git", "version-control"]
    }
  ]
};

// Crear carpeta examenes
const dir = 'public/data/examenes';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Escribir archivos
fs.writeFileSync(`${dir}/si-eac1.json`, JSON.stringify(siEac1, null, 2));
fs.writeFileSync(`${dir}/si-eac2.json`, JSON.stringify(siEac2, null, 2));
fs.writeFileSync(`${dir}/si-eac3.json`, JSON.stringify(siEac3, null, 2));

console.log('=== FICHEROS CREADOS ===');
console.log(`${dir}/si-eac1.json - ${siEac1.cards.length} cartas`);
console.log(`${dir}/si-eac2.json - ${siEac2.cards.length} cartas`);
console.log(`${dir}/si-eac3.json - ${siEac3.cards.length} cartas`);
console.log(`Total: ${siEac1.cards.length + siEac2.cards.length + siEac3.cards.length} cartas`);
