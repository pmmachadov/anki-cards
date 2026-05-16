/**
 * Ejemplo práctico: Relación uno a muchos (*) con List
 * 
 * Un BuqueInvestigacion puede tener MUCHAS Expediciones (1 a *).
 * Usamos List<Expedicion> en vez de un array tradicional.
 */

import java.util.ArrayList;
import java.util.List;

class Expedicion {
    private String destino;
    private int duracionDias;

    public Expedicion(String destino, int duracionDias) {
        this.destino = destino;
        this.duracionDias = duracionDias;
    }

    public String getDestino() { return destino; }
    public int getDuracionDias() { return duracionDias; }

    @Override
    public String toString() {
        return destino + " (" + duracionDias + " días)";
    }
}

public class BuqueInvestigacion {
    private String nombre;
    private List<Expedicion> expediciones;  // RELACIÓN 1 a *

    public BuqueInvestigacion(String nombre) {
        this.nombre = nombre;
        this.expediciones = new ArrayList<>(); // Inicializamos la lista
    }

    // Añadir una expedición (add)
    public void agregarExpedicion(Expedicion e) {
        expediciones.add(e);
    }

    // Eliminar una expedición (remove)
    public void eliminarExpedicion(int indice) {
        if (indice >= 0 && indice < expediciones.size()) {
            expediciones.remove(indice);
        }
    }

    // Obtener una expedición por índice (get)
    public Expedicion getExpedicion(int indice) {
        return expediciones.get(indice);
    }

    // Número total de expediciones (size)
    public int totalExpediciones() {
        return expediciones.size();
    }

    // Listar todas las expediciones
    public void listarExpediciones() {
        System.out.println("=== " + nombre + " ===");
        if (expediciones.isEmpty()) {
            System.out.println("  No hay expediciones registradas.");
        } else {
            for (int i = 0; i < expediciones.size(); i++) {
                System.out.println("  [" + i + "] " + expediciones.get(i));
            }
        }
        System.out.println("Total: " + expediciones.size() + " expediciones\n");
    }

    // ========== MAIN: Prueba del ejemplo ==========
    public static void main(String[] args) {
        BuqueInvestigacion hesperides = new BuqueInvestigacion("Hespérides");

        // Agregar expediciones (add)
        hesperides.agregarExpedicion(new Expedicion("Antártida", 90));
        hesperides.agregarExpedicion(new Expedicion("Océano Pacífico", 45));
        hesperides.agregarExpedicion(new Expedicion("Mar Caribe", 30));

        hesperides.listarExpediciones();

        // Acceder a una por índice (get)
        Expedicion primera = hesperides.getExpedicion(0);
        System.out.println("Primera expedición: " + primera.getDestino());

        // Eliminar una (remove)
        hesperides.eliminarExpedicion(2);
        System.out.println("\nDespués de eliminar la última:");
        hesperides.listarExpediciones();

        // Ventajas sobre arrays:
        System.out.println("--- Ventajas de List vs array[] ---");
        System.out.println("• Tamaño dinámico: no hace definir un tamaño fijo");
        System.out.println("• add()  → añade sin preocuparte del índice");
        System.out.println("• remove() → elimina y reordena solo");
        System.out.println("• get(i) → accede como un array");
        System.out.println("• size() → en arrays sería .length");
    }
}
