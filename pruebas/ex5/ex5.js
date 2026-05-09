// Definición de la clase Producto
class Producto {
    // Propiedad privada declarada antes del constructor (ES2022)
    #stock;

    // Constructor: inicializa nombre, precio y stock
    constructor(nombre, precio, stockInicial) {
        this.nombre = nombre;
        this.precio = precio;
        this.#stock = stockInicial;
    }

    // Método público para actualizar el stock (suma o resta unidades)
    actualizarStock(cantidad) {
        const nuevoStock = this.#stock + cantidad;
        if (nuevoStock < 0) {
            console.log(`Error: no hay suficiente stock para "${this.nombre}". Stock actual: ${this.#stock}`);
        } else {
            this.#stock = nuevoStock;
            console.log(`Stock de "${this.nombre}" actualizado a ${this.#stock} unidades.`);
        }
    }

    // Getter que devuelve nombre y precio formateado con dos decimales
    get info() {
        return `${this.nombre} - ${this.precio.toFixed(2)} €`;
    }
}




// Instanciación de productos
const producto1 = new Producto("Cafetera", 49.99, 10);
const producto2 = new Producto("Tostadora", 29.95, 5);

// Demostración del funcionamiento de los métodos
console.log(producto1.info); // Muestra información del producto 1
console.log(producto2.info); // Muestra información del producto 2
producto1.actualizarStock(-3); // Reduce el stock del producto 1
producto2.actualizarStock(10); // Aumenta el stock del producto 2
producto1.actualizarStock(-8); // Intenta reducir el stock del producto 1 a un valor negativo
