package com.apperp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
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

    @JsonIgnoreProperties(value = { "tipoCaixa" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = false)
    private GrupoPagamento grupoPagamento;

    // @JsonIgnoreProperties(value = { "tipoCaixa", "tipoOrigem" }, allowSetters = true)
    // @OneToOne(fetch = FetchType.LAZY, mappedBy = "tipoCaixa")
    // private Caixa caixa;

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

    public GrupoPagamento getGrupoPagamento() {
        return this.grupoPagamento;
    }

    public void setGrupoPagamento(GrupoPagamento grupoPagamento) {
        this.grupoPagamento = grupoPagamento;
    }

    public TipoCaixa grupoPagamento(GrupoPagamento grupoPagamento) {
        this.setGrupoPagamento(grupoPagamento);
        return this;
    }

    // public Caixa getCaixa() {
    //     return this.caixa;
    // }

    // public void setCaixa(Caixa caixa) {
    //     if (this.caixa != null) {
    //         this.caixa.setTipoCaixa(null);
    //     }
    //     if (caixa != null) {
    //         caixa.setTipoCaixa(this);
    //     }
    //     this.caixa = caixa;
    // }

    // public TipoCaixa caixa(Caixa caixa) {
    //     this.setCaixa(caixa);
    //     return this;
    // }

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
