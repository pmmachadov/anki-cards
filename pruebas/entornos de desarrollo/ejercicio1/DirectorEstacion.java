public class DirectorEstacion extends Cientifico {

    private double presupuestoAsignado;

    public DirectorEstacion() {
        super();
    }

    public DirectorEstacion(String dni, String nombre, Especialidad especialidad,
            int aniosExperiencia, double presupuestoAsignado) {
        super(dni, nombre, especialidad, aniosExperiencia);
        this.presupuestoAsignado = presupuestoAsignado;
    }

    public double getPresupuestoAsignado() {
        return presupuestoAsignado;
    }

    public void setPresupuestoAsignado(double presupuestoAsignado) {
        this.presupuestoAsignado = presupuestoAsignado;
    }
}
