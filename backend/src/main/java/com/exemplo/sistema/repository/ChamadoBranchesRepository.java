package com.exemplo.sistema.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exemplo.sistema.model.ChamadoBranches;

@Repository
public interface ChamadoBranchesRepository extends JpaRepository<ChamadoBranches, Long> {

	List<ChamadoBranches> findByChamadoId(Long idChamado);
	
//	@Modifying
//	@Query("DELETE FROM CHAMADO_BRANCHES CB WHERE CB.CHAMADO.ID = :idChamado")
//	void deleteByChamadoId(@Param("idChamado") Long idChamado);
	
    void deleteByChamadoId(Long chamadoId);

}
