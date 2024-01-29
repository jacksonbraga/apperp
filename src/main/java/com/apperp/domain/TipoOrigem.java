package com.apperp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
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

    @JsonIgnoreProperties(value = { "tipoOrigem" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = false)
    private GrupoOrigem grupoOrigem;

    // @JsonIgnoreProperties(value = { "tipoCaixa", "tipoOrigem" }, allowSetters = true)
    // @OneToOne(fetch = FetchType.LAZY, mappedBy = "tipoOrigem")
    // private Caixa caixa;

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

    public GrupoOrigem getGrupoOrigem() {
        return this.grupoOrigem;
    }

    public void setGrupoOrigem(GrupoOrigem grupoOrigem) {
        this.grupoOrigem = grupoOrigem;
    }

    public TipoOrigem grupoOrigem(GrupoOrigem grupoOrigem) {
        this.setGrupoOrigem(grupoOrigem);
        return this;
    }

    // public Caixa getCaixa() {
    //     return this.caixa;
    // }

    // public void setCaixa(Caixa caixa) {
    //     if (this.caixa != null) {
    //         this.caixa.setTipoOrigem(null);
    //     }
    //     if (caixa != null) {
    //         caixa.setTipoOrigem(this);
    //     }
    //     this.caixa = caixa;
    // }

    // public TipoOrigem caixa(Caixa caixa) {
    //     this.setCaixa(caixa);
    //     return this;
    // }

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
