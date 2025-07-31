package com.exemplo.sistema.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exemplo.sistema.model.Analista;

@Repository
public interface AnalistaRepository extends JpaRepository<Analista, Long> { 

}
