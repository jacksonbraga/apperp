package com.apperp.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.apperp.domain.TipoServico} entity. This class is used
 * in {@link com.apperp.web.rest.TipoServicoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /tipo-servicos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TipoServicoCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter descricao;

    private LongFilter grupoServicoId;

    private LongFilter tipoServicoId;

    private Boolean distinct;

    public TipoServicoCriteria() {}

    public TipoServicoCriteria(TipoServicoCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.descricao = other.descricao == null ? null : other.descricao.copy();
        this.grupoServicoId = other.grupoServicoId == null ? null : other.grupoServicoId.copy();
        this.tipoServicoId = other.tipoServicoId == null ? null : other.tipoServicoId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public TipoServicoCriteria copy() {
        return new TipoServicoCriteria(this);
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

    public LongFilter getGrupoServicoId() {
        return grupoServicoId;
    }

    public LongFilter grupoServicoId() {
        if (grupoServicoId == null) {
            grupoServicoId = new LongFilter();
        }
        return grupoServicoId;
    }

    public void setGrupoServicoId(LongFilter grupoServicoId) {
        this.grupoServicoId = grupoServicoId;
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
        final TipoServicoCriteria that = (TipoServicoCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(descricao, that.descricao) &&
            Objects.equals(grupoServicoId, that.grupoServicoId) &&
            Objects.equals(tipoServicoId, that.tipoServicoId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, descricao, grupoServicoId, tipoServicoId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoServicoCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (descricao != null ? "descricao=" + descricao + ", " : "") +
            (grupoServicoId != null ? "grupoServicoId=" + grupoServicoId + ", " : "") +
            (tipoServicoId != null ? "tipoServicoId=" + tipoServicoId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
