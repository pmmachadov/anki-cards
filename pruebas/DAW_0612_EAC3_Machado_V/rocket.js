// SELECCIÓN DE ELEMENTOS DEL DOM

const ventanas = document.querySelectorAll(".cabin-window");

const cupula = document.querySelectorAll(".rocket-nose");

const zonaMotores = document.getElementById("engine-zone");

// Body del documento (para cambiar el fondo)
const body = document.getElementById("universe");

// VARIABLES DE ESTADO

// Estado de los motores (encendidos/apagados)
let motoresEncendidos = false;

// Estado de las luces de cabina (encendidas/apagadas)
let lucesEncendidas = true;

// Estado del fondo de hiperespacio (activado/desactivado)
let hiperespacioActivo = false;

// FUNCIONES PARA EL CONTROL DE VENTANAS

function iluminarVentana(event) {
  if (lucesEncendidas) {
    event.target.classList.add("window-hover");
  }
}

/**
 * Apaga la iluminación de una ventana al salir el ratón
 */
function apagarVentana(event) {
  event.target.classList.remove("window-hover");
}

/**
 * Ilumina todas las ventanas de la cabina
 * Solo funciona si las luces están encendidas
 */
function iluminarTodasVentanas() {
  if (lucesEncendidas) {
    ventanas.forEach((ventana) => {
      ventana.classList.add("window-hover");
    });
  }
}

/**
 * Apaga la iluminación de todas las ventanas de la cabina
 */
function apagarTodasVentanas() {
  ventanas.forEach((ventana) => {
    ventana.classList.remove("window-hover");
  });
}

// EVENTOS DE RATÓN PARA VENTANAS INDIVIDUALES

// Añadir eventos a cada ventana individual
ventanas.forEach((ventana) => {
  // mouseenter: cuando el ratón entra en la ventana
  ventana.addEventListener("mouseenter", iluminarVentana);
  // mouseleave: cuando el ratón sale de la ventana
  ventana.addEventListener("mouseleave", apagarVentana);
});

// EVENTOS DE RATÓN PARA LA CÚPULA (ILUMINACIÓN CONJUNTA)

// Añadir eventos a cada parte de la cúpula
cupula.forEach((pixel) => {
  // Al entrar en la cúpula, iluminar todas las ventanas
  pixel.addEventListener(
    "mouseenter",
    iluminarTodasVentanas,
  );
  // Al salir de la cúpula, apagar todas las ventanas
  pixel.addEventListener("mouseleave", apagarTodasVentanas);
});

// FUNCIONES PARA EL CONTROL DE MOTORES

/**
 * Crea y devuelve una fila de llamas para los motores
 * La fila tiene 5 píxeles con colores naranja y amarillo
 */
function crearFilaLlamas() {
  const fila = document.createElement("div");
  fila.classList.add("row");

  // Crear 5 píxeles de llamas con colores alternados
  const colores = [
    "orange",
    "yellow",
    "orange",
    "yellow",
    "orange",
  ];
  colores.forEach((color) => {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel", color);
    fila.appendChild(pixel);
  });

  return fila;
}

/**
 * Enciende los motores del cohete
 * Añade dos filas de llamas en la zona de motores
 */
function encenderMotores() {
  // Crear y añadir dos filas de llamas
  for (let i = 0; i < 2; i++) {
    const filaLlamas = crearFilaLlamas();
    zonaMotores.appendChild(filaLlamas);
  }
  console.log("Motores encendidos");
}

/**
 * Apaga los motores del cohete
 * Elimina todas las llamas de la zona de motores
 */
function apagarMotores() {
  // Vaciar el contenido de la zona de motores
  zonaMotores.innerHTML = "";
  console.log("Motores apagados");
}

/**
 * Alterna el estado de los motores (encendido/apagado)
 */
function alternarMotores() {
  motoresEncendidos = !motoresEncendidos;

  if (motoresEncendidos) {
    encenderMotores();
  } else {
    apagarMotores();
  }
}

// FUNCIONES PARA EL CONTROL DE LUCES DE CABINA

/**
 * Apaga las luces de la cabina
 * Cambia el color de las ventanas a negro y las mantiene apagadas
 */
function apagarLucesCabina() {
  ventanas.forEach((ventana) => {
    ventana.classList.remove("window-hover");
    ventana.classList.add("light-off");
  });
  console.log("Luces de cabina apagadas");
}

/**
 * Enciende las luces de la cabina
 * Restaura el color azul original de las ventanas
 */
function encenderLucesCabina() {
  ventanas.forEach((ventana) => {
    ventana.classList.remove("light-off");
  });
  console.log("Luces de cabina encendidas");
}

/**
 * Alterna el estado de las luces de cabina
 * Si se apagan, las ventanas no responderán al ratón hasta volver a encender
 */
function alternarLucesCabina() {
  lucesEncendidas = !lucesEncendidas;

  if (lucesEncendidas) {
    encenderLucesCabina();
  } else {
    apagarLucesCabina();
  }
}

// FUNCIONES PARA EL MODO HIPERESPACIO

/**
 * Activa el modo hiperespacio
 * Cambia el fondo del body añadiendo la clase bg-stars
 */
function activarHiperespacio() {
  body.classList.add("bg-stars");
  console.log("Modo hiperespacio activado");
}

/**
 * Desactiva el modo hiperespacio
 * Elimina la clase bg-stars del body
 */
function desactivarHiperespacio() {
  body.classList.remove("bg-stars");
  console.log("Modo hiperespacio desactivado");
}

/**
 * Alterna el modo hiperespacio (activado/desactivado)
 */
function alternarHiperespacio() {
  hiperespacioActivo = !hiperespacioActivo;

  if (hiperespacioActivo) {
    activarHiperespacio();
  } else {
    desactivarHiperespacio();
  }
}

// EVENTOS DE TECLADO

/**
 * Manejador de eventos para pulsaciones de teclas
 * S - Encender/apagar motores
 * L - Encender/apagar luces de cabina
 * N - Activar/desactivar modo hiperespacio
 */
document.addEventListener("keydown", (event) => {
  // Obtener la tecla pulsada en mayúsculas para comparación case-insensitive
  const tecla = event.key.toUpperCase();

  switch (tecla) {
    case "S":
      // Tecla S: alternar motores
      alternarMotores();
      break;

    case "L":
      // Tecla L: alternar luces de cabina
      alternarLucesCabina();
      break;

    case "N":
      // Tecla N: alternar modo hiperespacio
      alternarHiperespacio();
      break;

    default:
      // Otras teclas: no hacer nada por eso lo dejo vacío
      break;
  }
});

// INICIALIZACIÓN

console.log("Sistema de control del cohete cargado");
console.log("Controles:");
console.log("  [S] - Ignición de motores");
console.log("  [L] - Luces de cabina");
console.log("  [N] - Modo hiperespacio");
