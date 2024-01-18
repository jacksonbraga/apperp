package com.apperp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.apperp.domain.GrupoOrigem} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class GrupoOrigemDTO implements Serializable {

    private Long id;

    private String descricao;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GrupoOrigemDTO)) {
            return false;
        }

        GrupoOrigemDTO grupoOrigemDTO = (GrupoOrigemDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, grupoOrigemDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GrupoOrigemDTO{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
