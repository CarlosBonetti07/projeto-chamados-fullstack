package com.exemplo.sistema.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "CHAMADO_BRANCHES")
public class ChamadoBranches {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// Relacionamento com Chamado (ID_CHAMADO)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ID_CHAMADO", nullable = false)
	private Chamado chamado;

	@Column(name = "BRANCH_NAME", nullable = false, length = 300)
	private String branchName;

	@Column(name = "OBJECT_ID", nullable = false, length = 40)
	private String objectId;

	@Column(name = "CREATOR_ID", nullable = false, length = 100)
	private String creatorId;

	@Column(name = "CREATOR_NAME", nullable = false, length = 150)
	private String creatorName;

	@Column(name = "CREATOR_EMAIL", nullable = false, length = 150)
	private String creatorEmail;

	@Column(name = "BRANCH_URL", columnDefinition = "TEXT", nullable = false)
	private String branchUrl;

	@Column(name = "CREATOR_AVATAR_URL", columnDefinition = "TEXT")
	private String creatorAvatarUrl;

	@Column(name = "CREATOR_IMAGE_URL", columnDefinition = "TEXT")
	private String creatorImageUrl;

	@Column(name = "CREATOR_DESCRIPTOR", length = 150)
	private String creatorDescriptor;

	@Column(name = "CREATOR_URL", columnDefinition = "TEXT")
	private String creatorUrl;

	@Column(name = "CREATED_AT")
	private LocalDateTime createdAt;

	@PrePersist
	protected void onCreate() {
		if (createdAt == null) {
			createdAt = LocalDateTime.now();
		}
	}

	// Getters e setters

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Chamado getChamado() {
		return chamado;
	}

	public void setChamado(Chamado chamado) {
		this.chamado = chamado;
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
