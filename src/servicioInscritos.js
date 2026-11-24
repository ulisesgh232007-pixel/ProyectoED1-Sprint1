import { Inscripcion } from "./inscripcion.js";
import { BASE_URL } from "./config.js";

const RECURSO_INSCRITOS = "inscritos_practicas";

export class ServicioInscritos {

    async cargarInscripciones() {

        const respuesta = await fetch(
            `${BASE_URL}/${RECURSO_INSCRITOS}`,
            { signal: AbortSignal.timeout(10000) }
        );

        if (!respuesta.ok) {
            throw new Error("Error del servicio: " + respuesta.status);
        }

        const json = await respuesta.json();

        const inscritos = new Map();

        for (const dato of json.datos) {

            const alumno = new Inscripcion(dato);

            inscritos.set(alumno.folio_inscripcion, alumno);
        }

        return inscritos;
    }
}
