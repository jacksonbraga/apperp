package com.apperp.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.math.BigDecimal;
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

    private ControleComandaDTO controle;

    private ControleComandaDTO controleComanda;

    private BigDecimal valor;

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

    public ControleComandaDTO getControle() {
        return controle;
    }

    public void setControle(ControleComandaDTO controle) {
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
