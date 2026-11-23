export class Inscripcion {
    constructor({ folio_inscripcion, matricula, nombre, grupo, practica_id, laboratorio, fecha }) {
        this.folio_inscripcion = folio_inscripcion;
        this.matricula = matricula;
        this.nombre = nombre;
        this.grupo = grupo;
        this.practica_id = practica_id;
        this.laboratorio = laboratorio;
        this.fecha = fecha;
    }

    toString() {
        return "Folio: " + this.folio_inscripcion
            + " | Matrícula: " + this.matricula
            + " | Nombre: " + this.nombre
            + " | Grupo: " + this.grupo
            + " | Práctica: " + this.practica_id
            + " | Laboratorio: " + this.laboratorio
            + " | Fecha: " + this.fecha;
    }
}
