package com.apperp.service.mapper;

import com.apperp.domain.GrupoDespesa;
import com.apperp.service.dto.GrupoDespesaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link GrupoDespesa} and its DTO {@link GrupoDespesaDTO}.
 */
@Mapper(componentModel = "spring")
public interface GrupoDespesaMapper extends EntityMapper<GrupoDespesaDTO, GrupoDespesa> {}
