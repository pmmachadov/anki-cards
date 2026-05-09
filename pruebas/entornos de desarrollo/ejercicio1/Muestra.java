import java.util.ArrayList;
import java.util.List;

public class Muestra {

    private String codigo;
    private String tipo;
    private double profundidadRecogida;
    private Expedicion expedicion;
    private Cientifico cientifico;
    private List<Laboratorio> laboratorios;

    public Muestra() {
        this.laboratorios = new ArrayList<Laboratorio>();
    }

    public Muestra(String codigo, String tipo, double profundidadRecogida,
            Expedicion expedicion, Cientifico cientifico) {
        this.codigo = codigo;
        this.tipo = tipo;
        this.profundidadRecogida = profundidadRecogida;
        this.expedicion = expedicion;
        this.cientifico = cientifico;
        this.laboratorios = new ArrayList<Laboratorio>();
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public double getProfundidadRecogida() {
        return profundidadRecogida;
    }

    public void setProfundidadRecogida(double profundidadRecogida) {
        this.profundidadRecogida = profundidadRecogida;
    }

    public Expedicion getExpedicion() {
        return expedicion;
    }

    public void setExpedicion(Expedicion expedicion) {
        this.expedicion = expedicion;
    }

    public Cientifico getCientifico() {
        return cientifico;
    }

    public void setCientifico(Cientifico cientifico) {
        this.cientifico = cientifico;
    }

    public List<Laboratorio> getLaboratorios() {
        return laboratorios;
    }

    public void setLaboratorios(List<Laboratorio> laboratorios) {
        this.laboratorios = laboratorios;
    }
}
