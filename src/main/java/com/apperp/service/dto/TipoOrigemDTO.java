package com.apperp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.apperp.domain.TipoOrigem} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TipoOrigemDTO implements Serializable {

    private Long id;

    private String descricao;

    private GrupoOrigemDTO grupoOrigem;

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

    public GrupoOrigemDTO getGrupoOrigem() {
        return grupoOrigem;
    }

    public void setGrupoOrigem(GrupoOrigemDTO grupoOrigem) {
        this.grupoOrigem = grupoOrigem;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoOrigemDTO)) {
            return false;
        }

        TipoOrigemDTO tipoOrigemDTO = (TipoOrigemDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, tipoOrigemDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoOrigemDTO{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", grupoOrigem=" + getGrupoOrigem() +
            "}";
    }
}
