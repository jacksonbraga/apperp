package com.apperp.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.apperp.domain.TipoPagamento} entity. This class is used
 * in {@link com.apperp.web.rest.TipoPagamentoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /tipo-pagamentos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TipoPagamentoCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter descricao;

    private LongFilter grupoPagamentoId;

    private LongFilter tipoPagamentoId;

    private Boolean distinct;

    public TipoPagamentoCriteria() {}

    public TipoPagamentoCriteria(TipoPagamentoCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.descricao = other.descricao == null ? null : other.descricao.copy();
        this.grupoPagamentoId = other.grupoPagamentoId == null ? null : other.grupoPagamentoId.copy();
        this.tipoPagamentoId = other.tipoPagamentoId == null ? null : other.tipoPagamentoId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public TipoPagamentoCriteria copy() {
        return new TipoPagamentoCriteria(this);
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

    public LongFilter getGrupoPagamentoId() {
        return grupoPagamentoId;
    }

    public LongFilter grupoPagamentoId() {
        if (grupoPagamentoId == null) {
            grupoPagamentoId = new LongFilter();
        }
        return grupoPagamentoId;
    }

    public void setGrupoPagamentoId(LongFilter grupoPagamentoId) {
        this.grupoPagamentoId = grupoPagamentoId;
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
        final TipoPagamentoCriteria that = (TipoPagamentoCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(descricao, that.descricao) &&
            Objects.equals(grupoPagamentoId, that.grupoPagamentoId) &&
            Objects.equals(tipoPagamentoId, that.tipoPagamentoId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, descricao, grupoPagamentoId, tipoPagamentoId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoPagamentoCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (descricao != null ? "descricao=" + descricao + ", " : "") +
            (grupoPagamentoId != null ? "grupoPagamentoId=" + grupoPagamentoId + ", " : "") +
            (tipoPagamentoId != null ? "tipoPagamentoId=" + tipoPagamentoId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
