export class ConsultaPracticas {

    constructor(inscritos) {

        this.practicas = new Map();

        for (const alumno of inscritos) {

            if (!this.practicas.has(alumno.practica_id)) {
                this.practicas.set(alumno.practica_id, []);
            }

            this.practicas.get(alumno.practica_id).push(alumno);
        }
    }

    mostrarPractica(practica) {

        const alumnos = this.practicas.get(practica);

        if (!alumnos || alumnos.length === 0) {
            console.log("No existen inscritos en esta práctica.");
            return;
        }

        console.log("\nAlumnos inscritos en " + practica);

        for (const alumno of alumnos) {
            console.log(alumno.toString());
        }
    }

    estaInscrito(matricula, practica) {

        const alumnos = this.practicas.get(practica);

        if (!alumnos) {
            return false;
        }

        for (const alumno of alumnos) {

            if (alumno.matricula === matricula) {
                return true;
            }
        }

        return false;
    }

    buscarMatricula(matricula) {

        let encontrado = false;

        for (const alumnos of this.practicas.values()) {

            for (const alumno of alumnos) {

                if (alumno.matricula === matricula) {
                    console.log(alumno.toString());
                    encontrado = true;
                }
            }
        }

        if (!encontrado) {
            console.log("No se encontró la matrícula.");
        }
    }
}
