import { Inscripcion } from "./inscripcion.js";

const URL = "https://servicios-proyecto-ed.vercel.app/api/v1/inscritos_practicas";

export class ServicioInscritos {

    async cargarInscripciones() {

        const respuesta = await fetch(URL);

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
