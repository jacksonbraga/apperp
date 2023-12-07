package com.apperp.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.apperp.domain.ControleComanda} entity. This class is used
 * in {@link com.apperp.web.rest.ControleComandaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /controle-comandas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ControleComandaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter descricao;

    private LongFilter faixaInicio;

    private LongFilter faixaFim;

    private LocalDateFilter data;

    private LongFilter comandasId;

    private LongFilter corId;

    private LongFilter listaComandasId;

    private Boolean distinct;

    public ControleComandaCriteria() {}

    public ControleComandaCriteria(ControleComandaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.descricao = other.descricao == null ? null : other.descricao.copy();
        this.faixaInicio = other.faixaInicio == null ? null : other.faixaInicio.copy();
        this.faixaFim = other.faixaFim == null ? null : other.faixaFim.copy();
        this.data = other.data == null ? null : other.data.copy();
        this.comandasId = other.comandasId == null ? null : other.comandasId.copy();
        this.corId = other.corId == null ? null : other.corId.copy();
        this.listaComandasId = other.listaComandasId == null ? null : other.listaComandasId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public ControleComandaCriteria copy() {
        return new ControleComandaCriteria(this);
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

    public LongFilter getFaixaInicio() {
        return faixaInicio;
    }

    public LongFilter faixaInicio() {
        if (faixaInicio == null) {
            faixaInicio = new LongFilter();
        }
        return faixaInicio;
    }

    public void setFaixaInicio(LongFilter faixaInicio) {
        this.faixaInicio = faixaInicio;
    }

    public LongFilter getFaixaFim() {
        return faixaFim;
    }

    public LongFilter faixaFim() {
        if (faixaFim == null) {
            faixaFim = new LongFilter();
        }
        return faixaFim;
    }

    public void setFaixaFim(LongFilter faixaFim) {
        this.faixaFim = faixaFim;
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

    public LongFilter getComandasId() {
        return comandasId;
    }

    public LongFilter comandasId() {
        if (comandasId == null) {
            comandasId = new LongFilter();
        }
        return comandasId;
    }

    public void setComandasId(LongFilter comandasId) {
        this.comandasId = comandasId;
    }

    public LongFilter getCorId() {
        return corId;
    }

    public LongFilter corId() {
        if (corId == null) {
            corId = new LongFilter();
        }
        return corId;
    }

    public void setCorId(LongFilter corId) {
        this.corId = corId;
    }

    public LongFilter getListaComandasId() {
        return listaComandasId;
    }

    public LongFilter listaComandasId() {
        if (listaComandasId == null) {
            listaComandasId = new LongFilter();
        }
        return listaComandasId;
    }

    public void setListaComandasId(LongFilter listaComandasId) {
        this.listaComandasId = listaComandasId;
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
        final ControleComandaCriteria that = (ControleComandaCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(descricao, that.descricao) &&
            Objects.equals(faixaInicio, that.faixaInicio) &&
            Objects.equals(faixaFim, that.faixaFim) &&
            Objects.equals(data, that.data) &&
            Objects.equals(comandasId, that.comandasId) &&
            Objects.equals(corId, that.corId) &&
            Objects.equals(listaComandasId, that.listaComandasId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, descricao, faixaInicio, faixaFim, data, comandasId, corId, listaComandasId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ControleComandaCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (descricao != null ? "descricao=" + descricao + ", " : "") +
            (faixaInicio != null ? "faixaInicio=" + faixaInicio + ", " : "") +
            (faixaFim != null ? "faixaFim=" + faixaFim + ", " : "") +
            (data != null ? "data=" + data + ", " : "") +
            (comandasId != null ? "comandasId=" + comandasId + ", " : "") +
            (corId != null ? "corId=" + corId + ", " : "") +
            (listaComandasId != null ? "listaComandasId=" + listaComandasId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
