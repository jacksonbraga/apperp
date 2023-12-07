package com.apperp.service.mapper;

import com.apperp.domain.GrupoPagamento;
import com.apperp.domain.TipoPagamento;
import com.apperp.service.dto.GrupoPagamentoDTO;
import com.apperp.service.dto.TipoPagamentoDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TipoPagamento} and its DTO {@link TipoPagamentoDTO}.
 */
@Mapper(componentModel = "spring")
public interface TipoPagamentoMapper extends EntityMapper<TipoPagamentoDTO, TipoPagamento> {
    @Mapping(target = "grupoPagamento", source = "grupoPagamento", qualifiedByName = "grupoPagamentoDescricao")
    TipoPagamentoDTO toDto(TipoPagamento s);

    @Named("grupoPagamentoDescricao")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    GrupoPagamentoDTO toDtoGrupoPagamentoDescricao(GrupoPagamento grupoPagamento);
}
