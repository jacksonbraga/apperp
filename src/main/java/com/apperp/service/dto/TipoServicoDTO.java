package com.apperp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.apperp.domain.TipoServico} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TipoServicoDTO implements Serializable {

    private Long id;

    private String descricao;

    private GrupoServicoDTO grupoServico;

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

    public GrupoServicoDTO getGrupoServico() {
        return grupoServico;
    }

    public void setGrupoServico(GrupoServicoDTO grupoServico) {
        this.grupoServico = grupoServico;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoServicoDTO)) {
            return false;
        }

        TipoServicoDTO tipoServicoDTO = (TipoServicoDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, tipoServicoDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoServicoDTO{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", grupoServico=" + getGrupoServico() +
            "}";
    }
}
