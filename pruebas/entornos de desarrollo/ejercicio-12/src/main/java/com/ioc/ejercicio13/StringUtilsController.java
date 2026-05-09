package com.ioc.ejercicio13;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class StringUtilsController {
    
    @GetMapping("/ejercicio13")
    public String mostrarResultado(Model model) {
        String prueba = "Entorns de Desenvolupament";
        
        // Llamar a los métodos de StringUtils
        int numVocales = StringUtils.contarVocales(prueba);
        String conGuiones = StringUtils.espaciosAGuiones(prueba);
        
        // Pasar datos a la vista
        model.addAttribute("cadenaOriginal", prueba);
        model.addAttribute("numVocales", numVocales);
        model.addAttribute("conGuiones", conGuiones);
        model.addAttribute("dni", "Y8829913C");
        
        return "ejercicio13";
    }
}
