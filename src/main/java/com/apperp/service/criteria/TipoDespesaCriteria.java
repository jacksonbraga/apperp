package com.apperp.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.apperp.domain.TipoDespesa} entity. This class is used
 * in {@link com.apperp.web.rest.TipoDespesaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /tipo-despesas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TipoDespesaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter descricao;

    private LongFilter grupoDespesaId;

    private Boolean distinct;

    public TipoDespesaCriteria() {}

    public TipoDespesaCriteria(TipoDespesaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.descricao = other.descricao == null ? null : other.descricao.copy();
        this.grupoDespesaId = other.grupoDespesaId == null ? null : other.grupoDespesaId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public TipoDespesaCriteria copy() {
        return new TipoDespesaCriteria(this);
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

    public LongFilter getGrupoDespesaId() {
        return grupoDespesaId;
    }

    public LongFilter grupoDespesaId() {
        if (grupoDespesaId == null) {
            grupoDespesaId = new LongFilter();
        }
        return grupoDespesaId;
    }

    public void setGrupoDespesaId(LongFilter grupoDespesaId) {
        this.grupoDespesaId = grupoDespesaId;
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
        final TipoDespesaCriteria that = (TipoDespesaCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(descricao, that.descricao) &&
            Objects.equals(grupoDespesaId, that.grupoDespesaId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, descricao, grupoDespesaId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoDespesaCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (descricao != null ? "descricao=" + descricao + ", " : "") +
            (grupoDespesaId != null ? "grupoDespesaId=" + grupoDespesaId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
