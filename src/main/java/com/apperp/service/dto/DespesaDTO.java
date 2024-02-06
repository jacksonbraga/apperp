package com.apperp.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link com.apperp.domain.Despesa} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DespesaDTO implements Serializable {

    private Long id;

    private String descricao;

    private String observacao;

    private Integer parcela;

    private Integer totalParcela;

    private BigDecimal valor;

    private LocalDate data;

    private LocalDate dataVencimento;

    private LocalDate dataPagamento;

    private BigDecimal valorPagamento;

    public LocalDate getDataPagamento() {
        return dataPagamento;
    }

    public void setDataPagamento(LocalDate dataPagamento) {
        this.dataPagamento = dataPagamento;
    }

    public BigDecimal getValorPagamento() {
        return valorPagamento;
    }

    public void setValorPagamento(BigDecimal valorPagamento) {
        this.valorPagamento = valorPagamento;
    }

    private TipoDespesaDTO tipoDespesa;

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

    public Integer getParcela() {
        return parcela;
    }

    public void setParcela(Integer parcela) {
        this.parcela = parcela;
    }

    public Integer getTotalParcela() {
        return totalParcela;
    }

    public void setTotalParcela(Integer totalParcela) {
        this.totalParcela = totalParcela;
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

    public LocalDate getDataVencimento() {
        return dataVencimento;
    }

    public void setDataVencimento(LocalDate dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    public TipoDespesaDTO getTipoDespesa() {
        return tipoDespesa;
    }

    public void setTipoDespesa(TipoDespesaDTO tipoDespesa) {
        this.tipoDespesa = tipoDespesa;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DespesaDTO)) {
            return false;
        }

        DespesaDTO despesaDTO = (DespesaDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, despesaDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DespesaDTO{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", observacao='" + getObservacao() + "'" +
            ", parcela=" + getParcela() +
            ", totalParcela=" + getTotalParcela() +
            ", valor=" + getValor() +
            ", data='" + getData() + "'" +
            ", dataVencimento='" + getDataVencimento() + "'" +
            ", tipoDespesa=" + getTipoDespesa() +
            "}";
    }
}
