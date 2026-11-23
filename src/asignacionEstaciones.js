export class AsignacionEstaciones {

    constructor(estaciones, consultas) {
        this.estaciones = estaciones;
        this.consultas = consultas;
    }

    asignarEstacion(matricula, practica) {

        if (!this.consultas.estaInscrito(matricula, practica)) {

            console.log("Acceso rechazado: el alumno no está inscrito.");
            return;
        }

        if (this.estaciones.buscarMatricula(matricula) !== -1) {

            console.log("El alumno ya tiene una estación asignada.");
            return;
        }

        const posicion = this.estaciones.buscarLibre();

        if (posicion === -1) {

            console.log("No hay estaciones disponibles.");
            return;
        }

        this.estaciones.asignar(posicion, matricula);

        console.log("Estación asignada correctamente.");
        console.log("Matrícula: " + matricula);
        console.log("Estación: " + (posicion + 1));
    }
}
