package com.apperp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ItemComanda.
 */
@Entity
@Table(name = "item_comanda")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ItemComanda implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "observacao")
    private String observacao;

    @Column(name = "tipo")
    private String tipo;

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    @Column(name = "data")
    private LocalDate data;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "qtde")
    private Integer qtde;

    @Column(name = "valor", precision = 21, scale = 2)
    private BigDecimal valor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "grupoPagamento", "tipoPagamentos" }, allowSetters = true)
    private TipoPagamento tipoPagamento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "grupoServico", "tipoServicos" }, allowSetters = true)
    private TipoServico tipoServico;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "itens", "situacao", "controle", "controleComanda", "listaItens" }, allowSetters = true)
    private Comanda comandaPai;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "itens", "situacao", "controle", "controleComanda", "listaItens" }, allowSetters = true)
    private Comanda comanda;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ItemComanda id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public ItemComanda descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getObservacao() {
        return this.observacao;
    }

    public ItemComanda observacao(String observacao) {
        this.setObservacao(observacao);
        return this;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public LocalDate getData() {
        return this.data;
    }

    public ItemComanda data(LocalDate data) {
        this.setData(data);
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Integer getNumero() {
        return this.numero;
    }

    public ItemComanda numero(Integer numero) {
        this.setNumero(numero);
        return this;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public Integer getQtde() {
        return this.qtde;
    }

    public ItemComanda qtde(Integer qtde) {
        this.setQtde(qtde);
        return this;
    }

    public void setQtde(Integer qtde) {
        this.qtde = qtde;
    }

    public BigDecimal getValor() {
        return this.valor;
    }

    public ItemComanda valor(BigDecimal valor) {
        this.setValor(valor);
        return this;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public TipoPagamento getTipoPagamento() {
        return this.tipoPagamento;
    }

    public void setTipoPagamento(TipoPagamento tipoPagamento) {
        this.tipoPagamento = tipoPagamento;
    }

    public ItemComanda tipoPagamento(TipoPagamento tipoPagamento) {
        this.setTipoPagamento(tipoPagamento);
        return this;
    }

    public TipoServico getTipoServico() {
        return this.tipoServico;
    }

    public void setTipoServico(TipoServico tipoServico) {
        this.tipoServico = tipoServico;
    }

    public ItemComanda tipoServico(TipoServico tipoServico) {
        this.setTipoServico(tipoServico);
        return this;
    }

    public Comanda getComandaPai() {
        return this.comandaPai;
    }

    public void setComandaPai(Comanda comanda) {
        this.comandaPai = comanda;
    }

    public ItemComanda comandaPai(Comanda comanda) {
        this.setComandaPai(comanda);
        return this;
    }

    public Comanda getComanda() {
        return this.comanda;
    }

    public void setComanda(Comanda comanda) {
        this.comanda = comanda;
    }

    public ItemComanda comanda(Comanda comanda) {
        this.setComanda(comanda);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ItemComanda)) {
            return false;
        }
        return getId() != null && getId().equals(((ItemComanda) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ItemComanda{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", observacao='" + getObservacao() + "'" +
            ", data='" + getData() + "'" +
            ", numero=" + getNumero() +
            ", qtde=" + getQtde() +
            ", valor=" + getValor() +
            "}";
    }
}
