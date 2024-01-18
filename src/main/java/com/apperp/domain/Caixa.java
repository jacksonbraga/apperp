package com.apperp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
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

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_caixa__tipo_caixa",
        joinColumns = @JoinColumn(name = "caixa_id"),
        inverseJoinColumns = @JoinColumn(name = "tipo_caixa_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "grupoCaixas", "caixas" }, allowSetters = true)
    private Set<TipoCaixa> tipoCaixas = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_caixa__tipo_origem",
        joinColumns = @JoinColumn(name = "caixa_id"),
        inverseJoinColumns = @JoinColumn(name = "tipo_origem_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "grupoOrigems", "caixas" }, allowSetters = true)
    private Set<TipoOrigem> tipoOrigems = new HashSet<>();

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

    public Set<TipoCaixa> getTipoCaixas() {
        return this.tipoCaixas;
    }

    public void setTipoCaixas(Set<TipoCaixa> tipoCaixas) {
        this.tipoCaixas = tipoCaixas;
    }

    public Caixa tipoCaixas(Set<TipoCaixa> tipoCaixas) {
        this.setTipoCaixas(tipoCaixas);
        return this;
    }

    public Caixa addTipoCaixa(TipoCaixa tipoCaixa) {
        this.tipoCaixas.add(tipoCaixa);
        return this;
    }

    public Caixa removeTipoCaixa(TipoCaixa tipoCaixa) {
        this.tipoCaixas.remove(tipoCaixa);
        return this;
    }

    public Set<TipoOrigem> getTipoOrigems() {
        return this.tipoOrigems;
    }

    public void setTipoOrigems(Set<TipoOrigem> tipoOrigems) {
        this.tipoOrigems = tipoOrigems;
    }

    public Caixa tipoOrigems(Set<TipoOrigem> tipoOrigems) {
        this.setTipoOrigems(tipoOrigems);
        return this;
    }

    public Caixa addTipoOrigem(TipoOrigem tipoOrigem) {
        this.tipoOrigems.add(tipoOrigem);
        return this;
    }

    public Caixa removeTipoOrigem(TipoOrigem tipoOrigem) {
        this.tipoOrigems.remove(tipoOrigem);
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
