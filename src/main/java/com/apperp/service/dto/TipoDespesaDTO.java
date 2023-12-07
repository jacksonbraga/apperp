package com.apperp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.apperp.domain.TipoDespesa} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TipoDespesaDTO implements Serializable {

    private Long id;

    private String descricao;

    private GrupoDespesaDTO grupoDespesa;

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

    public GrupoDespesaDTO getGrupoDespesa() {
        return grupoDespesa;
    }

    public void setGrupoDespesa(GrupoDespesaDTO grupoDespesa) {
        this.grupoDespesa = grupoDespesa;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoDespesaDTO)) {
            return false;
        }

        TipoDespesaDTO tipoDespesaDTO = (TipoDespesaDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, tipoDespesaDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoDespesaDTO{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", grupoDespesa=" + getGrupoDespesa() +
            "}";
    }
}
