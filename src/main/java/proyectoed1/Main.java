package proyectoed1;

import java.io.IOException;
import java.util.Map;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);

        ServicioInscritos servicio = new ServicioInscritos();

        Map<String, Inscripcion> inscritos = null;

        try {

            inscritos = servicio.cargarInscripciones();

            System.out.println("Conexión realizada correctamente.");
            System.out.println("Total de inscripciones: " + inscritos.size());

        } catch (IOException | InterruptedException e) {

            System.out.println("No se pudo conectar al servicio.");
            System.out.println(e.getMessage());

            entrada.close();
            return;
        }

        ConsultaPracticas consultas =
                new ConsultaPracticas(inscritos.values());

        Estaciones estaciones = new Estaciones();

        AsignacionEstaciones asignaciones =
                new AsignacionEstaciones(estaciones, consultas);

        LiberacionEstaciones liberaciones =
                new LiberacionEstaciones(estaciones);

        int opcion;

        do {

            System.out.println("\n===== PROYECTO ED1 =====");
            System.out.println("1. Mostrar total de inscripciones");
            System.out.println("2. Buscar matrícula");
            System.out.println("3. Consultar práctica");
            System.out.println("4. Validar inscripción");
            System.out.println("5. Mostrar estaciones");
            System.out.println("6. Asignar estación");
            System.out.println("7. Liberar estación");
            System.out.println("8. Salir");
            System.out.print("Selecciona una opción: ");

            opcion = entrada.nextInt();
            entrada.nextLine();

            switch (opcion) {

                case 1:

                    System.out.println(
                            "Total de inscripciones: " + inscritos.size()
                    );

                    break;

                case 2:

                    System.out.print("Ingresa la matrícula: ");
                    String matriculaBusqueda = entrada.nextLine();

                    consultas.buscarMatricula(matriculaBusqueda);

                    break;

                case 3:

                    System.out.print("Ingresa la práctica (ejemplo PR-03): ");
                    String practica = entrada.nextLine();

                    consultas.mostrarPractica(practica);

                    break;

                case 4:

                    System.out.print("Ingresa la matrícula: ");
                    String matriculaValidar = entrada.nextLine();

                    System.out.print("Ingresa la práctica: ");
                    String practicaValidar = entrada.nextLine();

                    if (consultas.estaInscrito(
                            matriculaValidar,
                            practicaValidar)) {

                        System.out.println("Acceso permitido.");

                    } else {

                        System.out.println("Acceso rechazado.");
                    }

                    break;

                case 5:

                    estaciones.mostrarEstaciones();

                    break;

                case 6:

                    System.out.print("Ingresa la matrícula: ");
                    String matriculaAsignar = entrada.nextLine();

                    System.out.print("Ingresa la práctica: ");
                    String practicaAsignar = entrada.nextLine();

                    asignaciones.asignarEstacion(
                            matriculaAsignar,
                            practicaAsignar
                    );

                    break;

                case 7:

                    System.out.print("Ingresa la matrícula: ");
                    String matriculaLiberar = entrada.nextLine();

                    liberaciones.liberarEstacion(matriculaLiberar);

                    break;

                case 8:

                    System.out.println("Programa finalizado.");

                    break;

                default:

                    System.out.println("Opción no válida.");
            }

        } while (opcion != 8);

        entrada.close();
    }
}
