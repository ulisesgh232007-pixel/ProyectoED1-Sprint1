import { ResultadoPractica } from "./resultadoPractica.js";

// HU-D03 · Estructura: Diccionario.
// Diccionario folio_inscripcion -> resultado de la práctica, por lo que
// queda garantizado un solo resultado por inscripción.
export class ResultadosPracticas {

    constructor(inscritos) {
        this.inscritos = inscritos;
        this.resultados = new Map();
    }

    registrar(folio, { asistio, calificacion, adeudo_material, monto_adeudo }) {

        const inscripcion = this.inscritos.get(folio);

        if (!inscripcion) {
            return { ok: false, mensaje: "No existe una inscripción con ese folio." };
        }

        asistio = String(asistio).trim().toUpperCase();
        adeudo_material = String(adeudo_material).trim().toUpperCase();

        if (asistio !== "S" && asistio !== "N") {
            return { ok: false, mensaje: "Asistió debe ser S o N." };
        }

        if (adeudo_material !== "S" && adeudo_material !== "N") {
            return { ok: false, mensaje: "Adeudo de material debe ser S o N." };
        }

        if (asistio === "N") {
            calificacion = 0;
        } else {
            calificacion = Number(calificacion);

            if (Number.isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
                return { ok: false, mensaje: "La calificación debe ser un número de 0 a 10." };
            }
        }

        if (adeudo_material === "N") {
            monto_adeudo = 0;
        } else {
            monto_adeudo = Number(monto_adeudo);

            if (Number.isNaN(monto_adeudo) || monto_adeudo < 0) {
                return { ok: false, mensaje: "El monto del adeudo debe ser un número mayor o igual a 0." };
            }
        }

        const resultado = new ResultadoPractica({
            folio_inscripcion: folio,
            matricula: inscripcion.matricula,
            practica_id: inscripcion.practica_id,
            asistio,
            calificacion,
            adeudo_material,
            monto_adeudo,
        });

        const actualizado = this.resultados.has(folio);

        this.resultados.set(folio, resultado);

        return { ok: true, actualizado, resultado };
    }

    obtener(folio) {
        return this.resultados.get(folio) ?? null;
    }

    total() {
        return this.resultados.size;
    }

    pendientes() {

        const faltantes = [];

        for (const folio of this.inscritos.keys()) {

            if (!this.resultados.has(folio)) {
                faltantes.push(this.inscritos.get(folio));
            }
        }

        return faltantes;
    }

    lista() {
        return [...this.resultados.values()];
    }

    mostrarResultados() {

        if (this.resultados.size === 0) {
            console.log("No hay resultados registrados.");
            return;
        }

        console.log("\nRESULTADOS DE PRÁCTICAS (" + this.resultados.size + ")");

        for (const resultado of this.resultados.values()) {
            console.log(resultado.toString());
        }
    }
}
