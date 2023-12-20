package com.apperp.service.mapper;

import com.apperp.domain.GrupoPagamento;
import com.apperp.domain.ItemComanda;
import com.apperp.service.dto.GrupoPagamentoDTO;
import com.apperp.service.dto.ItemComandaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link GrupoPagamento} and its DTO {@link GrupoPagamentoDTO}.
 */
@Mapper(componentModel = "spring")
public interface GrupoPagamentoMapper extends EntityMapper<GrupoPagamentoDTO, GrupoPagamento> {
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    @Mapping(target = "tipoColuna", source = "tipoColuna")
    GrupoPagamentoDTO toDto(GrupoPagamento s);
}
