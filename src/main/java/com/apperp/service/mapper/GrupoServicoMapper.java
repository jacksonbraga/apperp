package com.apperp.service.mapper;

import com.apperp.domain.GrupoServico;
import com.apperp.service.dto.GrupoServicoDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link GrupoServico} and its DTO {@link GrupoServicoDTO}.
 */
@Mapper(componentModel = "spring")
public interface GrupoServicoMapper extends EntityMapper<GrupoServicoDTO, GrupoServico> {}
