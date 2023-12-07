package com.apperp.service.mapper;

import com.apperp.domain.GrupoDespesa;
import com.apperp.domain.TipoDespesa;
import com.apperp.service.dto.GrupoDespesaDTO;
import com.apperp.service.dto.TipoDespesaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TipoDespesa} and its DTO {@link TipoDespesaDTO}.
 */
@Mapper(componentModel = "spring")
public interface TipoDespesaMapper extends EntityMapper<TipoDespesaDTO, TipoDespesa> {
    @Mapping(target = "grupoDespesa", source = "grupoDespesa", qualifiedByName = "grupoDespesaDescricao")
    TipoDespesaDTO toDto(TipoDespesa s);

    @Named("grupoDespesaDescricao")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    GrupoDespesaDTO toDtoGrupoDespesaDescricao(GrupoDespesa grupoDespesa);
}
