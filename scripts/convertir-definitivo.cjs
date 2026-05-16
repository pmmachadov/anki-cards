const fs = require("fs");
const dir = "public/data/examenes";

// Sorted by length DESC so longest matches apply first
const cat2es = [
  // Full SI EAC1 card texts that are Catalan (longest first)
  [`Identifiqueu en la imatge de connectors externs d'una placa base, cadascun dels elements: A, B, C, D, E, F, G, H, I`, `Identificad en la imagen de conectores externos de una placa base, cada uno de los elementos: A, B, C, D, E, F, G, H, I`],
  [`Un equip informàtic comença a funcionar amb molta lentitud després d'instal\u00b7lar diverses aplicacions noves. Com analitzaríeu la situació per determinar si el problema és de programari, de manca de recursos o d'un possible error de configuració? Descriviu un protocol d'anàlisi pas a pas i proposeu mesures preventives.`, `Un equipo informático comienza a funcionar con mucha lentitud después de instalar diversas aplicaciones nuevas. C\u00f3mo analizar\u00edais la situaci\u00f3n para determinar si el problema es de software, de falta de recursos o de un posible error de configuraci\u00f3n? Describid un protocolo de an\u00e1lisis paso a paso y proponed medidas preventivas.`],
  [`Expliqueu per què un disc SSD millora el rendiment general del sistema respecte d'un disc dur mecànic (HDD). Compareu el funcionament intern de tots dos dispositius i descriviu una situació real en què la diferència de velocitat sigui especialment rellevant.`, `Explicad por qu\u00e9 un disco SSD mejora el rendimiento general del sistema respecto de un disco duro mec\u00e1nico (HDD). Comparad el funcionamiento interno de ambos dispositivos y describid una situaci\u00f3n real en que la diferencia de velocidad sea especialmente relevante.`],
  [`Situació 1: Instal\u00b7lació de sistema operatiu i errors d'arrencada. Una empresa intenta instal\u00b7lar Windows i Linux en un mateix equip modern amb disc NVMe de 2TB. Després de la instal\u00b7lació, el sistema no mostra menú d'arrencada i només inicia un dels sistemes. La placa base està configurada en mode Legacy (BIOS) i el disc utilitza esquema MBR.\n\na) Expliqueu per què aquesta configuració pot generar limitacions en equips actuals.\nb) Quines diferències hi ha entre BIOS/MBR i UEFI/GPT?\nc) Quin seria el procediment recomanat per configurar correctament un entorn dual-boot modern?`, `Situaci\u00f3n 1: Instalaci\u00f3n de sistema operativo y errores de arranque. Una empresa intenta instalar Windows y Linux en un mismo equipo moderno con disco NVMe de 2TB. Despu\u00e9s de la instalaci\u00f3n, el sistema no muestra men\u00fa de arranque y solo inicia uno de los sistemas. La placa base est\u00e1 configurada en modo Legacy (BIOS) y el disco usa esquema MBR.\n\na) Explicad por qu\u00e9 esta configuraci\u00f3n puede generar limitaciones en equipos actuales.\nb) Qu\u00e9 diferencias hay entre BIOS/MBR y UEFI/GPT?\nc) Cu\u00e1l ser\u00eda el procedimiento recomendado para configurar correctamente un entorno dual-boot moderno?`],
  [`Expliqueu la funció del kernel, la interfície d'usuari, el sistema de fitxers, la multitasca, la memòria virtual, els controladors, les actualitzacions, l'administració de processos i els contenidors virtuals dins d'un sistema operatiu.`, `Explicad la funci\u00f3n del kernel, la interfaz de usuario, el sistema de archivos, la multitarea, la memoria virtual, los controladores, las actualizaciones, la administraci\u00f3n de procesos y los contenedores virtuales dentro de un sistema operativo.`],
  [`Quina és la diferència principal entre una màquina virtual i un contenidor? Expliqueu-ho amb les teves paraules.`, `Cu\u00e1l es la diferencia principal entre una m\u00e1quina virtual y un contenedor? Explicadlo con vuestras palabras.`],
  [`Quins són els motius principals per als quals s'hauria d'actualitzar contínuament el sistema operatiu?`, `Cu\u00e1les son los motivos principales por los cuales se deber\u00eda actualizar continuamente el sistema operativo?`],
  [`En què es diferencien el procés d'actualitzar la llista de repositoris i el de baixar i instal\u00b7lar les actualitzacions dels paquets?`, `En qu\u00e9 se diferencian el proceso de actualizar la lista de repositorios y el de descargar e instalar las actualizaciones de los paquetes?`],
  [`A l'hora d'instal\u00b7lar un sistema operatiu, hi ha opcions com instal\u00b7lació neta, actualització o arrencada dual (dual boot). Expliqueu en quin cas triaries cadascuna d'aquestes opcions i per què.`, `A la hora de instalar un sistema operativo, hay opciones como instalaci\u00f3n limpia, actualizaci\u00f3n o arranque dual (dual boot). Explicad en qu\u00e9 caso elegir\u00edais cada una de estas opciones y por qu\u00e9.`],

  // Common verb fixes for ALL files
  [/\bIdentifiqueu\b/g, "Identificad"],
  [/\bidentifiqueu\b/g, "identificad"],
  [/\bExpliqueu\b/g, "Explicad"],
  [/\bexpliqueu\b/g, "explicad"],
  [/\bUtilitzeu\b/g, "Utilizad"],
  [/\butilitzeu\b/g, "utilizad"],
  [/\butilitzant\b/g, "utilizando"],
  [/\butilitzar\b/g, "utilizar"],
  [/\bConfigureu\b/g, "Configurad"],
  [/\bconfigureu\b/g, "configurad"],
  [/\bVerifiqueu\b/g, "Verificad"],
  [/\bverifiqueu\b/g, "verificad"],
  [/\bIndiqueu\b/g, "Indicad"],
  [/\bindiqueu\b/g, "indicad"],
  [/\bDescriviu\b/g, "Describid"],
  [/\bdescriviu\b/g, "describid"],
  [/\bDetermineu\b/g, "Determinad"],
  [/\bdetermineu\b/g, "determinad"],
  [/\bForceu\b/g, "Forzad"],
  [/\bforceu\b/g, "forzad"],
  [/\bMostreu\b/g, "Mostrad"],
  [/\bmostreu\b/g, "mostrad"],
  [/\bActualitzeu\b/g, "Actualizad"],
  [/\bactualitzeu\b/g, "actualizad"],
  [/\bGenereu\b/g, "Generad"],
  [/\bgenereu\b/g, "generad"],
  [/\bFormateu\b/g, "Formatead"],
  [/\bformateu\b/g, "formatead"],
  [/\bMunteu\b/g, "Montad"],
  [/\bmunteu\b/g, "montad"],
  [/\bInstal\u00b7leu\b/g, "Instalad"],
  [/\binstal\u00b7leu\b/g, "instalad"],
  [/\bAfegiu\b/g, "A\u00f1adid"],
  [/\bCreeu\b/g, "Cread"],
  [/\bcreeu\b/g, "cread"],
  [/\bObriu\b/g, "Abrid"],
  [/\bobriu\b/g, "abrid"],
  [/\bAccediu\b/g, "Acceded"],
  [/\baccediu\b/g, "acceded"],
  [/\bLocalitzeu\b/g, "Localizad"],
  [/\blocalitzeu\b/g, "localizad"],
  [/\bResponeu\b/g, "Responded"],
  [/\bCompraveu\b/g, "Comprobad"],
  [/\bcomproveu\b/g, "comprobad"],
  [/\bAssigneu\b/g, "Asignad"],
  [/\bassigneu\b/g, "asignad"],
  [/\bExecuteu\b/g, "Ejecutad"],
  [/\bexecuteu\b/g, "ejecutad"],
  [/\bConsulteu\b/g, "Consultad"],
  [/\bCompareu\b/g, "Comparad"],
  [/\bcompareu\b/g, "comparad"],
  [/\bJustifiqueu\b/g, "Justificad"],
  [/\bjustifiqueu\b/g, "justificad"],
  [/\bDescarregueu\b/g, "Descargad"],
  [/\bdescarregueu\b/g, "descargad"],
  [/\bReviseu\b/g, "Revisad"],
  [/\breviseu\b/g, "revisad"],

  // Common noun replacements
  [/\bpartici\u00f3\b/g, "partici\u00f3n"],
  [/\bparticions\b/g, "particiones"],
  [/\bPartici\u00f3\b/g, "Partici\u00f3n"],
  [/\bsituaci\u00f3\b/g, "situaci\u00f3n"],
  [/\bSituaci\u00f3\b/g, "Situaci\u00f3n"],
  [/\binstal\u00b7laci\u00f3\b/g, "instalaci\u00f3n"],
  [/\bInstal\u00b7laci\u00f3\b/g, "Instalaci\u00f3n"],
  [/\bconfiguraci\u00f3\b/g, "configuraci\u00f3n"],
  [/\bConfiguraci\u00f3\b/g, "Configuraci\u00f3n"],
  [/\bverificaci\u00f3\b/g, "verificaci\u00f3n"],
  [/\bVerificaci\u00f3\b/g, "Verificaci\u00f3n"],
  [/\bcreaci\u00f3\b/g, "creaci\u00f3n"],
  [/\bCreaci\u00f3\b/g, "Creaci\u00f3n"],
  [/\bmodificaci\u00f3\b/g, "modificaci\u00f3n"],
  [/\bModificaci\u00f3\b/g, "Modificaci\u00f3n"],
  [/\bgesti\u00f3\b/g, "gesti\u00f3n"],
  [/\bGesti\u00f3\b/g, "Gesti\u00f3n"],
  [/\bpromoci\u00f3\b/g, "promoci\u00f3n"],
  [/\bPromoci\u00f3\b/g, "Promoci\u00f3n"],
  [/\bcompartici\u00f3\b/g, "compartici\u00f3n"],
  [/\bCompartici\u00f3\b/g, "Compartici\u00f3n"],
  [/\bcompilaci\u00f3\b/g, "compilaci\u00f3n"],
  [/\bCompilaci\u00f3\b/g, "Compilaci\u00f3n"],
  [/\ban\u00e0lisi\b/g, "an\u00e1lisis"],
  [/\bAn\u00e0lisi\b/g, "An\u00e1lisis"],
  [/\bintegraci\u00f3\b/g, "integraci\u00f3n"],
  [/\bIntegraci\u00f3\b/g, "Integraci\u00f3n"],
  [/\badministraci\u00f3\b/g, "administraci\u00f3n"],
  [/\bAdministraci\u00f3\b/g, "Administraci\u00f3n"],
  [/\bactualitzaci\u00f3\b/g, "actualizaci\u00f3n"],
  [/\bActualitzaci\u00f3\b/g, "Actualizaci\u00f3n"],
  [/\bintroducci\u00f3\b/g, "introducci\u00f3n"],
  [/\bIntroducci\u00f3\b/g, "Introducci\u00f3n"],
  [/\bavaluaci\u00f3\b/g, "evaluaci\u00f3n"],
  [/\bAvaluaci\u00f3\b/g, "Evaluaci\u00f3n"],
  [/\bprevenci\u00f3\b/g, "prevenci\u00f3n"],
  [/\bPrevenci\u00f3\b/g, "Prevenci\u00f3n"],
  [/\brecuperaci\u00f3\b/g, "recuperaci\u00f3n"],
  [/\brecuperaci\u00f3\b/g, "recuperaci\u00f3n"],
  [/\binformaci\u00f3\b/g, "informaci\u00f3n"],
  [/\bInformaci\u00f3\b/g, "Informaci\u00f3n"],
  [/\binterconnexi\u00f3\b/g, "interconexi\u00f3n"],
  [/\bsoluci\u00f3\b/g, "soluci\u00f3n"],
  [/\bpresentaci\u00f3\b/g, "presentaci\u00f3n"],
  [/\bcomprovaci\u00f3\b/g, "comprobaci\u00f3n"],

  // Specific SI EAC2/3 common Catalan words  
  [/\bequip\b/g, "equipo"],
  [/\bequips\b/g, "equipos"],
  [/\bdiscs\b/g, "discos"],
  [/\bvirtuals\b/g, "virtuales"],
  [/\bcontrasenya\b/g, "contrase\u00f1a"],
  [/\bcontrasenyes\b/g, "contrase\u00f1as"],
  [/\bconnexi\u00f3\b/g, "conexi\u00f3n"],
  [/\bconnexions\b/g, "conexiones"],
  [/\bfitxer\b/g, "archivo"],
  [/\bfitxers\b/g, "archivos"],
  [/\bprogramari\b/g, "software"],
  [/\bSistemes Inform\u00e0tics\b/g, "Sistemas Inform\u00e1ticos"],
  [/\bsistemes operatius\b/g, "sistemas operativos"],
  [/\bnucli\b/g, "n\u00facleo"],
  [/\bmem\u00f2ria virtual\b/g, "memoria virtual"],
  [/\bmultitasca\b/g, "multitarea"],
  [/\bcontroladors\b/g, "controladores"],
  [/\bcontenidors virtuals\b/g, "contenedores virtuales"],
  [/\bseguretat\b/g, "seguridad"],
  [/\bSeguretat\b/g, "Seguridad"],
  [/\bdisponibilitat\b/g, "disponibilidad"],
  [/\bestabilitat\b/g, "estabilidad"],
  [/\bprioritat\b/g, "prioridad"],
  [/\bunitat\b/g, "unidad"],
  [/\bcomplexitat\b/g, "complejidad"],
  [/\bvelocitat\b/g, "velocidad"],
  [/\bfunci\u00f3\b/g, "funci\u00f3n"],
  [/\bdifer\u00e8ncia\b/g, "diferencia"],
  [/\bdifer\u00e8ncies\b/g, "diferencias"],

  // Accent fixes (à/è/ò → á/é/ó)
  [/\best\u00e0\b/g, "est\u00e1"],
  [/\best\u00e0tica\b/g, "est\u00e1tica"],
  [/\bm\u00e0scara\b/g, "m\u00e1scara"],
  [/\bgr\u00e0fica\b/g, "gr\u00e1fica"],
  [/\bgr\u00e0fic\b/g, "gr\u00e1fico"],
  [/\bt\u00e8cnic\b/g, "t\u00e9cnico"],
  [/\bt\u00e8cnics\b/g, "t\u00e9cnicos"],
  [/\bautom\u00e0tic\b/g, "autom\u00e1tico"],
  [/\bautom\u00e0tica\b/g, "autom\u00e1tica"],
  [/\bm\u00e0quina\b/g, "m\u00e1quina"],
  [/\bM\u00e0quina\b/g, "M\u00e1quina"],

  // Remaining known Catalan words
  [/\bxarxa\b/g, "red"],
  [/\bXarxa\b/g, "Red"],
  [/\beina\b/g, "herramienta"],
  [/\bimatge\b/g, "imagen"],
  [/\bimatges\b/g, "im\u00e1genes"],
  [/\belements\b/g, "elementos"],
  [/\bconnectors\b/g, "conectores"],
  [/\bexterns\b/g, "externos"],
  [/\bcadascun\b/g, "cada uno"],
  [/\bcadascuna\b/g, "cada una"],
  [/\bqu\u00e8\b/g, "qu\u00e9"],
  [/\bQu\u00e8\b/g, "Qu\u00e9"],
  [/\bquins\b/g, "qu\u00e9"],
  [/\bquines\b/g, "qu\u00e9"],
  [/\bper\u00f2\b/g, "pero"],
  [/\btamb\u00e9\b/g, "tambi\u00e9n"],
  [/\bperqu\u00e8\b/g, "porque"],
  [/\bper qu\u00e8\b/g, "por qu\u00e9"],
  [/\b\bs\u00f3n\b/g, "son"],
  [/\b\best\u00e0\b/g, "est\u00e1"],
  [/\b\bestan\b/g, "est\u00e1n"],
  [/\b\bentre\b/g, "entre"],
  [/\b\bsobre\b/g, "sobre"],
  [/\b\bper\u00f2\b/g, "pero"],

  // Catalan i → Spanish y (only standalone word)
  [/\bi\b/g, "y"],

  // Direct text replacements for the rest
  ["d'una", "de una"],
  ["d'un", "de un"],
  ["d'instal", "de instal"],
  ["d'arrencada", "de arranque"],
  ["d'usuari", "de usuario"],
  ["d'anàlisi", "de análisis"],
  ["d'actualitzar", "de actualizar"],
  ["d'aquestes", "de estas"],
  ["l'usuari", "el usuario"],
  ["l'equip", "el equipo"],
  ["l'empresa", "la empresa"],
  ["l'exercici", "el ejercicio"],
  ["l'enunciat", "el enunciado"],
  ["l'arrencada", "el arranque"],
  ["l'eina", "la herramienta"],
  ["l'esquema", "el esquema"],
  ["l'Administració", "la Administración"],
  ["l'Active Directory", "Active Directory"],
  ["l'apartat", "el apartado"],
  ["l'enllaç", "el enlace"],
  ["l'opció", "la opción"],
  ["l'estructura", "la estructura"],
  ["l'usuari", "el usuario"],
  ["l'objectiu", "el objetivo"],
  ["l'accés", "el acceso"],
  ["l'espai", "el espacio"],
  ["l'informació", "la información"],

  ["dels ", "de los "],
  ["als ", "a los "],
  ["Amb ", "Con "],
  ["amb ", "con "],
  ["usant", "usando"],
  ["vostre", "vuestro"],
  ["vostra", "vuestra"],
  ["següent", "siguiente"],
  ["següents", "siguientes"],
  ["domini", "dominio"],
  ["paquets", "paquetes"],
  ["servei", "servicio"],
  ["serveis", "servicios"],
  ["repositori", "repositorio"],
  ["repositoris", "repositorios"],
  ["bibliotecari", "bibliotecario"],
  ["treballador", "trabajador"],

  // Fix "los" artifacts from cascade
  [" a los ", " los "],
  [" a los\n", " los\n"],
  [", a los ", ", los "],
  ["principa los", "principales"],
  ["motivos principa", "motivos principales"],
  ["els ", "los "],
  ["Els ", "Los "],
  ["les ", "las "],
  ["Les ", "Las "],
  ["hi ha", "hay"],
  ["hi hagi", "haya"],
  ["n'hi ha", "hay"],
  ["s'hauria", "se debería"],
  ["s'ha", "se ha"],
  ["s'han", "se han"],
  ["Com ", "Cómo "],
  ["com ", "como "],
  ["quan", "cuando"],
  ["Quan", "Cuando"],
  ["gestionar", "gestionar"],
  ["connectar", "conectar"],
  ["connecteu", "conectad"],
  ["Connecteu", "Conectad"],
];

// Sort by Catalan length DESC
cat2es.sort((a, b) => typeof a[0] === "string" ? (typeof b[0] === "string" ? b[0].length - a[0].length : 1) : -1);

const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));
let total = 0;

files.forEach(f => {
  let c = fs.readFileSync(dir + "/" + f, "utf8");
  cat2es.forEach(([cat, es]) => {
    if (typeof cat === "string") {
      // Direct string replacement
      if (c.includes(cat)) {
        const parts = c.split(cat);
        total += parts.length - 1;
        c = parts.join(es);
      }
    } else {
      // Regex replacement
      const before = c;
      c = c.replace(cat, es);
      if (c !== before) total++;
    }
  });
  fs.writeFileSync(dir + "/" + f, c);
});

console.log("Total reemplazos: " + total);

// Show results
["si-eac1", "si-eac2", "si-eac3"].forEach(f => {
  const d = JSON.parse(fs.readFileSync(dir + "/" + f + ".json", "utf8"));
  console.log("=== " + f + " ===");
  d.cards.forEach((c, i) => {
    if (i < 5 || i === Math.floor(d.cards.length / 2)) {
      console.log("[" + i + "] " + c.front.substring(0, 150).replace(/\n/g, "\\n"));
    }
  });
});
