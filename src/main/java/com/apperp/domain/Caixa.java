package com.apperp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Caixa.
 */
@Entity
@Table(name = "caixa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Caixa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "observacao")
    private String observacao;

    @Column(name = "valor", precision = 21, scale = 2)
    private BigDecimal valor;

    @Column(name = "data")
    private LocalDate data;

    @Column(name = "valor_estimado_extrato", precision = 21, scale = 2)
    private BigDecimal valorEstimadoExtrato;

    @Column(name = "valor_lancado_extrato", precision = 21, scale = 2)
    private BigDecimal valorLancadoExtrato;

    @Column(name = "data_estimada_extrato")
    private LocalDate dataEstimadaExtrato;

    @Column(name = "data_lancada_extrato")
    private LocalDate dataLancadaExtrato;

    @Column(name = "valor_taxa", precision = 21, scale = 2)
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

    @JsonIgnoreProperties(value = { "grupoPagamento", "caixa" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = false)
    private TipoCaixa tipoCaixa;

    @JsonIgnoreProperties(value = { "grupoOrigem", "caixa" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = false)
    private TipoOrigem tipoOrigem;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Caixa id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public Caixa descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getObservacao() {
        return this.observacao;
    }

    public Caixa observacao(String observacao) {
        this.setObservacao(observacao);
        return this;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public BigDecimal getValor() {
        return this.valor;
    }

    public Caixa valor(BigDecimal valor) {
        this.setValor(valor);
        return this;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public LocalDate getData() {
        return this.data;
    }

    public Caixa data(LocalDate data) {
        this.setData(data);
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public TipoCaixa getTipoCaixa() {
        return this.tipoCaixa;
    }

    public void setTipoCaixa(TipoCaixa tipoCaixa) {
        this.tipoCaixa = tipoCaixa;
    }

    public Caixa tipoCaixa(TipoCaixa tipoCaixa) {
        this.setTipoCaixa(tipoCaixa);
        return this;
    }

    public TipoOrigem getTipoOrigem() {
        return this.tipoOrigem;
    }

    public void setTipoOrigem(TipoOrigem tipoOrigem) {
        this.tipoOrigem = tipoOrigem;
    }

    public Caixa tipoOrigem(TipoOrigem tipoOrigem) {
        this.setTipoOrigem(tipoOrigem);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Caixa)) {
            return false;
        }
        return getId() != null && getId().equals(((Caixa) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Caixa{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", observacao='" + getObservacao() + "'" +
            ", valor=" + getValor() +
            ", data='" + getData() + "'" +
            "}";
    }
}
