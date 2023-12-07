package com.apperp.service.mapper;

import com.apperp.domain.GrupoServico;
import com.apperp.domain.TipoServico;
import com.apperp.service.dto.GrupoServicoDTO;
import com.apperp.service.dto.TipoServicoDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TipoServico} and its DTO {@link TipoServicoDTO}.
 */
@Mapper(componentModel = "spring")
public interface TipoServicoMapper extends EntityMapper<TipoServicoDTO, TipoServico> {
    @Mapping(target = "grupoServico", source = "grupoServico", qualifiedByName = "grupoServicoDescricao")
    TipoServicoDTO toDto(TipoServico s);

    @Named("grupoServicoDescricao")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    GrupoServicoDTO toDtoGrupoServicoDescricao(GrupoServico grupoServico);
}
