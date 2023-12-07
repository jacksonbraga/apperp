package com.apperp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.apperp.domain.TipoPagamento} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TipoPagamentoDTO implements Serializable {

    private Long id;

    private String descricao;

    private GrupoPagamentoDTO grupoPagamento;

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

    public GrupoPagamentoDTO getGrupoPagamento() {
        return grupoPagamento;
    }

    public void setGrupoPagamento(GrupoPagamentoDTO grupoPagamento) {
        this.grupoPagamento = grupoPagamento;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoPagamentoDTO)) {
            return false;
        }

        TipoPagamentoDTO tipoPagamentoDTO = (TipoPagamentoDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, tipoPagamentoDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoPagamentoDTO{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", grupoPagamento=" + getGrupoPagamento() +
            "}";
    }
}
