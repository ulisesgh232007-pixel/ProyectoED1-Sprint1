package proyectoed1;

public class LiberacionEstaciones {

    private Estaciones estaciones;

    public LiberacionEstaciones(Estaciones estaciones) {
        this.estaciones = estaciones;
    }

    public void liberarEstacion(String matricula) {

        int posicion = estaciones.buscarMatricula(matricula);

        if (posicion == -1) {

            System.out.println("El alumno no tiene una estación asignada.");
            return;
        }

        estaciones.liberar(posicion);

        System.out.println("Estación liberada correctamente.");
        System.out.println("Estación: " + (posicion + 1));
    }
}
