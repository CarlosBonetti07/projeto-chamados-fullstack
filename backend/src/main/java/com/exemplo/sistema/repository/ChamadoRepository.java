package com.exemplo.sistema.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exemplo.sistema.model.Chamado;

@Repository
public interface ChamadoRepository extends JpaRepository<Chamado, Long> {
}
