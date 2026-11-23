export class LiberacionEstaciones {

    constructor(estaciones) {
        this.estaciones = estaciones;
    }

    liberarEstacion(matricula) {

        const posicion = this.estaciones.buscarMatricula(matricula);

        if (posicion === -1) {

            console.log("El alumno no tiene una estación asignada.");
            return;
        }

        this.estaciones.liberar(posicion);

        console.log("Estación liberada correctamente.");
        console.log("Estación: " + (posicion + 1));
    }
}
