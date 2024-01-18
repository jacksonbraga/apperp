package com.apperp.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.apperp.domain.Caixa} entity. This class is used
 * in {@link com.apperp.web.rest.CaixaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /caixas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CaixaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter descricao;

    private StringFilter observacao;

    private BigDecimalFilter valor;

    private LocalDateFilter data;

    private LongFilter tipoCaixaId;

    private LongFilter tipoOrigemId;

    private Boolean distinct;

    public CaixaCriteria() {}

    public CaixaCriteria(CaixaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.descricao = other.descricao == null ? null : other.descricao.copy();
        this.observacao = other.observacao == null ? null : other.observacao.copy();
        this.valor = other.valor == null ? null : other.valor.copy();
        this.data = other.data == null ? null : other.data.copy();
        this.tipoCaixaId = other.tipoCaixaId == null ? null : other.tipoCaixaId.copy();
        this.tipoOrigemId = other.tipoOrigemId == null ? null : other.tipoOrigemId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public CaixaCriteria copy() {
        return new CaixaCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public LongFilter id() {
        if (id == null) {
            id = new LongFilter();
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getDescricao() {
        return descricao;
    }

    public StringFilter descricao() {
        if (descricao == null) {
            descricao = new StringFilter();
        }
        return descricao;
    }

    public void setDescricao(StringFilter descricao) {
        this.descricao = descricao;
    }

    public StringFilter getObservacao() {
        return observacao;
    }

    public StringFilter observacao() {
        if (observacao == null) {
            observacao = new StringFilter();
        }
        return observacao;
    }

    public void setObservacao(StringFilter observacao) {
        this.observacao = observacao;
    }

    public BigDecimalFilter getValor() {
        return valor;
    }

    public BigDecimalFilter valor() {
        if (valor == null) {
            valor = new BigDecimalFilter();
        }
        return valor;
    }

    public void setValor(BigDecimalFilter valor) {
        this.valor = valor;
    }

    public LocalDateFilter getData() {
        return data;
    }

    public LocalDateFilter data() {
        if (data == null) {
            data = new LocalDateFilter();
        }
        return data;
    }

    public void setData(LocalDateFilter data) {
        this.data = data;
    }

    public LongFilter getTipoCaixaId() {
        return tipoCaixaId;
    }

    public LongFilter tipoCaixaId() {
        if (tipoCaixaId == null) {
            tipoCaixaId = new LongFilter();
        }
        return tipoCaixaId;
    }

    public void setTipoCaixaId(LongFilter tipoCaixaId) {
        this.tipoCaixaId = tipoCaixaId;
    }

    public LongFilter getTipoOrigemId() {
        return tipoOrigemId;
    }

    public LongFilter tipoOrigemId() {
        if (tipoOrigemId == null) {
            tipoOrigemId = new LongFilter();
        }
        return tipoOrigemId;
    }

    public void setTipoOrigemId(LongFilter tipoOrigemId) {
        this.tipoOrigemId = tipoOrigemId;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final CaixaCriteria that = (CaixaCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(descricao, that.descricao) &&
            Objects.equals(observacao, that.observacao) &&
            Objects.equals(valor, that.valor) &&
            Objects.equals(data, that.data) &&
            Objects.equals(tipoCaixaId, that.tipoCaixaId) &&
            Objects.equals(tipoOrigemId, that.tipoOrigemId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, descricao, observacao, valor, data, tipoCaixaId, tipoOrigemId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CaixaCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (descricao != null ? "descricao=" + descricao + ", " : "") +
            (observacao != null ? "observacao=" + observacao + ", " : "") +
            (valor != null ? "valor=" + valor + ", " : "") +
            (data != null ? "data=" + data + ", " : "") +
            (tipoCaixaId != null ? "tipoCaixaId=" + tipoCaixaId + ", " : "") +
            (tipoOrigemId != null ? "tipoOrigemId=" + tipoOrigemId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
