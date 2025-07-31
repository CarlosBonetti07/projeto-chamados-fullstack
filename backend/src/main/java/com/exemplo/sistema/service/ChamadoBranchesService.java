package com.exemplo.sistema.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.exemplo.sistema.model.Chamado;
import com.exemplo.sistema.model.ChamadoBranches;
import com.exemplo.sistema.repository.ChamadoBranchesRepository;

import jakarta.transaction.Transactional;

@Service
public class ChamadoBranchesService {

	// @Autowired Verificar em cada service
	private final ChamadoBranchesRepository repository;
	private final ChamadoService chamadoService;

	public ChamadoBranchesService(ChamadoBranchesRepository repository, ChamadoService chamadoService) {
		this.repository = repository;
		this.chamadoService = chamadoService;
	}

	public List<ChamadoBranches> listarTodos() {
		return repository.findAll();
	}

	public List<ChamadoBranches> listarPorChamado(Long idChamado) {
		return repository.findByChamadoId(idChamado);
	}

	public Optional<ChamadoBranches> buscarPorId(Long id) {
		return repository.findById(id);
	}

	public ChamadoBranches salvar(ChamadoBranches chamadoBranches) {

		if (chamadoBranches.getChamado() == null) {
			chamadoBranches.setChamado(this.chamadoService.buscarPorId(2l).get());
		}

		return repository.save(chamadoBranches);
	}

	public void deletar(Long id) {
		repository.deleteById(id);
	}

	@Transactional
	public void atualizarBranchesPorChamado(Long idChamado, List<ChamadoBranches> novosBranches) {
		Chamado chamado = chamadoService.buscarPorId(idChamado)
				.orElseThrow(() -> new RuntimeException("Chamado não encontrado"));

		// Remove os antigos
		repository.deleteByChamadoId(idChamado);

		// Salva os novos
		for (ChamadoBranches branch : novosBranches) {
			branch.setId(null); // Evita conflito de ID antigo
			branch.setChamado(chamado);
			repository.save(branch);
		}
	}

}
