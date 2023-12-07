package com.apperp.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.apperp.domain.Despesa} entity. This class is used
 * in {@link com.apperp.web.rest.DespesaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /despesas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DespesaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter descricao;

    private StringFilter observacao;

    private IntegerFilter parcela;

    private IntegerFilter totalParcela;

    private BigDecimalFilter valor;

    private LocalDateFilter data;

    private LocalDateFilter dataVencimento;

    private LongFilter tipoDespesaId;

    private Boolean distinct;

    public DespesaCriteria() {}

    public DespesaCriteria(DespesaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.descricao = other.descricao == null ? null : other.descricao.copy();
        this.observacao = other.observacao == null ? null : other.observacao.copy();
        this.parcela = other.parcela == null ? null : other.parcela.copy();
        this.totalParcela = other.totalParcela == null ? null : other.totalParcela.copy();
        this.valor = other.valor == null ? null : other.valor.copy();
        this.data = other.data == null ? null : other.data.copy();
        this.dataVencimento = other.dataVencimento == null ? null : other.dataVencimento.copy();
        this.tipoDespesaId = other.tipoDespesaId == null ? null : other.tipoDespesaId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public DespesaCriteria copy() {
        return new DespesaCriteria(this);
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

    public IntegerFilter getParcela() {
        return parcela;
    }

    public IntegerFilter parcela() {
        if (parcela == null) {
            parcela = new IntegerFilter();
        }
        return parcela;
    }

    public void setParcela(IntegerFilter parcela) {
        this.parcela = parcela;
    }

    public IntegerFilter getTotalParcela() {
        return totalParcela;
    }

    public IntegerFilter totalParcela() {
        if (totalParcela == null) {
            totalParcela = new IntegerFilter();
        }
        return totalParcela;
    }

    public void setTotalParcela(IntegerFilter totalParcela) {
        this.totalParcela = totalParcela;
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

    public LocalDateFilter getDataVencimento() {
        return dataVencimento;
    }

    public LocalDateFilter dataVencimento() {
        if (dataVencimento == null) {
            dataVencimento = new LocalDateFilter();
        }
        return dataVencimento;
    }

    public void setDataVencimento(LocalDateFilter dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    public LongFilter getTipoDespesaId() {
        return tipoDespesaId;
    }

    public LongFilter tipoDespesaId() {
        if (tipoDespesaId == null) {
            tipoDespesaId = new LongFilter();
        }
        return tipoDespesaId;
    }

    public void setTipoDespesaId(LongFilter tipoDespesaId) {
        this.tipoDespesaId = tipoDespesaId;
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
        final DespesaCriteria that = (DespesaCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(descricao, that.descricao) &&
            Objects.equals(observacao, that.observacao) &&
            Objects.equals(parcela, that.parcela) &&
            Objects.equals(totalParcela, that.totalParcela) &&
            Objects.equals(valor, that.valor) &&
            Objects.equals(data, that.data) &&
            Objects.equals(dataVencimento, that.dataVencimento) &&
            Objects.equals(tipoDespesaId, that.tipoDespesaId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, descricao, observacao, parcela, totalParcela, valor, data, dataVencimento, tipoDespesaId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DespesaCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (descricao != null ? "descricao=" + descricao + ", " : "") +
            (observacao != null ? "observacao=" + observacao + ", " : "") +
            (parcela != null ? "parcela=" + parcela + ", " : "") +
            (totalParcela != null ? "totalParcela=" + totalParcela + ", " : "") +
            (valor != null ? "valor=" + valor + ", " : "") +
            (data != null ? "data=" + data + ", " : "") +
            (dataVencimento != null ? "dataVencimento=" + dataVencimento + ", " : "") +
            (tipoDespesaId != null ? "tipoDespesaId=" + tipoDespesaId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
