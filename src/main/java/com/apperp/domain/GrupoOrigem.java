package com.apperp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A GrupoOrigem.
 */
@Entity
@Table(name = "grupo_origem")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class GrupoOrigem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    // @JsonIgnoreProperties(value = { "grupoOrigem", "caixa" }, allowSetters = true)
    // @OneToOne(fetch = FetchType.LAZY, mappedBy = "grupoOrigem")
    // private TipoOrigem tipoOrigem;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public GrupoOrigem id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public GrupoOrigem descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    // public TipoOrigem getTipoOrigem() {
    //     return this.tipoOrigem;
    // }

    // public void setTipoOrigem(TipoOrigem tipoOrigem) {
    //     if (this.tipoOrigem != null) {
    //         this.tipoOrigem.setGrupoOrigem(null);
    //     }
    //     if (tipoOrigem != null) {
    //         tipoOrigem.setGrupoOrigem(this);
    //     }
    //     this.tipoOrigem = tipoOrigem;
    // }

    // public GrupoOrigem tipoOrigem(TipoOrigem tipoOrigem) {
    //     this.setTipoOrigem(tipoOrigem);
    //     return this;
    // }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GrupoOrigem)) {
            return false;
        }
        return getId() != null && getId().equals(((GrupoOrigem) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GrupoOrigem{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
