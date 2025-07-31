package com.exemplo.sistema.service;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.exemplo.dto.AnalistaDTO;
import com.exemplo.sistema.model.Analista;
import com.exemplo.sistema.repository.AnalistaRepository;

@Service
public class AnalistaService {

	private final AnalistaRepository repository;

	public AnalistaService(AnalistaRepository repository) {
		this.repository = repository;
	}

//	public List<Analista> listarTodos() {
//		return repository.findAll();
//	}

//	public Optional<Analista> buscarPorId(Long id) {
//		return repository.findById(id);
//	}

	public Analista salvar(Analista analista) {
		return repository.save(analista);
	}

	public void deletar(Long id) {
		repository.deleteById(id);
	}
	
	public Optional<AnalistaDTO> buscarPorId(Long id) {
	    return repository.findById(id)
	        .map(analista -> {
	            AnalistaDTO dto = new AnalistaDTO();
	            dto.setId(analista.getId());
	            dto.setNome(analista.getNome());
	            if (analista.getFoto() != null) {
	                dto.setFotoBase64(Base64.getEncoder().encodeToString(analista.getFoto()));
	            }
	            return dto;
	        });
	}

	
	public List<AnalistaDTO> listarTodos() {
	    List<Analista> analistas = repository.findAll();
	    return analistas.stream().map(a -> {
	        AnalistaDTO dto = new AnalistaDTO();
	        dto.setId(a.getId());
	        dto.setNome(a.getNome());
	        if(a.getFoto() != null) {
	            dto.setFotoBase64(Base64.getEncoder().encodeToString(a.getFoto()));
	        }
	        return dto;
	    }).collect(Collectors.toList());
	}
}
