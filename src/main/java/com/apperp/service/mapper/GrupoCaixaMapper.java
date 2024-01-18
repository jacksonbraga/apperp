package com.apperp.service.mapper;

import com.apperp.domain.GrupoCaixa;
import com.apperp.service.dto.GrupoCaixaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link GrupoCaixa} and its DTO {@link GrupoCaixaDTO}.
 */
@Mapper(componentModel = "spring")
public interface GrupoCaixaMapper extends EntityMapper<GrupoCaixaDTO, GrupoCaixa> {}
