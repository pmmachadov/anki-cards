package com.ioc.ejercicio12;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class CalculadoraController {

    @PostMapping("/calcular")
    public String calcular(@RequestParam double numero, Model model) {
        double resultado = numero * 5;
        
        model.addAttribute("numero", numero);
        model.addAttribute("resultado", resultado);
        model.addAttribute("dni", "Y8829913C");
        
        return "resultado";
    }
}