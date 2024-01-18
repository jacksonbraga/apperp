package com.apperp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A GrupoCaixa.
 */
@Entity
@Table(name = "grupo_caixa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class GrupoCaixa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "grupoCaixas")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "grupoCaixas", "caixas" }, allowSetters = true)
    private Set<TipoCaixa> tipoCaixas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public GrupoCaixa id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public GrupoCaixa descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<TipoCaixa> getTipoCaixas() {
        return this.tipoCaixas;
    }

    public void setTipoCaixas(Set<TipoCaixa> tipoCaixas) {
        if (this.tipoCaixas != null) {
            this.tipoCaixas.forEach(i -> i.removeGrupoCaixa(this));
        }
        if (tipoCaixas != null) {
            tipoCaixas.forEach(i -> i.addGrupoCaixa(this));
        }
        this.tipoCaixas = tipoCaixas;
    }

    public GrupoCaixa tipoCaixas(Set<TipoCaixa> tipoCaixas) {
        this.setTipoCaixas(tipoCaixas);
        return this;
    }

    public GrupoCaixa addTipoCaixa(TipoCaixa tipoCaixa) {
        this.tipoCaixas.add(tipoCaixa);
        tipoCaixa.getGrupoCaixas().add(this);
        return this;
    }

    public GrupoCaixa removeTipoCaixa(TipoCaixa tipoCaixa) {
        this.tipoCaixas.remove(tipoCaixa);
        tipoCaixa.getGrupoCaixas().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GrupoCaixa)) {
            return false;
        }
        return getId() != null && getId().equals(((GrupoCaixa) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GrupoCaixa{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
