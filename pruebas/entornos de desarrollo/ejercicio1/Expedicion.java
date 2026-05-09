import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Expedicion {

    private String codigo;
    private String zonaGeografica;
    private LocalDate fechaInicio;
    private int duracion;
    private BuqueInvestigacion buque;
    private List<Asignacion> asignaciones;
    private List<Muestra> muestras;

    public Expedicion() {
        this.asignaciones = new ArrayList<Asignacion>();
        this.muestras = new ArrayList<Muestra>();
    }

    public Expedicion(String codigo, String zonaGeografica, LocalDate fechaInicio,
            int duracion, BuqueInvestigacion buque) {
        this.codigo = codigo;
        this.zonaGeografica = zonaGeografica;
        this.fechaInicio = fechaInicio;
        this.duracion = duracion;
        this.buque = buque;
        this.asignaciones = new ArrayList<Asignacion>();
        this.muestras = new ArrayList<Muestra>();
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getZonaGeografica() {
        return zonaGeografica;
    }

    public void setZonaGeografica(String zonaGeografica) {
        this.zonaGeografica = zonaGeografica;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public int getDuracion() {
        return duracion;
    }

    public void setDuracion(int duracion) {
        this.duracion = duracion;
    }

    public BuqueInvestigacion getBuque() {
        return buque;
    }

    public void setBuque(BuqueInvestigacion buque) {
        this.buque = buque;
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
