import java.util.ArrayList;
import java.util.List;

public class BuqueInvestigacion {

    private String nombre;
    private double eslora;
    private int capacidadMaximaTripulacion;
    private List<Expedicion> expediciones;

    public BuqueInvestigacion() {
        this.expediciones = new ArrayList<Expedicion>();
    }

    public BuqueInvestigacion(String nombre, double eslora, int capacidadMaximaTripulacion) {
        this.nombre = nombre;
        this.eslora = eslora;
        this.capacidadMaximaTripulacion = capacidadMaximaTripulacion;
        this.expediciones = new ArrayList<Expedicion>();
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double getEslora() {
        return eslora;
    }

    public void setEslora(double eslora) {
        this.eslora = eslora;
    }

    public int getCapacidadMaximaTripulacion() {
        return capacidadMaximaTripulacion;
    }

    public void setCapacidadMaximaTripulacion(int capacidadMaximaTripulacion) {
        this.capacidadMaximaTripulacion = capacidadMaximaTripulacion;
    }

    public List<Expedicion> getExpediciones() {
        return expediciones;
    }

    public void setExpediciones(List<Expedicion> expediciones) {
        this.expediciones = expediciones;
    }
}
