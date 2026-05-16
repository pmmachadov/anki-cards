const fs = require("fs");
const dir = "public/data/examenes";

// ONLY direct string replacements, sorted by length DESC
// NO regex, NO word boundaries, NO generic patterns
// Each replacement CATALAN → SPANISH must be exact and complete
const dict = `
Identifiqueu en la imatge de connectors externs d'una placa base, cadascun dels elements: A, B, C, D, E, F, G, H, I → Identificad en la imagen de conectores externos de una placa base, cada uno de los elementos: A, B, C, D, E, F, G, H, I
Un equip informàtic comença a funcionar amb molta lentitud després d'instal·lar diverses aplicacions noves. Com analitzaríeu la situació per determinar si el problema és de programari, de manca de recursos o d'un possible error de configuració? Descriviu un protocol d'anàlisi pas a pas i proposeu mesures preventives. → Un equipo informático comienza a funcionar con mucha lentitud después de instalar diversas aplicaciones nuevas. Cómo analizaríais la situación para determinar si el problema es de software, de falta de recursos o de un posible error de configuración? Describid un protocolo de análisis paso a paso y proponed medidas preventivas.
Expliqueu per què un disc SSD millora el rendiment general del sistema respecte d'un disc dur mecànic (HDD). Compareu el funcionament intern de tots dos dispositius i descriviu una situació real en què la diferència de velocitat sigui especialment rellevant. → Explicad por qué un disco SSD mejora el rendimiento general del sistema respecto de un disco duro mecánico (HDD). Comparad el funcionamiento interno de ambos dispositivos y describid una situación real en que la diferencia de velocidad sea especialmente relevante.
Situació 1: Instal·lació de sistema operatiu i errors d'arrencada. Una empresa intenta instal·lar Windows i Linux en un mateix equip modern amb disc NVMe de 2TB. Després de la instal·lació, el sistema no mostra menú d'arrencada i només inicia un dels sistemes. La placa base està configurada en mode Legacy (BIOS) i el disc utilitza esquema MBR.\n\na) Expliqueu per què aquesta configuració pot generar limitacions en equips actuals.\nb) Quines diferències hi ha entre BIOS/MBR i UEFI/GPT?\nc) Quin seria el procediment recomanat per configurar correctament un entorn dual-boot modern? → Situación 1: Instalación de sistema operativo y errores de arranque. Una empresa intenta instalar Windows y Linux en un mismo equipo moderno con disco NVMe de 2TB. Después de la instalación, el sistema no muestra menú de arranque y solo inicia uno de los sistemas. La placa base está configurada en modo Legacy (BIOS) y el disco usa esquema MBR.\n\na) Explicad por qué esta configuración puede generar limitaciones en equipos actuales.\nb) Qué diferencias hay entre BIOS/MBR y UEFI/GPT?\nc) Cuál sería el procedimiento recomendado para configurar correctamente un entorno dual-boot moderno?
Situació 2: Control del rendiment en renderització 3D. Un usuari amb un equip gaming d'alt rendiment (CPU de 125W i GPU de 350W) experimenta reinicis sobtats durant sessions de renderització i joc intensiu. La configuració inclou: Font d'alimentació de 550W (80 Plus Bronze) Refrigeració per aire estàndard Caixa compacta amb poc flux d'aire → Situación 2: Control del rendimiento en renderización 3D. Un usuario con un equipo gaming de alto rendimiento (CPU de 125W y GPU de 350W) experimenta reinicios repentinos durante sesiones de renderización y juego intensivo. La configuración incluye: Fuente de alimentación de 550W (80 Plus Bronze) Refrigeración por aire estándar Caja compacta con poco flujo de aire
Situació 3: Memòria SRAM o DRAM en servidors. Un tècnic de sistemes ha de triar entre SRAM i DRAM per configurar la memòria principal d'un servidor d'alta disponibilitat. → Situación 3: Memoria SRAM o DRAM en servidores. Un técnico de sistemas debe elegir entre SRAM y DRAM para configurar la memoria principal de un servidor de alta disponibilidad.
Quines són les principals avantatges i inconvenients de cada tipus en aquest context? → Cuáles son las principales ventajas e inconvenientes de cada tipo en este contexto?
Com influeix la freqüència de refresc en el rendiment i estabilitat del sistema? → Cómo influye la frecuencia de refresco en el rendimiento y estabilidad del sistema?
Quins altres components hauria d'avaluar el tècnic per assegurar el millor rendiment possible? → Qué otros componentes debería evaluar el técnico para asegurar el mejor rendimiento posible?
Situació 4: Coll d'ampolla en la interconnexió del sistema. Un tècnic munta un ordinador amb: GPU PCIe 5.0 x16, SSD NVMe PCIe 5.0 (M.2), Segon SSD NVMe PCIe 4.0, Targeta de xarxa 10 GbE, Diversos dispositius USB4. Quan es transfereixen dades simultàniament des de l'SSD secundari mentre es fa còpia per USB4 i transferència per xarxa, el rendiment cau dràsticament. → Situación 4: Cuello de botella en la interconexión del sistema. Un técnico monta un ordenador con: GPU PCIe 5.0 x16, SSD NVMe PCIe 5.0 (M.2), Segundo SSD NVMe PCIe 4.0, Tarjeta de red 10 GbE, Varios dispositivos USB4. Cuando se transfieren datos simultáneamente desde el SSD secundario mientras se hace copia por USB4 y transferencia por red, el rendimiento cae drásticamente.
Expliqueu què pot estar passant a nivell d'arquitectura CPU–xipset (PCH). → Explicad qué puede estar pasando a nivel de arquitectura CPU–chipset (PCH).
Què significa que alguns dispositius comparteixin carrils PCIe? → Qué significa que algunos dispositivos compartan carriles PCIe?
Com es podria optimitzar la configuració per reduir el coll d'ampolla? → Cómo se podría optimizar la configuración para reducir el cuello de botella?
Expliqueu la funció del kernel, la interfície d'usuari, el sistema de fitxers, la multitasca, la memòria virtual, els controladors, les actualitzacions, l'administració de processos i els contenidors virtuals dins d'un sistema operatiu. → Explicad la función del kernel, la interfaz de usuario, el sistema de archivos, la multitarea, la memoria virtual, los controladores, las actualizaciones, la administración de procesos y los contenedores virtuales dentro de un sistema operativo.
Quina és la diferència principal entre una màquina virtual i un contenidor? Expliqueu-ho amb les teves paraules. → Cuál es la diferencia principal entre una máquina virtual y un contenedor? Explicadlo con vuestras palabras.
A l'hora d'instal·lar un sistema operatiu, hi ha opcions com instal·lació neta, actualització o arrencada dual (dual boot). Expliqueu en quin cas triaries cadascuna d'aquestes opcions i per què. → A la hora de instalar un sistema operativo, hay opciones como instalación limpia, actualización o arranque dual (dual boot). Explicad en qué caso elegiríais cada una de estas opciones y por qué.
Quins són els motius principals per als quals s'hauria d'actualitzar contínuament el sistema operatiu? → Cuáles son los motivos principales por los cuales se debería actualizar continuamente el sistema operativo?
En què es diferencien el procés d'actualitzar la llista de repositoris i el de baixar i instal·lar les actualitzacions dels paquets? → En qué se diferencian el proceso de actualizar la lista de repositorios y el de descargar e instalar las actualizaciones de los paquetes?
Particionament d'un disc amb esquema MBR. → Particionado de un disco con esquema MBR.
cinc particions de 2 GB cadascuna. Durant el procés, indiqueu quin tipus de particions heu utilitzat (primàries, estesa o lògiques) i expliqueu breument per què ha estat necessari utilitzar aquests tipus de partició. → cinco particiones de 2 GB cada una. Durante el proceso, indicad qué tipo de particiones habéis utilizado (primarias, extendida o lógicas) y explicad brevemente por qué ha sido necesario utilizar estos tipos de partición.
A continuació, descriviu les limitacions principals del sistema de particionament MBR. Finalment, utilitzeu la comanda lsblk per identificar el disc i totes les particions creades, mostrant la seva mida i estructura. → A continuación, describid las limitaciones principales del sistema de particionado MBR. Finalmente, utilizad el comando lsblk para identificar el disco y todas las particiones creadas, mostrando su tamaño y estructura.
Utilitzant el segon disc de 10 GB, creeu una taula de particions utilitzant l'esquema GPT amb l'eina gdisk. Genereu cinc particions de 2 GB cadascuna dins del disc. → Utilizando el segundo disco de 10 GB, cread una tabla de particiones utilizando el esquema GPT con la herramienta gdisk. Generad cinco particiones de 2 GB cada una dentro del disco.
Modificació de particions amb eina gràfica GParted. → Modificación de particiones con herramienta gráfica GParted.
Identifiqueu les dues últimes particions creades dins d'aquest disc. → Identificad las dos últimas particiones creadas dentro de este disco.
Realitzeu una operació que permeti fusionar aquestes dues particions en una sola, de manera que s'unifiqui l'espai disponible. Descriviu el procediment seguit dins de l'aplicació i indiqueu quina és la mida final de la nova partició resultant. → Realizad una operación que permita fusionar estas dos particiones en una sola, de manera que se unifique el espacio disponible. Describid el procedimiento seguido dentro de la aplicación e indicad cuál es el tamaño final de la nueva partición resultante.
Format, muntatge i configuració de particions. → Formateo, montaje y configuración de particiones.
Formateu la primera partició amb el sistema de fitxers ext4. Creeu el directori /mnt/ioc/ext4 i munteu-hi la partició amb permisos de lectura i escriptura. Verifiqueu que el muntatge és correcte. → Formatead la primera partición con el sistema de archivos ext4. Cread el directorio /mnt/ioc/ext4 y montad la partición con permisos de lectura y escritura. Verificad que el montaje es correcto.
Formateu la segona partició amb el sistema de fitxers NTFS. Creeu el directori /mnt/ioc/ntfs i munteu-hi la partició en mode només lectura. → Formatead la segunda partición con el sistema de archivos NTFS. Cread el directorio /mnt/ioc/ntfs y montad la partición en modo solo lectura.
Configureu la tercera partició com a àrea d'intercanvi (swap) del sistema. Activeu-la i configureu-la perquè tingui prioritat respecte a altres possibles àrees de swap. → Configurad la tercera partición como área de intercambio (swap) del sistema. Activadla y configuradla para que tenga prioridad respecto a otras posibles áreas de swap.
Configureu el sistema perquè la partició muntada a l'apartat 4a es munti automàticament durant l'arrencada del sistema. → Configurad el sistema para que la partición montada en el apartado 4a se monte automáticamente durante el arranque del sistema.
Creació d'un volum lògic amb LVM. → Creación de un volumen lógico con LVM.
Instal·lació i gestió d'un servidor FTP → Instalación y gestión de un servidor FTP
Configuració d'un sistema de còpia de seguretat programada → Configuración de un sistema de copia de seguridad programada
Configuració de la xarxa amb Ubuntu → Configuración de la red con Ubuntu
Configuració de xarxa amb Netplan a Ubuntu → Configuración de red con Netplan en Ubuntu
Gestió d'usuaris i permisos a Ubuntu → Gestión de usuarios y permisos en Ubuntu
Gestió de discs en Windows 11 → Gestión de discos en Windows 11
Anàlisi de trànsit de xarxa amb Wireshark → Análisis de tráfico de red con Wireshark
Anàlisi de registres del sistema → Análisis de registros del sistema
Configuració de polítiques de seguretat a Windows 11 → Configuración de políticas de seguridad en Windows 11
Verificació de polítiques i registre d'esdeveniments a Windows 11 → Verificación de políticas y registro de eventos en Windows 11
`.trim().split("\n").map(line => {
  const idx = line.indexOf(" → ");
  return [line.slice(0, idx), line.slice(idx + 3)];
});

// Sort by length DESC
dict.sort((a, b) => b[0].length - a[0].length);

const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));
let total = 0;

files.forEach(f => {
  let c = fs.readFileSync(dir + "/" + f, "utf8");
  dict.forEach(([cat, es]) => {
    if (c.includes(cat)) {
      const parts = c.split(cat);
      total += parts.length - 1;
      c = parts.join(es);
    }
  });
  fs.writeFileSync(dir + "/" + f, c);
});

console.log(`Total: ${total} reemplazos`);

// Show results
["si-eac1", "si-eac2", "si-eac3"].forEach(f => {
  const d = JSON.parse(fs.readFileSync(dir + "/" + f + ".json", "utf8"));
  console.log("=== " + f + " ===");
  d.cards.slice(0, 5).forEach((c, i) => console.log("[" + i + "] " + c.front.substring(0, 140)));
});
