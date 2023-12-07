package com.apperp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Despesa.
 */
@Entity
@Table(name = "despesa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Despesa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "observacao")
    private String observacao;

    @Column(name = "parcela")
    private Integer parcela;

    @Column(name = "total_parcela")
    private Integer totalParcela;

    @Column(name = "valor", precision = 21, scale = 2)
    private BigDecimal valor;

    @Column(name = "data")
    private LocalDate data;

    @Column(name = "data_vencimento")
    private LocalDate dataVencimento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "grupoDespesa" }, allowSetters = true)
    private TipoDespesa tipoDespesa;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Despesa id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public Despesa descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getObservacao() {
        return this.observacao;
    }

    public Despesa observacao(String observacao) {
        this.setObservacao(observacao);
        return this;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public Integer getParcela() {
        return this.parcela;
    }

    public Despesa parcela(Integer parcela) {
        this.setParcela(parcela);
        return this;
    }

    public void setParcela(Integer parcela) {
        this.parcela = parcela;
    }

    public Integer getTotalParcela() {
        return this.totalParcela;
    }

    public Despesa totalParcela(Integer totalParcela) {
        this.setTotalParcela(totalParcela);
        return this;
    }

    public void setTotalParcela(Integer totalParcela) {
        this.totalParcela = totalParcela;
    }

    public BigDecimal getValor() {
        return this.valor;
    }

    public Despesa valor(BigDecimal valor) {
        this.setValor(valor);
        return this;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public LocalDate getData() {
        return this.data;
    }

    public Despesa data(LocalDate data) {
        this.setData(data);
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalDate getDataVencimento() {
        return this.dataVencimento;
    }

    public Despesa dataVencimento(LocalDate dataVencimento) {
        this.setDataVencimento(dataVencimento);
        return this;
    }

    public void setDataVencimento(LocalDate dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    public TipoDespesa getTipoDespesa() {
        return this.tipoDespesa;
    }

    public void setTipoDespesa(TipoDespesa tipoDespesa) {
        this.tipoDespesa = tipoDespesa;
    }

    public Despesa tipoDespesa(TipoDespesa tipoDespesa) {
        this.setTipoDespesa(tipoDespesa);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Despesa)) {
            return false;
        }
        return getId() != null && getId().equals(((Despesa) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Despesa{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", observacao='" + getObservacao() + "'" +
            ", parcela=" + getParcela() +
            ", totalParcela=" + getTotalParcela() +
            ", valor=" + getValor() +
            ", data='" + getData() + "'" +
            ", dataVencimento='" + getDataVencimento() + "'" +
            "}";
    }
}
