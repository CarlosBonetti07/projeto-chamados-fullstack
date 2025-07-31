package com.exemplo.sistema.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exemplo.dto.AnalistaDTO;
import com.exemplo.sistema.service.AnalistaService;

@RestController
@RequestMapping("/api/analistas")
@CrossOrigin(origins = "*")
public class AnalistaController {

	private final AnalistaService service;

	public AnalistaController(AnalistaService service) {
		this.service = service;
	}

	@GetMapping("/{id}")
	public ResponseEntity<AnalistaDTO> buscar(@PathVariable Long id) {
		return service.buscarPorId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@GetMapping
	public List<AnalistaDTO> listar() {
		return service.listarTodos();
	}

}