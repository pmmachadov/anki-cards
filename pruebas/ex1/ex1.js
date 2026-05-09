// Datos del producto
const precioBase = 200;
const porcentajeDescuento = 15;
const tipoIVA = "general";

// Cálculo del descuento
let importeDescuento = (precioBase * porcentajeDescuento) / 100;
let precioConDescuento = precioBase - importeDescuento;

// Determinar el porcentaje de IVA según el tipo
let porcentajeIVA;

if (tipoIVA.toLowerCase() === "general") {
    porcentajeIVA = 21;
} else if (tipoIVA.toLowerCase() === "reduit") {
    porcentajeIVA = 10;
} else {
    porcentajeIVA = 0;
    console.log("Tipo de IVA no reconocido, se aplica 0%");
}

// Cálculo del precio final con IVA
let importeIVA = (precioConDescuento * porcentajeIVA) / 100;
let precioFinal = precioConDescuento + importeIVA;

// Mostrar los resultados por consola con template strings
console.log(`Precio inicial: ${precioBase} €`);
console.log(`Descuento aplicado: ${porcentajeDescuento}% (${importeDescuento} €)`);
console.log(`Precio después del descuento: ${precioConDescuento} €`);
console.log(`IVA aplicado (${tipoIVA} - ${porcentajeIVA}%): ${importeIVA} €`);
console.log(`Precio final: ${precioFinal} €`);
