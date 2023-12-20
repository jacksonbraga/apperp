package com.apperp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.apperp.domain.GrupoPagamento} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class GrupoPagamentoDTO implements Serializable {

    private Long id;

    private String descricao;

    private String tipoColuna;

    public String getTipoColuna() {
        return tipoColuna;
    }

    public void setTipoColuna(String tipoColuna) {
        this.tipoColuna = tipoColuna;
    }

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
        if (!(o instanceof GrupoPagamentoDTO)) {
            return false;
        }

        GrupoPagamentoDTO grupoPagamentoDTO = (GrupoPagamentoDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, grupoPagamentoDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GrupoPagamentoDTO{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
