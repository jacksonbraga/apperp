package com.apperp.service.mapper;

import com.apperp.domain.Comanda;
import com.apperp.domain.ControleComanda;
import com.apperp.domain.Situacao;
import com.apperp.service.dto.ComandaDTO;
import com.apperp.service.dto.ControleComandaDTO;
import com.apperp.service.dto.SituacaoDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Comanda} and its DTO {@link ComandaDTO}.
 */
@Mapper(componentModel = "spring")
public interface ComandaMapper extends EntityMapper<ComandaDTO, Comanda> {
    @Mapping(target = "situacao", source = "situacao", qualifiedByName = "situacaoDescricao")
    // @Mapping(target = "controle", source = "controle", qualifiedByName = "controleId")
    @Mapping(target = "controleComanda", source = "controleComanda", qualifiedByName = "controleComandaDescricao")
    ComandaDTO toDto(Comanda s);

    @Named("situacaoDescricao")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    SituacaoDTO toDtoSituacaoDescricao(Situacao situacao);

    @Named("controleComandaId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ControleComandaDTO toDtoControleComandaId(ControleComanda controleComanda);

    /*     @Named("controleId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ComandaDTO toDtoControleId(Comanda controle); */

    @Named("controleComandaDescricao")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    @Mapping(target = "cor", source = "cor")
    ControleComandaDTO toDtoControleComandaDescricao(ControleComanda controleComanda);
}
