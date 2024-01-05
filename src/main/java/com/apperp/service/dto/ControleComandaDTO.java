package com.apperp.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link com.apperp.domain.ControleComanda} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ControleComandaDTO implements Serializable {

    private Long id;

    private String descricao;

    private Long faixaInicio;

    private Long faixaFim;

    private LocalDate data;

    private CorDTO cor;

    private BigDecimal valor;

    private String resumo;

    private Long qtdeComandas;

    public Long getQtdeComandas() {
        return qtdeComandas;
    }

    public void setQtdeComandas(Long qtdeComandas) {
        this.qtdeComandas = qtdeComandas;
    }

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

    public Long getFaixaInicio() {
        return faixaInicio;
    }

    public void setFaixaInicio(Long faixaInicio) {
        this.faixaInicio = faixaInicio;
    }

    public Long getFaixaFim() {
        return faixaFim;
    }

    public void setFaixaFim(Long faixaFim) {
        this.faixaFim = faixaFim;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public CorDTO getCor() {
        return cor;
    }

    public void setCor(CorDTO cor) {
        this.cor = cor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ControleComandaDTO)) {
            return false;
        }

        ControleComandaDTO controleComandaDTO = (ControleComandaDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, controleComandaDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ControleComandaDTO{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", faixaInicio=" + getFaixaInicio() +
            ", faixaFim=" + getFaixaFim() +
            ", data='" + getData() + "'" +
            ", cor=" + getCor() +
            "}";
    }
}
