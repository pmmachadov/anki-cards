package com.ioc.ejercicio13;

public class StringUtils {
    
    public static int contarVocales(String cadena) {
        int contador = 0;
        String vocales = "aeiouAEIOU";
        
        for (int i = 0; i < cadena.length(); i++) {
            if (vocales.indexOf(cadena.charAt(i)) != -1) {
                contador++;
            }
        }
        
        return contador;
    }

    public static String espaciosAGuiones(String cadena) {
        return cadena.replace(" ", "_");
    }
    
    public static void main(String[] args) {
        String prueba = "Entorns de Desenvolupament";
        
        System.out.println("Cadena original: " + prueba);
        System.out.println("Número de vocales: " + contarVocales(prueba));
        System.out.println("Con guiones: " + espaciosAGuiones(prueba));
    }
}
