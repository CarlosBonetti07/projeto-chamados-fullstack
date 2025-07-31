package com.exemplo.sistema.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exemplo.converter.ChamadoBranchesConverter;
import com.exemplo.dto.ChamadoBranchesDTO;
import com.exemplo.sistema.model.ChamadoBranches;
import com.exemplo.sistema.service.ChamadoBranchesService;

@RestController
@RequestMapping("/api/chamado-branches")
@CrossOrigin(origins = "*")
public class ChamadoBranchesController {

	private final ChamadoBranchesService service;

	public ChamadoBranchesController(ChamadoBranchesService service) {
		this.service = service;
	}

//	@GetMapping
//	public List<ChamadoBranches> listar() {
//		return service.listarTodos();
//	}

	@GetMapping
	public List<ChamadoBranchesDTO> listar() {
	    List<ChamadoBranches> entities = service.listarTodos();
	    return entities.stream().map(ChamadoBranchesConverter::toDTO).toList();
	}

	@GetMapping("/por-chamado/{idChamado}")
	public List<ChamadoBranchesDTO> listarPorChamado(@PathVariable Long idChamado) {
	    List<ChamadoBranches> entities = service.listarPorChamado(idChamado);
	    return entities.stream().map(ChamadoBranchesConverter::toDTO).toList();
	}

	
	@GetMapping("/{id}")
	public ResponseEntity<ChamadoBranches> buscar(@PathVariable Long id) {
		return service.buscarPorId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public ChamadoBranches criar(@RequestBody ChamadoBranches chamadoBranches) {
		return service.salvar(chamadoBranches);
	}

	@PostMapping("/lote/{idChamado}")
	public ResponseEntity<Void> atualizarBranchesPorChamado(@PathVariable Long idChamado, @RequestBody List<ChamadoBranches> branches) {
	    service.atualizarBranchesPorChamado(idChamado, branches);
	    return ResponseEntity.ok().build();
	}


	@PutMapping("/{id}")
	public ResponseEntity<ChamadoBranches> atualizar(@PathVariable Long id, @RequestBody ChamadoBranches chamadoBranches) {
		return service.buscarPorId(id).map(cb -> {
			chamadoBranches.setId(cb.getId());
			return ResponseEntity.ok(service.salvar(chamadoBranches));
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletar(@PathVariable Long id) {
		if (service.buscarPorId(id).isPresent()) {
			service.deletar(id);
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
}
