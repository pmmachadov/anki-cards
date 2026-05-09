public class Asignacion {

    private Rol rol;
    private int numeroHorasTotales;
    private Cientifico cientifico;
    private Expedicion expedicion;

    public Asignacion() {
    }

    public Asignacion(Rol rol, int numeroHorasTotales, Cientifico cientifico, Expedicion expedicion) {
        this.rol = rol;
        this.numeroHorasTotales = numeroHorasTotales;
        this.cientifico = cientifico;
        this.expedicion = expedicion;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public int getNumeroHorasTotales() {
        return numeroHorasTotales;
    }

    public void setNumeroHorasTotales(int numeroHorasTotales) {
        this.numeroHorasTotales = numeroHorasTotales;
    }

    public Cientifico getCientifico() {
        return cientifico;
    }

    public void setCientifico(Cientifico cientifico) {
        this.cientifico = cientifico;
    }

    public Expedicion getExpedicion() {
        return expedicion;
    }

    public void setExpedicion(Expedicion expedicion) {
        this.expedicion = expedicion;
    }
}
