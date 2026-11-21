package proyectoed1;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ConsultaPracticas {

    private Map<String, List<Inscripcion>> practicas = new HashMap<>();

    public ConsultaPracticas(Collection<Inscripcion> inscritos) {

        for (Inscripcion alumno : inscritos) {

            practicas.putIfAbsent(
                    alumno.practica_id,
                    new ArrayList<>()
            );

            practicas.get(alumno.practica_id).add(alumno);
        }
    }

    public void mostrarPractica(String practica) {

        List<Inscripcion> alumnos = practicas.get(practica);

        if (alumnos == null || alumnos.isEmpty()) {
            System.out.println("No existen inscritos en esta práctica.");
            return;
        }

        System.out.println("\nAlumnos inscritos en " + practica);

        for (Inscripcion alumno : alumnos) {
            System.out.println(alumno);
        }
    }

    public boolean estaInscrito(String matricula, String practica) {

        List<Inscripcion> alumnos = practicas.get(practica);

        if (alumnos == null) {
            return false;
        }

        for (Inscripcion alumno : alumnos) {

            if (alumno.matricula.equals(matricula)) {
                return true;
            }
        }

        return false;
    }

    public void buscarMatricula(String matricula) {

        boolean encontrado = false;

        for (List<Inscripcion> alumnos : practicas.values()) {

            for (Inscripcion alumno : alumnos) {

                if (alumno.matricula.equals(matricula)) {
                    System.out.println(alumno);
                    encontrado = true;
                }
            }
        }

        if (!encontrado) {
            System.out.println("No se encontró la matrícula.");
        }
    }
}
