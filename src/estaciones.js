export class Estaciones {

    constructor() {
        this.estaciones = new Array(25).fill(null);
    }

    buscarLibre() {

        for (let i = 0; i < this.estaciones.length; i++) {

            if (this.estaciones[i] === null) {
                return i;
            }
        }

        return -1;
    }

    asignar(posicion, matricula) {

        if (posicion < 0 || posicion >= this.estaciones.length) {
            return false;
        }

        if (this.estaciones[posicion] !== null) {
            return false;
        }

        this.estaciones[posicion] = matricula;

        return true;
    }

    buscarMatricula(matricula) {

        for (let i = 0; i < this.estaciones.length; i++) {

            if (this.estaciones[i] === matricula) {
                return i;
            }
        }

        return -1;
    }

    liberar(posicion) {

        if (posicion < 0 || posicion >= this.estaciones.length) {
            return false;
        }

        if (this.estaciones[posicion] === null) {
            return false;
        }

        this.estaciones[posicion] = null;

        return true;
    }

    mostrarEstaciones() {

        console.log("\nESTACIONES DEL LABORATORIO");

        for (let i = 0; i < this.estaciones.length; i++) {

            if (this.estaciones[i] === null) {
                console.log("Estación " + (i + 1) + ": LIBRE");
            } else {
                console.log("Estación " + (i + 1)
                    + ": " + this.estaciones[i]);
            }
        }
    }

    hayEspacio() {
        return this.buscarLibre() !== -1;
    }
}
