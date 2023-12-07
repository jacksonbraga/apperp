package com.apperp.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.apperp.domain.Comanda} entity. This class is used
 * in {@link com.apperp.web.rest.ComandaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /comandas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ComandaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter descricao;

    private StringFilter observacao;

    private LocalDateFilter data;

    private IntegerFilter numero;

    private LongFilter itensId;

    private LongFilter situacaoId;

    private LongFilter controleId;

    private LongFilter controleComandaId;

    private LongFilter listaItensId;

    private Boolean distinct;

    public ComandaCriteria() {}

    public ComandaCriteria(ComandaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.descricao = other.descricao == null ? null : other.descricao.copy();
        this.observacao = other.observacao == null ? null : other.observacao.copy();
        this.data = other.data == null ? null : other.data.copy();
        this.numero = other.numero == null ? null : other.numero.copy();
        this.itensId = other.itensId == null ? null : other.itensId.copy();
        this.situacaoId = other.situacaoId == null ? null : other.situacaoId.copy();
        this.controleId = other.controleId == null ? null : other.controleId.copy();
        this.controleComandaId = other.controleComandaId == null ? null : other.controleComandaId.copy();
        this.listaItensId = other.listaItensId == null ? null : other.listaItensId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public ComandaCriteria copy() {
        return new ComandaCriteria(this);
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

    public LongFilter getItensId() {
        return itensId;
    }

    public LongFilter itensId() {
        if (itensId == null) {
            itensId = new LongFilter();
        }
        return itensId;
    }

    public void setItensId(LongFilter itensId) {
        this.itensId = itensId;
    }

    public LongFilter getSituacaoId() {
        return situacaoId;
    }

    public LongFilter situacaoId() {
        if (situacaoId == null) {
            situacaoId = new LongFilter();
        }
        return situacaoId;
    }

    public void setSituacaoId(LongFilter situacaoId) {
        this.situacaoId = situacaoId;
    }

    public LongFilter getControleId() {
        return controleId;
    }

    public LongFilter controleId() {
        if (controleId == null) {
            controleId = new LongFilter();
        }
        return controleId;
    }

    public void setControleId(LongFilter controleId) {
        this.controleId = controleId;
    }

    public LongFilter getControleComandaId() {
        return controleComandaId;
    }

    public LongFilter controleComandaId() {
        if (controleComandaId == null) {
            controleComandaId = new LongFilter();
        }
        return controleComandaId;
    }

    public void setControleComandaId(LongFilter controleComandaId) {
        this.controleComandaId = controleComandaId;
    }

    public LongFilter getListaItensId() {
        return listaItensId;
    }

    public LongFilter listaItensId() {
        if (listaItensId == null) {
            listaItensId = new LongFilter();
        }
        return listaItensId;
    }

    public void setListaItensId(LongFilter listaItensId) {
        this.listaItensId = listaItensId;
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
        final ComandaCriteria that = (ComandaCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(descricao, that.descricao) &&
            Objects.equals(observacao, that.observacao) &&
            Objects.equals(data, that.data) &&
            Objects.equals(numero, that.numero) &&
            Objects.equals(itensId, that.itensId) &&
            Objects.equals(situacaoId, that.situacaoId) &&
            Objects.equals(controleId, that.controleId) &&
            Objects.equals(controleComandaId, that.controleComandaId) &&
            Objects.equals(listaItensId, that.listaItensId) &&
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
            itensId,
            situacaoId,
            controleId,
            controleComandaId,
            listaItensId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ComandaCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (descricao != null ? "descricao=" + descricao + ", " : "") +
            (observacao != null ? "observacao=" + observacao + ", " : "") +
            (data != null ? "data=" + data + ", " : "") +
            (numero != null ? "numero=" + numero + ", " : "") +
            (itensId != null ? "itensId=" + itensId + ", " : "") +
            (situacaoId != null ? "situacaoId=" + situacaoId + ", " : "") +
            (controleId != null ? "controleId=" + controleId + ", " : "") +
            (controleComandaId != null ? "controleComandaId=" + controleComandaId + ", " : "") +
            (listaItensId != null ? "listaItensId=" + listaItensId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
