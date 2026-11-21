package proyectoed1;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

public class ServicioInscritos {

    private final String URL = "https://servicios-proyecto-ed.vercel.app/api/v1/inscritos_practicas";

    public Map<String, Inscripcion> cargarInscripciones()
            throws IOException, InterruptedException {

        HttpClient cliente = HttpClient.newHttpClient();

        HttpRequest solicitud = HttpRequest.newBuilder()
                .uri(URI.create(URL))
                .GET()
                .build();

        HttpResponse<String> respuesta = cliente.send(
                solicitud,
                HttpResponse.BodyHandlers.ofString()
        );

        if (respuesta.statusCode() != 200) {
            throw new IOException("Error del servicio: " + respuesta.statusCode());
        }

        JsonObject json = JsonParser.parseString(respuesta.body()).getAsJsonObject();

        JsonArray datos = json.getAsJsonArray("datos");

        Map<String, Inscripcion> inscritos = new LinkedHashMap<>();

        Gson gson = new Gson();

        for (int i = 0; i < datos.size(); i++) {

            Inscripcion alumno = gson.fromJson(datos.get(i), Inscripcion.class);

            inscritos.put(alumno.folio_inscripcion, alumno);
        }

        return inscritos;
    }
}