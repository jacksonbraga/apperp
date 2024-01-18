package com.apperp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TipoOrigem.
 */
@Entity
@Table(name = "tipo_origem")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TipoOrigem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_tipo_origem__grupo_origem",
        joinColumns = @JoinColumn(name = "tipo_origem_id"),
        inverseJoinColumns = @JoinColumn(name = "grupo_origem_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tipoOrigems" }, allowSetters = true)
    private Set<GrupoOrigem> grupoOrigems = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "tipoOrigems")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tipoCaixas", "tipoOrigems" }, allowSetters = true)
    private Set<Caixa> caixas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TipoOrigem id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public TipoOrigem descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<GrupoOrigem> getGrupoOrigems() {
        return this.grupoOrigems;
    }

    public void setGrupoOrigems(Set<GrupoOrigem> grupoOrigems) {
        this.grupoOrigems = grupoOrigems;
    }

    public TipoOrigem grupoOrigems(Set<GrupoOrigem> grupoOrigems) {
        this.setGrupoOrigems(grupoOrigems);
        return this;
    }

    public TipoOrigem addGrupoOrigem(GrupoOrigem grupoOrigem) {
        this.grupoOrigems.add(grupoOrigem);
        return this;
    }

    public TipoOrigem removeGrupoOrigem(GrupoOrigem grupoOrigem) {
        this.grupoOrigems.remove(grupoOrigem);
        return this;
    }

    public Set<Caixa> getCaixas() {
        return this.caixas;
    }

    public void setCaixas(Set<Caixa> caixas) {
        if (this.caixas != null) {
            this.caixas.forEach(i -> i.removeTipoOrigem(this));
        }
        if (caixas != null) {
            caixas.forEach(i -> i.addTipoOrigem(this));
        }
        this.caixas = caixas;
    }

    public TipoOrigem caixas(Set<Caixa> caixas) {
        this.setCaixas(caixas);
        return this;
    }

    public TipoOrigem addCaixa(Caixa caixa) {
        this.caixas.add(caixa);
        caixa.getTipoOrigems().add(this);
        return this;
    }

    public TipoOrigem removeCaixa(Caixa caixa) {
        this.caixas.remove(caixa);
        caixa.getTipoOrigems().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoOrigem)) {
            return false;
        }
        return getId() != null && getId().equals(((TipoOrigem) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoOrigem{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
