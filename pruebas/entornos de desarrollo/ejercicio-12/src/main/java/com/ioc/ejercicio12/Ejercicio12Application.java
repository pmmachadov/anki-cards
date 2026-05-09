package com.ioc.ejercicio12;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.ioc.ejercicio12")
public class Ejercicio12Application {

	public static void main(String[] args) {
		SpringApplication.run(Ejercicio12Application.class, args);
	}

}
