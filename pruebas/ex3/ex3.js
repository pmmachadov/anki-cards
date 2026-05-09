// 1. Arrow function: convierte un nombre a mayúsculas
const aMayusculas = (nombre) => nombre.toUpperCase();

// 2. Función que comprueba si una persona es mayor de edad
function esMayorDeEdad(fechaNacimiento) {
    const anioActual = new Date().getFullYear();
    const anioNacimiento = fechaNacimiento.getFullYear();
    return (anioActual - anioNacimiento) >= 18;
}

// 3. Función que elimina los espacios en blanco de los extremos
function limpiarTexto(cadena) {
    return cadena.trim();
}

// Datos hardcodeados
const nombre = "  pablo garcia  ";
const fechaNacimiento = new Date(2000, 4, 15); // 15 de mayo de 2000

// Llamada a las funciones
const nombreLimpio = limpiarTexto(nombre);
const nombreMayusculas = aMayusculas(nombreLimpio);
const mayorDeEdad = esMayorDeEdad(fechaNacimiento);

// Mostrar resultados por consola
console.log(`Nombre original: "${nombre}"`);
console.log(`Nombre sin espacios: "${nombreLimpio}"`);
console.log(`Nombre en mayúsculas: "${nombreMayusculas}"`);
console.log(`Fecha de nacimiento: ${fechaNacimiento.toLocaleDateString()}`);
console.log(`¿Es mayor de edad?: ${mayorDeEdad ? "Sí" : "No"}`);