package com.apperp.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link com.apperp.domain.Comanda} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ComandaDTO implements Serializable {

    private Long id;

    private String descricao;

    private String observacao;

    private LocalDate data;

    private Integer numero;

    private SituacaoDTO situacao;

    private ComandaDTO controle;

    private ControleComandaDTO controleComanda;

    private BigDecimal cartao;

    private BigDecimal pix;

    private BigDecimal dinheiro;

    private BigDecimal transferido;

    public BigDecimal getCartao() {
        return cartao;
    }

    public void setCartao(BigDecimal cartao) {
        this.cartao = cartao;
    }

    public BigDecimal getPix() {
        return pix;
    }

    public void setPix(BigDecimal pix) {
        this.pix = pix;
    }

    public BigDecimal getDinheiro() {
        return dinheiro;
    }

    public void setDinheiro(BigDecimal dinheiro) {
        this.dinheiro = dinheiro;
    }

    public BigDecimal getTransferido() {
        return transferido;
    }

    public void setTransferido(BigDecimal transferido) {
        this.transferido = transferido;
    }

    private BigDecimal valor;

    private String resumo;

    public String getResumo() {
        return resumo;
    }

    public void setResumo(String resumo) {
        this.resumo = resumo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public SituacaoDTO getSituacao() {
        return situacao;
    }

    public void setSituacao(SituacaoDTO situacao) {
        this.situacao = situacao;
    }

    public ComandaDTO getControle() {
        return controle;
    }

    public void setControle(ComandaDTO controle) {
        this.controle = controle;
    }

    public ControleComandaDTO getControleComanda() {
        return controleComanda;
    }

    public void setControleComanda(ControleComandaDTO controleComanda) {
        this.controleComanda = controleComanda;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ComandaDTO)) {
            return false;
        }

        ComandaDTO comandaDTO = (ComandaDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, comandaDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ComandaDTO{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", observacao='" + getObservacao() + "'" +
            ", data='" + getData() + "'" +
            ", numero=" + getNumero() +
            ", situacao=" + getSituacao() +
            ", controle=" + getControle() +
            ", controleComanda=" + getControleComanda() +
            "}";
    }
}
