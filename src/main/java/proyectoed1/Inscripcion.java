/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package proyectoed1;

public class Inscripcion {
    public String folio_inscripcion;
    public String matricula;
    public String nombre;
    public String grupo;
    public String practica_id;
    public String laboratorio;
    public String fecha;

    
    public String toString() {
        return "Folio: " + folio_inscripcion
                + " | Matrícula: " + matricula
                + " | Nombre: " + nombre
                + " | Grupo: " + grupo
                + " | Práctica: " + practica_id
                + " | Laboratorio: " + laboratorio
                + " | Fecha: " + fecha;
    }
}
