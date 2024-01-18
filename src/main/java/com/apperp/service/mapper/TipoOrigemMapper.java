package com.apperp.service.mapper;

import com.apperp.domain.GrupoOrigem;
import com.apperp.domain.TipoOrigem;
import com.apperp.service.dto.GrupoOrigemDTO;
import com.apperp.service.dto.TipoOrigemDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TipoOrigem} and its DTO {@link TipoOrigemDTO}.
 */
@Mapper(componentModel = "spring")
public interface TipoOrigemMapper extends EntityMapper<TipoOrigemDTO, TipoOrigem> {
    @Mapping(target = "grupoOrigems", source = "grupoOrigems", qualifiedByName = "grupoOrigemDescricaoSet")
    TipoOrigemDTO toDto(TipoOrigem s);

    @Mapping(target = "removeGrupoOrigem", ignore = true)
    TipoOrigem toEntity(TipoOrigemDTO tipoOrigemDTO);

    @Named("grupoOrigemDescricao")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    GrupoOrigemDTO toDtoGrupoOrigemDescricao(GrupoOrigem grupoOrigem);

    @Named("grupoOrigemDescricaoSet")
    default Set<GrupoOrigemDTO> toDtoGrupoOrigemDescricaoSet(Set<GrupoOrigem> grupoOrigem) {
        return grupoOrigem.stream().map(this::toDtoGrupoOrigemDescricao).collect(Collectors.toSet());
    }
}
