package com.apperp.service.dto;

import jakarta.persistence.Column;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

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

    private BigDecimal valorEstimadoExtrato;

    private BigDecimal valorLancadoExtrato;

    private LocalDate dataEstimadaExtrato;

    private LocalDate dataLancadaExtrato;

    private BigDecimal valorTaxa;

    public BigDecimal getValorEstimadoExtrato() {
        return valorEstimadoExtrato;
    }

    public void setValorEstimadoExtrato(BigDecimal valorEstimadoExtrato) {
        this.valorEstimadoExtrato = valorEstimadoExtrato;
    }

    public BigDecimal getValorLancadoExtrato() {
        return valorLancadoExtrato;
    }

    public void setValorLancadoExtrato(BigDecimal valorLancadoExtrato) {
        this.valorLancadoExtrato = valorLancadoExtrato;
    }

    public LocalDate getDataEstimadaExtrato() {
        return dataEstimadaExtrato;
    }

    public void setDataEstimadaExtrato(LocalDate dataEstimadaExtrato) {
        this.dataEstimadaExtrato = dataEstimadaExtrato;
    }

    public LocalDate getDataLancadaExtrato() {
        return dataLancadaExtrato;
    }

    public void setDataLancadaExtrato(LocalDate dataLancadaExtrato) {
        this.dataLancadaExtrato = dataLancadaExtrato;
    }

    public BigDecimal getValorTaxa() {
        return valorTaxa;
    }

    public void setValorTaxa(BigDecimal valorTaxa) {
        this.valorTaxa = valorTaxa;
    }

    private TipoCaixaDTO tipoCaixa;

    private TipoOrigemDTO tipoOrigem;

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

    public TipoCaixaDTO getTipoCaixa() {
        return tipoCaixa;
    }

    public void setTipoCaixa(TipoCaixaDTO tipoCaixa) {
        this.tipoCaixa = tipoCaixa;
    }

    public TipoOrigemDTO getTipoOrigem() {
        return tipoOrigem;
    }

    public void setTipoOrigem(TipoOrigemDTO tipoOrigem) {
        this.tipoOrigem = tipoOrigem;
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
            ", tipoCaixa=" + getTipoCaixa() +
            ", tipoOrigem=" + getTipoOrigem() +
            "}";
    }
}
