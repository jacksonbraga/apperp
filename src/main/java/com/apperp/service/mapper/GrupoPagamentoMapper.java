package com.apperp.service.mapper;

import com.apperp.domain.GrupoPagamento;
import com.apperp.service.dto.GrupoPagamentoDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link GrupoPagamento} and its DTO {@link GrupoPagamentoDTO}.
 */
@Mapper(componentModel = "spring")
public interface GrupoPagamentoMapper extends EntityMapper<GrupoPagamentoDTO, GrupoPagamento> {}
