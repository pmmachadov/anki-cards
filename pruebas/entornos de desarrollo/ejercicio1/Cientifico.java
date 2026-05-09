import java.util.ArrayList;
import java.util.List;

public class Cientifico {

    private String dni;
    private String nombre;
    private Especialidad especialidad;
    private int aniosExperiencia;
    private List<Asignacion> asignaciones;
    private List<Muestra> muestras;

    public Cientifico() {
        this.asignaciones = new ArrayList<Asignacion>();
        this.muestras = new ArrayList<Muestra>();
    }

    public Cientifico(String dni, String nombre, Especialidad especialidad, int aniosExperiencia) {
        this.dni = dni;
        this.nombre = nombre;
        this.especialidad = especialidad;
        this.aniosExperiencia = aniosExperiencia;
        this.asignaciones = new ArrayList<Asignacion>();
        this.muestras = new ArrayList<Muestra>();
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Especialidad getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(Especialidad especialidad) {
        this.especialidad = especialidad;
    }

    public int getAniosExperiencia() {
        return aniosExperiencia;
    }

    public void setAniosExperiencia(int aniosExperiencia) {
        this.aniosExperiencia = aniosExperiencia;
    }

    public List<Asignacion> getAsignaciones() {
        return asignaciones;
    }

    public void setAsignaciones(List<Asignacion> asignaciones) {
        this.asignaciones = asignaciones;
    }

    public List<Muestra> getMuestras() {
        return muestras;
    }

    public void setMuestras(List<Muestra> muestras) {
        this.muestras = muestras;
    }
}
