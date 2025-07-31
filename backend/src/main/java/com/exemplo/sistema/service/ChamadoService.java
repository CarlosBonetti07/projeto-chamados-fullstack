package com.exemplo.sistema.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.exemplo.sistema.model.Chamado;
import com.exemplo.sistema.repository.ChamadoRepository;
@Service
public class ChamadoService {

    private final ChamadoRepository repository;

    public ChamadoService(ChamadoRepository repository) {
        this.repository = repository;
    }

    public List<Chamado> listarTodos() {
        return repository.findAll();
    }

    public Optional<Chamado> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Chamado salvar(Chamado chamado) {
        return repository.save(chamado);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
