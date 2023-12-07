package com.apperp.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.apperp.domain.ItemComanda} entity. This class is used
 * in {@link com.apperp.web.rest.ItemComandaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /item-comandas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ItemComandaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter descricao;

    private StringFilter observacao;

    private LocalDateFilter data;

    private IntegerFilter numero;

    private IntegerFilter qtde;

    private BigDecimalFilter valor;

    private LongFilter tipoPagamentoId;

    private LongFilter tipoServicoId;

    private LongFilter comandaPaiId;

    private LongFilter comandaId;

    private Boolean distinct;

    public ItemComandaCriteria() {}

    public ItemComandaCriteria(ItemComandaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.descricao = other.descricao == null ? null : other.descricao.copy();
        this.observacao = other.observacao == null ? null : other.observacao.copy();
        this.data = other.data == null ? null : other.data.copy();
        this.numero = other.numero == null ? null : other.numero.copy();
        this.qtde = other.qtde == null ? null : other.qtde.copy();
        this.valor = other.valor == null ? null : other.valor.copy();
        this.tipoPagamentoId = other.tipoPagamentoId == null ? null : other.tipoPagamentoId.copy();
        this.tipoServicoId = other.tipoServicoId == null ? null : other.tipoServicoId.copy();
        this.comandaPaiId = other.comandaPaiId == null ? null : other.comandaPaiId.copy();
        this.comandaId = other.comandaId == null ? null : other.comandaId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public ItemComandaCriteria copy() {
        return new ItemComandaCriteria(this);
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

    public IntegerFilter getNumero() {
        return numero;
    }

    public IntegerFilter numero() {
        if (numero == null) {
            numero = new IntegerFilter();
        }
        return numero;
    }

    public void setNumero(IntegerFilter numero) {
        this.numero = numero;
    }

    public IntegerFilter getQtde() {
        return qtde;
    }

    public IntegerFilter qtde() {
        if (qtde == null) {
            qtde = new IntegerFilter();
        }
        return qtde;
    }

    public void setQtde(IntegerFilter qtde) {
        this.qtde = qtde;
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

    public LongFilter getTipoPagamentoId() {
        return tipoPagamentoId;
    }

    public LongFilter tipoPagamentoId() {
        if (tipoPagamentoId == null) {
            tipoPagamentoId = new LongFilter();
        }
        return tipoPagamentoId;
    }

    public void setTipoPagamentoId(LongFilter tipoPagamentoId) {
        this.tipoPagamentoId = tipoPagamentoId;
    }

    public LongFilter getTipoServicoId() {
        return tipoServicoId;
    }

    public LongFilter tipoServicoId() {
        if (tipoServicoId == null) {
            tipoServicoId = new LongFilter();
        }
        return tipoServicoId;
    }

    public void setTipoServicoId(LongFilter tipoServicoId) {
        this.tipoServicoId = tipoServicoId;
    }

    public LongFilter getComandaPaiId() {
        return comandaPaiId;
    }

    public LongFilter comandaPaiId() {
        if (comandaPaiId == null) {
            comandaPaiId = new LongFilter();
        }
        return comandaPaiId;
    }

    public void setComandaPaiId(LongFilter comandaPaiId) {
        this.comandaPaiId = comandaPaiId;
    }

    public LongFilter getComandaId() {
        return comandaId;
    }

    public LongFilter comandaId() {
        if (comandaId == null) {
            comandaId = new LongFilter();
        }
        return comandaId;
    }

    public void setComandaId(LongFilter comandaId) {
        this.comandaId = comandaId;
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
        final ItemComandaCriteria that = (ItemComandaCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(descricao, that.descricao) &&
            Objects.equals(observacao, that.observacao) &&
            Objects.equals(data, that.data) &&
            Objects.equals(numero, that.numero) &&
            Objects.equals(qtde, that.qtde) &&
            Objects.equals(valor, that.valor) &&
            Objects.equals(tipoPagamentoId, that.tipoPagamentoId) &&
            Objects.equals(tipoServicoId, that.tipoServicoId) &&
            Objects.equals(comandaPaiId, that.comandaPaiId) &&
            Objects.equals(comandaId, that.comandaId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            descricao,
            observacao,
            data,
            numero,
            qtde,
            valor,
            tipoPagamentoId,
            tipoServicoId,
            comandaPaiId,
            comandaId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ItemComandaCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (descricao != null ? "descricao=" + descricao + ", " : "") +
            (observacao != null ? "observacao=" + observacao + ", " : "") +
            (data != null ? "data=" + data + ", " : "") +
            (numero != null ? "numero=" + numero + ", " : "") +
            (qtde != null ? "qtde=" + qtde + ", " : "") +
            (valor != null ? "valor=" + valor + ", " : "") +
            (tipoPagamentoId != null ? "tipoPagamentoId=" + tipoPagamentoId + ", " : "") +
            (tipoServicoId != null ? "tipoServicoId=" + tipoServicoId + ", " : "") +
            (comandaPaiId != null ? "comandaPaiId=" + comandaPaiId + ", " : "") +
            (comandaId != null ? "comandaId=" + comandaId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
