package com.apperp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.apperp.domain.TipoCaixa} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TipoCaixaDTO implements Serializable {

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
        if (!(o instanceof TipoCaixaDTO)) {
            return false;
        }

        TipoCaixaDTO tipoCaixaDTO = (TipoCaixaDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, tipoCaixaDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoCaixaDTO{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", grupoPagamento=" + getGrupoPagamento() +
            "}";
    }
}
