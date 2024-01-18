package com.apperp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TipoCaixa.
 */
@Entity
@Table(name = "tipo_caixa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TipoCaixa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_tipo_caixa__grupo_caixa",
        joinColumns = @JoinColumn(name = "tipo_caixa_id"),
        inverseJoinColumns = @JoinColumn(name = "grupo_caixa_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tipoCaixas" }, allowSetters = true)
    private Set<GrupoCaixa> grupoCaixas = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "tipoCaixas")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tipoCaixas", "tipoOrigems" }, allowSetters = true)
    private Set<Caixa> caixas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TipoCaixa id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public TipoCaixa descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<GrupoCaixa> getGrupoCaixas() {
        return this.grupoCaixas;
    }

    public void setGrupoCaixas(Set<GrupoCaixa> grupoCaixas) {
        this.grupoCaixas = grupoCaixas;
    }

    public TipoCaixa grupoCaixas(Set<GrupoCaixa> grupoCaixas) {
        this.setGrupoCaixas(grupoCaixas);
        return this;
    }

    public TipoCaixa addGrupoCaixa(GrupoCaixa grupoCaixa) {
        this.grupoCaixas.add(grupoCaixa);
        return this;
    }

    public TipoCaixa removeGrupoCaixa(GrupoCaixa grupoCaixa) {
        this.grupoCaixas.remove(grupoCaixa);
        return this;
    }

    public Set<Caixa> getCaixas() {
        return this.caixas;
    }

    public void setCaixas(Set<Caixa> caixas) {
        if (this.caixas != null) {
            this.caixas.forEach(i -> i.removeTipoCaixa(this));
        }
        if (caixas != null) {
            caixas.forEach(i -> i.addTipoCaixa(this));
        }
        this.caixas = caixas;
    }

    public TipoCaixa caixas(Set<Caixa> caixas) {
        this.setCaixas(caixas);
        return this;
    }

    public TipoCaixa addCaixa(Caixa caixa) {
        this.caixas.add(caixa);
        caixa.getTipoCaixas().add(this);
        return this;
    }

    public TipoCaixa removeCaixa(Caixa caixa) {
        this.caixas.remove(caixa);
        caixa.getTipoCaixas().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoCaixa)) {
            return false;
        }
        return getId() != null && getId().equals(((TipoCaixa) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoCaixa{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
