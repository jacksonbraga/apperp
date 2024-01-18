package com.apperp.service.mapper;

import com.apperp.domain.GrupoOrigem;
import com.apperp.service.dto.GrupoOrigemDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link GrupoOrigem} and its DTO {@link GrupoOrigemDTO}.
 */
@Mapper(componentModel = "spring")
public interface GrupoOrigemMapper extends EntityMapper<GrupoOrigemDTO, GrupoOrigem> {}
