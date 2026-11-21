package proyectoed1;

public class Estaciones {

    private String[] estaciones = new String[25];

    public int buscarLibre() {

        for (int i = 0; i < estaciones.length; i++) {

            if (estaciones[i] == null) {
                return i;
            }
        }

        return -1;
    }

    public boolean asignar(int posicion, String matricula) {

        if (posicion < 0 || posicion >= estaciones.length) {
            return false;
        }

        if (estaciones[posicion] != null) {
            return false;
        }

        estaciones[posicion] = matricula;

        return true;
    }

    public int buscarMatricula(String matricula) {

        for (int i = 0; i < estaciones.length; i++) {

            if (matricula.equals(estaciones[i])) {
                return i;
            }
        }

        return -1;
    }

    public boolean liberar(int posicion) {

        if (posicion < 0 || posicion >= estaciones.length) {
            return false;
        }

        if (estaciones[posicion] == null) {
            return false;
        }

        estaciones[posicion] = null;

        return true;
    }

    public void mostrarEstaciones() {

        System.out.println("\nESTACIONES DEL LABORATORIO");

        for (int i = 0; i < estaciones.length; i++) {

            if (estaciones[i] == null) {
                System.out.println("Estación " + (i + 1) + ": LIBRE");
            } else {
                System.out.println("Estación " + (i + 1)
                        + ": " + estaciones[i]);
            }
        }
    }

    public boolean hayEspacio() {
        return buscarLibre() != -1;
    }
}
