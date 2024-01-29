package com.apperp.service.mapper;

import com.apperp.domain.GrupoOrigem;
import com.apperp.domain.TipoOrigem;
import com.apperp.service.dto.GrupoOrigemDTO;
import com.apperp.service.dto.TipoOrigemDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TipoOrigem} and its DTO {@link TipoOrigemDTO}.
 */
@Mapper(componentModel = "spring")
public interface TipoOrigemMapper extends EntityMapper<TipoOrigemDTO, TipoOrigem> {
    @Mapping(target = "grupoOrigem", source = "grupoOrigem", qualifiedByName = "grupoOrigemDescricao")
    TipoOrigemDTO toDto(TipoOrigem s);

    @Named("grupoOrigemDescricao")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    GrupoOrigemDTO toDtoGrupoOrigemDescricao(GrupoOrigem grupoOrigem);
}
