package com.apperp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TipoPagamento.
 */
@Entity
@Table(name = "tipo_pagamento")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TipoPagamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @ManyToOne(fetch = FetchType.LAZY)
    private GrupoPagamento grupoPagamento;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tipoPagamento")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tipoPagamento", "tipoServico", "comandaPai", "comanda" }, allowSetters = true)
    private Set<ItemComanda> tipoPagamentos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TipoPagamento id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public TipoPagamento descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public GrupoPagamento getGrupoPagamento() {
        return this.grupoPagamento;
    }

    public void setGrupoPagamento(GrupoPagamento grupoPagamento) {
        this.grupoPagamento = grupoPagamento;
    }

    public TipoPagamento grupoPagamento(GrupoPagamento grupoPagamento) {
        this.setGrupoPagamento(grupoPagamento);
        return this;
    }

    public Set<ItemComanda> getTipoPagamentos() {
        return this.tipoPagamentos;
    }

    public void setTipoPagamentos(Set<ItemComanda> itemComandas) {
        if (this.tipoPagamentos != null) {
            this.tipoPagamentos.forEach(i -> i.setTipoPagamento(null));
        }
        if (itemComandas != null) {
            itemComandas.forEach(i -> i.setTipoPagamento(this));
        }
        this.tipoPagamentos = itemComandas;
    }

    public TipoPagamento tipoPagamentos(Set<ItemComanda> itemComandas) {
        this.setTipoPagamentos(itemComandas);
        return this;
    }

    public TipoPagamento addTipoPagamento(ItemComanda itemComanda) {
        this.tipoPagamentos.add(itemComanda);
        itemComanda.setTipoPagamento(this);
        return this;
    }

    public TipoPagamento removeTipoPagamento(ItemComanda itemComanda) {
        this.tipoPagamentos.remove(itemComanda);
        itemComanda.setTipoPagamento(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoPagamento)) {
            return false;
        }
        return getId() != null && getId().equals(((TipoPagamento) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoPagamento{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
