package com.apperp.service.mapper;

import com.apperp.domain.Cor;
import com.apperp.service.dto.CorDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Cor} and its DTO {@link CorDTO}.
 */
@Mapper(componentModel = "spring")
public interface CorMapper extends EntityMapper<CorDTO, Cor> {}
