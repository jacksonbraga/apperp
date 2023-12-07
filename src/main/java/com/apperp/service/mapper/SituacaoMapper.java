package com.apperp.service.mapper;

import com.apperp.domain.Situacao;
import com.apperp.service.dto.SituacaoDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Situacao} and its DTO {@link SituacaoDTO}.
 */
@Mapper(componentModel = "spring")
public interface SituacaoMapper extends EntityMapper<SituacaoDTO, Situacao> {}
