const fs = require("fs");
const f = "scripts/generar-examenes.cjs";
let c = fs.readFileSync(f, "utf8");
let total = 0;

function rep(oldStr, newStr) {
  if (c.includes(oldStr)) {
    c = c.split(oldStr).join(newStr);
    total++;
    console.log("OK: " + oldStr.substring(0, 50) + "...");
  } else {
    console.log("NOT FOUND: " + oldStr.substring(0, 50) + "...");
  }
}

// ============= SI EAC1 Card Fronts =============
rep(
  '"front": "Identifiqueu en la imatge de connectors externs d\'una placa base, cadascun dels elements: A, B, C, D, E, F, G, H, I"',
  '"front": "Identificad en la imagen de conectores externos de una placa base, cada uno de los elementos: A, B, C, D, E, F, G, H, I"'
);
rep(
  "\"front\": \"Un equip inform\\u00e0tic comen\\u00e7a a funcionar amb molta lentitud despr\\u00e9s d\\'instal\\u00b7lar diverses aplicacions noves. Com analitzar\\u00edeu la situaci\\u00f3 per determinar si el problema \\u00e9s de programari, de manca de recursos o d\\'un possible error de configuraci\\u00f3? Descriviu un protocol d\\'an\\u00e0lisi pas a pas i proposeu mesures preventives.\"",
  "\"front\": \"Un equipo inform\\u00e1tico comienza a funcionar con mucha lentitud despu\\u00e9s de instalar diversas aplicaciones nuevas. C\\u00f3mo analizar\\u00edais la situaci\\u00f3n para determinar si el problema es de software, de falta de recursos o de un posible error de configuraci\\u00f3n? Describid un protocolo de an\\u00e1lisis paso a paso y proponed medidas preventivas.\""
);
rep(
  "\"front\": \"Expliqueu per qu\\u00e8 un disc SSD millora el rendiment general del sistema respecte d\\'un disc dur mec\\u00e0nic (HDD). Compareu el funcionament intern de tots dos dispositius i descriviu una situaci\\u00f3 real en qu\\u00e8 la difer\\u00e8ncia de velocitat sigui especialment rellevant.\"",
  "\"front\": \"Explicad por qu\\u00e9 un disco SSD mejora el rendimiento general del sistema respecto de un disco duro mec\\u00e1nico (HDD). Comparad el funcionamiento interno de ambos dispositivos y describid una situaci\\u00f3n real en que la diferencia de velocidad sea especialmente relevante.\""
);
rep(
  "\"front\": \"Situaci\\u00f3 1: Instal\\u00b7laci\\u00f3 de sistema operatiu i errors d\\'arrencada. Una empresa intenta instal\\u00b7lar Windows i Linux en un mateix equip modern amb disc NVMe de 2TB. Despr\\u00e9s de la instal\\u00b7laci\\u00f3, el sistema no mostra men\\u00fa d\\'arrencada i nom\\u00e9s inicia un dels sistemes. La placa base est\\u00e0 configurada en mode Legacy (BIOS) i el disc utilitza esquema MBR.\\n\\na) Expliqueu per qu\\u00e8 aquesta configuraci\\u00f3 pot generar limitacions en equips actuals.\\nb) Quines difer\\u00e8ncies hi ha entre BIOS/MBR i UEFI/GPT?\\nc) Quin seria el procediment recomanat per configurar correctament un entorn dual-boot modern?\"",
  "\"front\": \"Situaci\\u00f3n 1: Instalaci\\u00f3n de sistema operativo y errores de arranque. Una empresa intenta instalar Windows y Linux en un mismo equipo moderno con disco NVMe de 2TB. Despu\\u00e9s de la instalaci\\u00f3n, el sistema no muestra men\\u00fa de arranque y solo inicia uno de los sistemas. La placa base est\\u00e1 configurada en modo Legacy (BIOS) y el disco usa esquema MBR.\\n\\na) Explicad por qu\\u00e9 esta configuraci\\u00f3n puede generar limitaciones en equipos actuales.\\nb) Qu\\u00e9 diferencias hay entre BIOS/MBR y UEFI/GPT?\\nc) Cu\\u00e1l ser\\u00eda el procedimiento recomendado para configurar correctamente un entorno dual-boot moderno?\""
);

// ============= SI EAC2 Card Fronts =============
rep(
  "Particionament d'un disc amb esquema MBR. Afegiu dos discs virtuals nous de 10 GB cadascun. Sobre el primer disc, creeu una taula de particions de tipus MBR i utilitzeu l'eina fdisk per crear cinc particions de 2 GB cadascuna. Durant el procés, indiqueu quin tipus de particions heu utilitzat (primàries, estesa o lògiques) i expliqueu breument per què ha estat necessari utilitzar aquests tipus de partició.\nA continuació, descriviu les limitacions principals del sistema de particionament MBR. Finalment, utilitzeu la comanda lsblk per identificar el disc i totes les particions creades, mostrant la seva mida i estructura.",
  "Particionado de un disco con esquema MBR. Añadid dos discos virtuales nuevos de 10 GB cada uno. Sobre el primer disco, cread una tabla de particiones de tipo MBR y utilizad la herramienta fdisk para crear cinco particiones de 2 GB cada una. Durante el proceso, indicad qué tipo de particiones habéis utilizado (primarias, extendida o lógicas) y explicad brevemente por qué ha sido necesario utilizar estos tipos de partición.\nA continuación, describid las limitaciones principales del sistema de particionado MBR. Finalmente, utilizad el comando lsblk para identificar el disco y todas las particiones creadas, mostrando su tamaño y estructura."
);

// Description and name fixes
rep('"name": "SI - EAC1 (Sistemes Informàtics)"', '"name": "SI - EAC1 (Sistemas Informáticos)"');
rep('"name": "SI - EAC2 (Sistemes Informàtics)"', '"name": "SI - EAC2 (Sistemas Informáticos)"');
rep('"name": "SI - EAC3 (Sistemes Informàtics)"', '"name": "SI - EAC3 (Sistemas Informáticos)"');

console.log("\nTotal: " + total + " reemplazos");
fs.writeFileSync(f, c);
