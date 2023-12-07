package com.apperp.service.mapper;

import com.apperp.domain.Despesa;
import com.apperp.domain.TipoDespesa;
import com.apperp.service.dto.DespesaDTO;
import com.apperp.service.dto.TipoDespesaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Despesa} and its DTO {@link DespesaDTO}.
 */
@Mapper(componentModel = "spring")
public interface DespesaMapper extends EntityMapper<DespesaDTO, Despesa> {
    @Mapping(target = "tipoDespesa", source = "tipoDespesa", qualifiedByName = "tipoDespesaDescricao")
    DespesaDTO toDto(Despesa s);

    @Named("tipoDespesaDescricao")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    TipoDespesaDTO toDtoTipoDespesaDescricao(TipoDespesa tipoDespesa);
}
