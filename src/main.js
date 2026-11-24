import readline from "node:readline/promises";
import { ServicioInscritos } from "./servicioInscritos.js";
import { ConsultaPracticas } from "./consultaPracticas.js";
import { Estaciones } from "./estaciones.js";
import { AsignacionEstaciones } from "./asignacionEstaciones.js";
import { LiberacionEstaciones } from "./liberacionEstaciones.js";
import { ResultadosPracticas } from "./resultadosPracticas.js";
import { ServidorResultados } from "./servidorResultados.js";

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

    const inscritos = new Map();

    const estaciones = new Estaciones();

    const liberaciones = new LiberacionEstaciones(estaciones);

    const resultados = new ResultadosPracticas(inscritos);

    const servidor = new ServidorResultados(resultados);

    await servidor.iniciar();

    let consultas = new ConsultaPracticas(inscritos.values());

    let asignaciones = new AsignacionEstaciones(estaciones, consultas);

    // HU-D13: si el servicio no responde, el programa avisa y no se
    // detiene; la conexión se puede reintentar desde el menú.
    const conectar = async () => {

        try {

            const nuevos = await servicio.cargarInscripciones();

            inscritos.clear();

            for (const [folio, alumno] of nuevos) {
                inscritos.set(folio, alumno);
            }

            consultas = new ConsultaPracticas(inscritos.values());

            asignaciones = new AsignacionEstaciones(estaciones, consultas);

            console.log("Conexión realizada correctamente.");
            console.log("Total de inscripciones: " + inscritos.size);

            return true;

        } catch (e) {

            console.log("Aviso: no se pudo conectar al servicio.");
            console.log(e.message);
            console.log("El programa continúa sin datos; "
                + "usa la opción 10 para reintentar.");

            return false;
        }
    };

    await conectar();

    const registrarResultado = async () => {

        if (inscritos.size === 0) {
            console.log("No hay inscripciones cargadas.");
            return;
        }

        const pendientes = resultados.pendientes();

        console.log("\nInscripciones sin resultado: "
            + pendientes.length + " de " + inscritos.size);

        for (const alumno of pendientes) {
            console.log(alumno.folio_inscripcion
                + " | " + alumno.matricula
                + " | " + alumno.nombre
                + " | " + alumno.practica_id);
        }

        const folio = await leer("\nIngresa el folio_inscripcion: ");

        const inscripcion = inscritos.get(folio);

        if (!inscripcion) {
            console.log("No existe una inscripción con ese folio.");
            return;
        }

        if (resultados.obtener(folio)) {
            console.log("Ese folio ya tiene resultado; se actualizará.");
        }

        const asistio = await leer("¿Asistió? (S/N): ");

        let calificacion = 0;

        if (asistio.trim().toUpperCase() === "S") {
            calificacion = await leer("Calificación (0 a 10): ");
        }

        const adeudo = await leer("¿Adeudo de material? (S/N): ");

        let monto = 0;

        if (adeudo.trim().toUpperCase() === "S") {
            monto = await leer("Monto del adeudo: ");
        }

        const respuesta = resultados.registrar(folio, {
            asistio,
            calificacion,
            adeudo_material: adeudo,
            monto_adeudo: monto,
        });

        if (!respuesta.ok) {
            console.log(respuesta.mensaje);
            return;
        }

        console.log(respuesta.actualizado
            ? "Resultado actualizado."
            : "Resultado registrado.");

        console.log(respuesta.resultado.toString());
    };

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
            console.log("8. Registrar resultado de práctica");
            console.log("9. Mostrar resultados registrados");
            console.log("10. Reintentar conexión con el servicio");
            console.log("11. Salir");

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

                    await registrarResultado();

                    break;

                case 9:

                    resultados.mostrarResultados();

                    break;

                case 10:

                    await conectar();

                    break;

                case 11:

                    console.log("Programa finalizado.");

                    break;

                default:

                    console.log("Opción no válida.");
            }

        } while (opcion !== 11);

    } catch (e) {

        if (!(e instanceof EOFError)) {
            throw e;
        }

    } finally {

        servidor.detener();
        entrada.close();
    }
}

main();
