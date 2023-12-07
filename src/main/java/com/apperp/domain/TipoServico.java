package com.apperp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TipoServico.
 */
@Entity
@Table(name = "tipo_servico")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TipoServico implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @ManyToOne(fetch = FetchType.LAZY)
    private GrupoServico grupoServico;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tipoServico")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tipoPagamento", "tipoServico", "comandaPai", "comanda" }, allowSetters = true)
    private Set<ItemComanda> tipoServicos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TipoServico id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public TipoServico descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public GrupoServico getGrupoServico() {
        return this.grupoServico;
    }

    public void setGrupoServico(GrupoServico grupoServico) {
        this.grupoServico = grupoServico;
    }

    public TipoServico grupoServico(GrupoServico grupoServico) {
        this.setGrupoServico(grupoServico);
        return this;
    }

    public Set<ItemComanda> getTipoServicos() {
        return this.tipoServicos;
    }

    public void setTipoServicos(Set<ItemComanda> itemComandas) {
        if (this.tipoServicos != null) {
            this.tipoServicos.forEach(i -> i.setTipoServico(null));
        }
        if (itemComandas != null) {
            itemComandas.forEach(i -> i.setTipoServico(this));
        }
        this.tipoServicos = itemComandas;
    }

    public TipoServico tipoServicos(Set<ItemComanda> itemComandas) {
        this.setTipoServicos(itemComandas);
        return this;
    }

    public TipoServico addTipoServico(ItemComanda itemComanda) {
        this.tipoServicos.add(itemComanda);
        itemComanda.setTipoServico(this);
        return this;
    }

    public TipoServico removeTipoServico(ItemComanda itemComanda) {
        this.tipoServicos.remove(itemComanda);
        itemComanda.setTipoServico(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoServico)) {
            return false;
        }
        return getId() != null && getId().equals(((TipoServico) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoServico{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
