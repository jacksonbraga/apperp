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
 * A Comanda.
 */
@Entity
@Table(name = "comanda")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Comanda implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "observacao")
    private String observacao;

    @Column(name = "data")
    private LocalDate data;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "valor", precision = 21, scale = 2, updatable = false)
    private BigDecimal valor;

    @Column(name = "resumo")
    private String resumo;

    public String getResumo() {
        return resumo;
    }

    public void setResumo(String resumo) {
        this.resumo = resumo;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "comanda")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tipoPagamento", "tipoServico", "comandaPai", "comanda" }, allowSetters = true)
    private Set<ItemComanda> itens = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    private Situacao situacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "id", "descricao" }, allowSetters = true)
    private Comanda controle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "comandas", "cor", "listaComandas" }, allowSetters = true)
    private ControleComanda controleComanda;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "comandaPai")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tipoPagamento", "tipoServico", "comandaPai", "comanda" }, allowSetters = true)
    private Set<ItemComanda> listaItens = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Comanda id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public Comanda descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getObservacao() {
        return this.observacao;
    }

    public Comanda observacao(String observacao) {
        this.setObservacao(observacao);
        return this;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public LocalDate getData() {
        return this.data;
    }

    public Comanda data(LocalDate data) {
        this.setData(data);
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Integer getNumero() {
        return this.numero;
    }

    public Comanda numero(Integer numero) {
        this.setNumero(numero);
        return this;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public BigDecimal getValor() {
        return this.valor;
    }

    public Comanda valor(BigDecimal valor) {
        this.setValor(valor);
        return this;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Set<ItemComanda> getItens() {
        return this.itens;
    }

    public void setItens(Set<ItemComanda> itemComandas) {
        if (this.itens != null) {
            this.itens.forEach(i -> i.setComanda(null));
        }
        if (itemComandas != null) {
            itemComandas.forEach(i -> i.setComanda(this));
        }
        this.itens = itemComandas;
    }

    public Comanda itens(Set<ItemComanda> itemComandas) {
        this.setItens(itemComandas);
        return this;
    }

    public Comanda addItens(ItemComanda itemComanda) {
        this.itens.add(itemComanda);
        itemComanda.setComanda(this);
        return this;
    }

    public Comanda removeItens(ItemComanda itemComanda) {
        this.itens.remove(itemComanda);
        itemComanda.setComanda(null);
        return this;
    }

    public Situacao getSituacao() {
        return this.situacao;
    }

    public void setSituacao(Situacao situacao) {
        this.situacao = situacao;
    }

    public Comanda situacao(Situacao situacao) {
        this.setSituacao(situacao);
        return this;
    }

    public Comanda getControle() {
        return this.controle;
    }

    public void setControle(Comanda controleComanda) {
        this.controle = controleComanda;
    }

    public Comanda controle(Comanda controleComanda) {
        this.setControle(controleComanda);
        return this;
    }

    public ControleComanda getControleComanda() {
        return this.controleComanda;
    }

    public void setControleComanda(ControleComanda controleComanda) {
        this.controleComanda = controleComanda;
    }

    public Comanda controleComanda(ControleComanda controleComanda) {
        this.setControleComanda(controleComanda);
        return this;
    }

    public Set<ItemComanda> getListaItens() {
        return this.listaItens;
    }

    public void setListaItens(Set<ItemComanda> itemComandas) {
        if (this.listaItens != null) {
            this.listaItens.forEach(i -> i.setComandaPai(null));
        }
        if (itemComandas != null) {
            itemComandas.forEach(i -> i.setComandaPai(this));
        }
        this.listaItens = itemComandas;
    }

    public Comanda listaItens(Set<ItemComanda> itemComandas) {
        this.setListaItens(itemComandas);
        return this;
    }

    public Comanda addListaItens(ItemComanda itemComanda) {
        this.listaItens.add(itemComanda);
        itemComanda.setComandaPai(this);
        return this;
    }

    public Comanda removeListaItens(ItemComanda itemComanda) {
        this.listaItens.remove(itemComanda);
        itemComanda.setComandaPai(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Comanda)) {
            return false;
        }
        return getId() != null && getId().equals(((Comanda) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Comanda{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", observacao='" + getObservacao() + "'" +
            ", data='" + getData() + "'" +
            ", numero=" + getNumero() +
            "}";
    }
}
