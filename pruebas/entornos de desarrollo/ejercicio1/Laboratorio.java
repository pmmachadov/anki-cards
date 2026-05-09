import java.util.ArrayList;
import java.util.List;

public class Laboratorio {

    private String nombre;
    private int nivelBioseguridad;
    private List<Muestra> muestras;

    public Laboratorio() {
        this.muestras = new ArrayList<Muestra>();
    }

    public Laboratorio(String nombre, int nivelBioseguridad) {
        this.nombre = nombre;
        this.nivelBioseguridad = nivelBioseguridad;
        this.muestras = new ArrayList<Muestra>();
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getNivelBioseguridad() {
        return nivelBioseguridad;
    }

    public void setNivelBioseguridad(int nivelBioseguridad) {
        this.nivelBioseguridad = nivelBioseguridad;
    }

    public List<Muestra> getMuestras() {
        return muestras;
    }

    public void setMuestras(List<Muestra> muestras) {
        this.muestras = muestras;
    }
}
