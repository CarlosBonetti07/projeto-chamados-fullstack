package com.exemplo.dto;

import java.time.LocalDateTime;

public class ChamadoBranchesDTO {

	private Long id;
	private Long chamadoId; // só o id do chamado para evitar carregar toda a entidade
	private String branchName;
	private String objectId;
	private String creatorId;
	private String creatorName;
	private String creatorEmail;
	private String branchUrl;
	private String creatorAvatarUrl;
	private String creatorImageUrl;
	private String creatorDescriptor;
	private String creatorUrl;
	private LocalDateTime createdAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getChamadoId() {
		return chamadoId;
	}

	public void setChamadoId(Long chamadoId) {
		this.chamadoId = chamadoId;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getObjectId() {
		return objectId;
	}

	public void setObjectId(String objectId) {
		this.objectId = objectId;
	}

	public String getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(String creatorId) {
		this.creatorId = creatorId;
	}

	public String getCreatorName() {
		return creatorName;
	}

	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
	}

	public String getCreatorEmail() {
		return creatorEmail;
	}

	public void setCreatorEmail(String creatorEmail) {
		this.creatorEmail = creatorEmail;
	}

	public String getBranchUrl() {
		return branchUrl;
	}

	public void setBranchUrl(String branchUrl) {
		this.branchUrl = branchUrl;
	}

	public String getCreatorAvatarUrl() {
		return creatorAvatarUrl;
	}

	public void setCreatorAvatarUrl(String creatorAvatarUrl) {
		this.creatorAvatarUrl = creatorAvatarUrl;
	}

	public String getCreatorImageUrl() {
		return creatorImageUrl;
	}

	public void setCreatorImageUrl(String creatorImageUrl) {
		this.creatorImageUrl = creatorImageUrl;
	}

	public String getCreatorDescriptor() {
		return creatorDescriptor;
	}

	public void setCreatorDescriptor(String creatorDescriptor) {
		this.creatorDescriptor = creatorDescriptor;
	}

	public String getCreatorUrl() {
		return creatorUrl;
	}

	public void setCreatorUrl(String creatorUrl) {
		this.creatorUrl = creatorUrl;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

}