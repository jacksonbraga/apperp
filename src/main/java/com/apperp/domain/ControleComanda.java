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
 * A ControleComanda.
 */
@Entity
@Table(name = "controle_comanda")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ControleComanda implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "faixa_inicio")
    private Long faixaInicio;

    @Column(name = "faixa_fim")
    private Long faixaFim;

    @Column(name = "data")
    private LocalDate data;

    @Column(name = "valor", precision = 21, scale = 2)
    private BigDecimal valor;

    @Column(name = "resumo")
    private String resumo;

    public String getResumo() {
        return resumo;
    }

    public void setResumo(String resumo) {
        this.resumo = resumo;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "controleComanda")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "itens", "situacao", "controle", "controleComanda", "listaItens" }, allowSetters = true)
    private Set<Comanda> comandas = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    private Cor cor;

    /*     @OneToMany(fetch = FetchType.LAZY, mappedBy = "controle")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "itens", "situacao", "controle", "controleComanda", "listaItens" }, allowSetters = true)
    private Set<Comanda> listaComandas = new HashSet<>(); */

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ControleComanda id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public ControleComanda descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Long getFaixaInicio() {
        return this.faixaInicio;
    }

    public ControleComanda faixaInicio(Long faixaInicio) {
        this.setFaixaInicio(faixaInicio);
        return this;
    }

    public void setFaixaInicio(Long faixaInicio) {
        this.faixaInicio = faixaInicio;
    }

    public Long getFaixaFim() {
        return this.faixaFim;
    }

    public ControleComanda faixaFim(Long faixaFim) {
        this.setFaixaFim(faixaFim);
        return this;
    }

    public void setFaixaFim(Long faixaFim) {
        this.faixaFim = faixaFim;
    }

    public LocalDate getData() {
        return this.data;
    }

    public ControleComanda data(LocalDate data) {
        this.setData(data);
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public BigDecimal getValor() {
        return this.valor;
    }

    public ControleComanda valor(BigDecimal valor) {
        this.setValor(valor);
        return this;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Set<Comanda> getComandas() {
        return this.comandas;
    }

    public void setComandas(Set<Comanda> comandas) {
        if (this.comandas != null) {
            this.comandas.forEach(i -> i.setControleComanda(null));
        }
        if (comandas != null) {
            comandas.forEach(i -> i.setControleComanda(this));
        }
        this.comandas = comandas;
    }

    public ControleComanda comandas(Set<Comanda> comandas) {
        this.setComandas(comandas);
        return this;
    }

    public ControleComanda addComandas(Comanda comanda) {
        this.comandas.add(comanda);
        comanda.setControleComanda(this);
        return this;
    }

    public ControleComanda removeComandas(Comanda comanda) {
        this.comandas.remove(comanda);
        comanda.setControleComanda(null);
        return this;
    }

    public Cor getCor() {
        return this.cor;
    }

    public void setCor(Cor cor) {
        this.cor = cor;
    }

    public ControleComanda cor(Cor cor) {
        this.setCor(cor);
        return this;
    }

    /*     public Set<Comanda> getListaComandas() {
        return this.listaComandas;
    }
 */
    /*    public void setListaComandas(Set<Comanda> comandas) {
        if (this.listaComandas != null) {
            this.listaComandas.forEach(i -> i.setControle(null));
        }
        if (comandas != null) {
            comandas.forEach(i -> i.setControle(this));
        }
        this.listaComandas = comandas;
    } */

    /*     public ControleComanda listaComandas(Set<Comanda> comandas) {
        this.setListaComandas(comandas);
        return this;
    } */

    /*    public ControleComanda addListaComandas(Comanda comanda) {
        this.listaComandas.add(comanda);
        comanda.setControle(this);
        return this;
    } */

    /*    public ControleComanda removeListaComandas(Comanda comanda) {
        this.listaComandas.remove(comanda);
        comanda.setControle(null);
        return this;
    } */

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ControleComanda)) {
            return false;
        }
        return getId() != null && getId().equals(((ControleComanda) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ControleComanda{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", faixaInicio=" + getFaixaInicio() +
            ", faixaFim=" + getFaixaFim() +
            ", data='" + getData() + "'" +
            "}";
    }
}
