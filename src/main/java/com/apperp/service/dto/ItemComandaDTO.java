package com.apperp.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link com.apperp.domain.ItemComanda} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ItemComandaDTO implements Serializable {

    private Long id;

    private String descricao;

    private String tipo;

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    private String observacao;

    private LocalDate data;

    private Integer numero;

    private Integer qtde;

    private BigDecimal valor;

    private TipoPagamentoDTO tipoPagamento;

    private TipoServicoDTO tipoServico;

    private ComandaDTO comandaPai;

    private ComandaDTO comanda;

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

    public Integer getQtde() {
        return qtde;
    }

    public void setQtde(Integer qtde) {
        this.qtde = qtde;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public TipoPagamentoDTO getTipoPagamento() {
        return tipoPagamento;
    }

    public void setTipoPagamento(TipoPagamentoDTO tipoPagamento) {
        this.tipoPagamento = tipoPagamento;
    }

    public TipoServicoDTO getTipoServico() {
        return tipoServico;
    }

    public void setTipoServico(TipoServicoDTO tipoServico) {
        this.tipoServico = tipoServico;
    }

    public ComandaDTO getComandaPai() {
        return comandaPai;
    }

    public void setComandaPai(ComandaDTO comandaPai) {
        this.comandaPai = comandaPai;
    }

    public ComandaDTO getComanda() {
        return comanda;
    }

    public void setComanda(ComandaDTO comanda) {
        this.comanda = comanda;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ItemComandaDTO)) {
            return false;
        }

        ItemComandaDTO itemComandaDTO = (ItemComandaDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, itemComandaDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ItemComandaDTO{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", observacao='" + getObservacao() + "'" +
            ", data='" + getData() + "'" +
            ", numero=" + getNumero() +
            ", qtde=" + getQtde() +
            ", valor=" + getValor() +
            ", tipoPagamento=" + getTipoPagamento() +
            ", tipoServico=" + getTipoServico() +
            ", comandaPai=" + getComandaPai() +
            ", comanda=" + getComanda() +
            "}";
    }
}
