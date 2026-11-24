// HU-D03 · Sprint 2 — Equipo 1 · Prácticas y estaciones
// Un resultado por inscripción, con los campos del formato JSON
// del recurso resultados_practicas.
export class ResultadoPractica {

    constructor({ folio_inscripcion, matricula, practica_id, asistio, calificacion, adeudo_material, monto_adeudo }) {
        this.folio_inscripcion = folio_inscripcion;
        this.matricula = matricula;
        this.practica_id = practica_id;
        this.asistio = asistio;
        this.calificacion = calificacion;
        this.adeudo_material = adeudo_material;
        this.monto_adeudo = monto_adeudo;
    }

    toString() {
        return "Folio: " + this.folio_inscripcion
            + " | Matrícula: " + this.matricula
            + " | Práctica: " + this.practica_id
            + " | Asistió: " + this.asistio
            + " | Calificación: " + this.calificacion
            + " | Adeudo: " + this.adeudo_material
            + " | Monto: " + this.monto_adeudo;
    }
}
