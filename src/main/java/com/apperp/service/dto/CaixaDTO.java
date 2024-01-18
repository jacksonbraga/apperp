package com.apperp.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.apperp.domain.Caixa} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CaixaDTO implements Serializable {

    private Long id;

    private String descricao;

    private String observacao;

    private BigDecimal valor;

    private LocalDate data;

    private Set<TipoCaixaDTO> tipoCaixas = new HashSet<>();

    private Set<TipoOrigemDTO> tipoOrigems = new HashSet<>();

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

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Set<TipoCaixaDTO> getTipoCaixas() {
        return tipoCaixas;
    }

    public void setTipoCaixas(Set<TipoCaixaDTO> tipoCaixas) {
        this.tipoCaixas = tipoCaixas;
    }

    public Set<TipoOrigemDTO> getTipoOrigems() {
        return tipoOrigems;
    }

    public void setTipoOrigems(Set<TipoOrigemDTO> tipoOrigems) {
        this.tipoOrigems = tipoOrigems;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CaixaDTO)) {
            return false;
        }

        CaixaDTO caixaDTO = (CaixaDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, caixaDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CaixaDTO{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", observacao='" + getObservacao() + "'" +
            ", valor=" + getValor() +
            ", data='" + getData() + "'" +
            ", tipoCaixas=" + getTipoCaixas() +
            ", tipoOrigems=" + getTipoOrigems() +
            "}";
    }
}
