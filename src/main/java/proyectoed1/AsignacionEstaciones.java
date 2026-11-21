package proyectoed1;

public class AsignacionEstaciones {

    private Estaciones estaciones;
    private ConsultaPracticas consultas;

    public AsignacionEstaciones(
            Estaciones estaciones,
            ConsultaPracticas consultas) {

        this.estaciones = estaciones;
        this.consultas = consultas;
    }

    public void asignarEstacion(String matricula, String practica) {

        if (!consultas.estaInscrito(matricula, practica)) {

            System.out.println("Acceso rechazado: el alumno no está inscrito.");
            return;
        }

        if (estaciones.buscarMatricula(matricula) != -1) {

            System.out.println("El alumno ya tiene una estación asignada.");
            return;
        }

        int posicion = estaciones.buscarLibre();

        if (posicion == -1) {

            System.out.println("No hay estaciones disponibles.");
            return;
        }

        estaciones.asignar(posicion, matricula);

        System.out.println("Estación asignada correctamente.");
        System.out.println("Matrícula: " + matricula);
        System.out.println("Estación: " + (posicion + 1));
    }
}
