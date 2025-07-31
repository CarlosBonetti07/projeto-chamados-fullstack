package com.exemplo.converter;

import com.exemplo.dto.ChamadoBranchesDTO;
import com.exemplo.sistema.model.Chamado;
import com.exemplo.sistema.model.ChamadoBranches;

public class ChamadoBranchesConverter {

	public static ChamadoBranchesDTO toDTO(ChamadoBranches entity) {
		if (entity == null) {
			return null;
		}

		ChamadoBranchesDTO dto = new ChamadoBranchesDTO();

		dto.setId(entity.getId());

		// Para evitar LazyInitializationException, só pegar o ID do Chamado se não for
		// null
		if (entity.getChamado() != null) {
			dto.setChamadoId(entity.getChamado().getId());
		}

		dto.setBranchName(entity.getBranchName());
		dto.setObjectId(entity.getObjectId());
		dto.setCreatorId(entity.getCreatorId());
		dto.setCreatorName(entity.getCreatorName());
		dto.setCreatorEmail(entity.getCreatorEmail());
		dto.setBranchUrl(entity.getBranchUrl());
		dto.setCreatorAvatarUrl(entity.getCreatorAvatarUrl());
		dto.setCreatorImageUrl(entity.getCreatorImageUrl());
		dto.setCreatorDescriptor(entity.getCreatorDescriptor());
		dto.setCreatorUrl(entity.getCreatorUrl());
		dto.setCreatedAt(entity.getCreatedAt());

		return dto;
	}

	public static ChamadoBranches toEntity(ChamadoBranchesDTO dto, Chamado chamado) {
		if (dto == null) {
			return null;
		}

		ChamadoBranches entity = new ChamadoBranches();

		entity.setId(dto.getId());
		entity.setChamado(chamado);
		entity.setBranchName(dto.getBranchName());
		entity.setObjectId(dto.getObjectId());
		entity.setCreatorId(dto.getCreatorId());
		entity.setCreatorName(dto.getCreatorName());
		entity.setCreatorEmail(dto.getCreatorEmail());
		entity.setBranchUrl(dto.getBranchUrl());
		entity.setCreatorAvatarUrl(dto.getCreatorAvatarUrl());
		entity.setCreatorImageUrl(dto.getCreatorImageUrl());
		entity.setCreatorDescriptor(dto.getCreatorDescriptor());
		entity.setCreatorUrl(dto.getCreatorUrl());
		entity.setCreatedAt(dto.getCreatedAt());

		return entity;
	}
}
