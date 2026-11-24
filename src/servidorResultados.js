import http from "node:http";
import { PUERTO_API } from "./config.js";

const RECURSO = "resultados_practicas";
const RUTA = `/api/v1/${RECURSO}`;

// Publica los resultados en http://localhost:8080/api/v1/... con el
// mismo formato que los servicios de prueba: lista con envoltura
// {recurso, generado, total, datos}, registro por su clave y 404.
export class ServidorResultados {

    constructor(resultados) {
        this.resultados = resultados;
        this.servidor = null;
    }

    iniciar() {

        if (this.servidor) {
            return Promise.resolve();
        }

        this.servidor = http.createServer((req, res) => this.atender(req, res));

        return new Promise((resolve) => {

            this.servidor.once("error", (e) => {
                console.log("Aviso: no se pudieron publicar los endpoints ("
                    + e.message + "). El programa continúa.");
                this.servidor = null;
                resolve();
            });

            this.servidor.listen(PUERTO_API, () => {
                console.log("Endpoints publicados en http://localhost:"
                    + PUERTO_API + RUTA);
                resolve();
            });
        });
    }

    atender(req, res) {

        const url = new URL(req.url, "http://localhost");

        if (req.method === "GET" && url.pathname === RUTA) {
            return this.responder(res, 200, this.envoltura());
        }

        if (req.method === "GET" && url.pathname.startsWith(RUTA + "/")) {

            const folio = decodeURIComponent(url.pathname.slice(RUTA.length + 1));

            const resultado = this.resultados.obtener(folio);

            if (resultado) {
                return this.responder(res, 200, resultado);
            }

            return this.responder(res, 404, { detail: "no encontrado" });
        }

        return this.responder(res, 404, { detail: "Not Found" });
    }

    envoltura() {

        const datos = this.resultados.lista();

        return {
            recurso: RECURSO,
            generado: this.ahora(),
            total: datos.length,
            datos,
        };
    }

    ahora() {

        const d = new Date();
        const p = (n) => String(n).padStart(2, "0");

        return d.getFullYear()
            + "-" + p(d.getMonth() + 1)
            + "-" + p(d.getDate())
            + "T" + p(d.getHours())
            + ":" + p(d.getMinutes());
    }

    responder(res, codigo, cuerpo) {

        res.writeHead(codigo, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        });

        res.end(JSON.stringify(cuerpo));
    }

    detener() {

        if (this.servidor) {
            this.servidor.close();
            this.servidor = null;
        }
    }
}
