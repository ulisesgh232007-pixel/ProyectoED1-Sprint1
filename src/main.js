import readline from "node:readline/promises";
import { ServicioInscritos } from "./servicioInscritos.js";
import { ConsultaPracticas } from "./consultaPracticas.js";
import { Estaciones } from "./estaciones.js";
import { AsignacionEstaciones } from "./asignacionEstaciones.js";
import { LiberacionEstaciones } from "./liberacionEstaciones.js";

class EOFError extends Error {}

async function main() {

    const entrada = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const lineas = entrada[Symbol.asyncIterator]();

    const leer = async (mensaje) => {
        process.stdout.write(mensaje);
        const { value, done } = await lineas.next();
        if (done) {
            throw new EOFError();
        }
        return value;
    };

    const servicio = new ServicioInscritos();

    let inscritos;

    try {

        inscritos = await servicio.cargarInscripciones();

        console.log("Conexión realizada correctamente.");
        console.log("Total de inscripciones: " + inscritos.size);

    } catch (e) {

        console.log("No se pudo conectar al servicio.");
        console.log(e.message);

        entrada.close();
        return;
    }

    const consultas = new ConsultaPracticas(inscritos.values());

    const estaciones = new Estaciones();

    const asignaciones = new AsignacionEstaciones(estaciones, consultas);

    const liberaciones = new LiberacionEstaciones(estaciones);

    let opcion;

    try {

        do {

            console.log("\n===== PROYECTO ED1 =====");
            console.log("1. Mostrar total de inscripciones");
            console.log("2. Buscar matrícula");
            console.log("3. Consultar práctica");
            console.log("4. Validar inscripción");
            console.log("5. Mostrar estaciones");
            console.log("6. Asignar estación");
            console.log("7. Liberar estación");
            console.log("8. Salir");

            const respuesta = await leer("Selecciona una opción: ");
            opcion = Number.parseInt(respuesta, 10);

            switch (opcion) {

                case 1:

                    console.log(
                        "Total de inscripciones: " + inscritos.size
                    );

                    break;

                case 2: {

                    const matriculaBusqueda = await leer("Ingresa la matrícula: ");

                    consultas.buscarMatricula(matriculaBusqueda);

                    break;
                }

                case 3: {

                    const practica = await leer("Ingresa la práctica (ejemplo PR-03): ");

                    consultas.mostrarPractica(practica);

                    break;
                }

                case 4: {

                    const matriculaValidar = await leer("Ingresa la matrícula: ");

                    const practicaValidar = await leer("Ingresa la práctica: ");

                    if (consultas.estaInscrito(
                        matriculaValidar,
                        practicaValidar)) {

                        console.log("Acceso permitido.");

                    } else {

                        console.log("Acceso rechazado.");
                    }

                    break;
                }

                case 5:

                    estaciones.mostrarEstaciones();

                    break;

                case 6: {

                    const matriculaAsignar = await leer("Ingresa la matrícula: ");

                    const practicaAsignar = await leer("Ingresa la práctica: ");

                    asignaciones.asignarEstacion(
                        matriculaAsignar,
                        practicaAsignar
                    );

                    break;
                }

                case 7: {

                    const matriculaLiberar = await leer("Ingresa la matrícula: ");

                    liberaciones.liberarEstacion(matriculaLiberar);

                    break;
                }

                case 8:

                    console.log("Programa finalizado.");

                    break;

                default:

                    console.log("Opción no válida.");
            }

        } while (opcion !== 8);

    } catch (e) {

        if (!(e instanceof EOFError)) {
            throw e;
        }
    }

    entrada.close();
}

main();
