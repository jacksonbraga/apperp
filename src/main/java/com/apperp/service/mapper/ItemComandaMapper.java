package com.apperp.service.mapper;

import com.apperp.domain.Comanda;
import com.apperp.domain.ItemComanda;
import com.apperp.domain.TipoPagamento;
import com.apperp.domain.TipoServico;
import com.apperp.service.dto.ComandaDTO;
import com.apperp.service.dto.ItemComandaDTO;
import com.apperp.service.dto.TipoPagamentoDTO;
import com.apperp.service.dto.TipoServicoDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ItemComanda} and its DTO {@link ItemComandaDTO}.
 */
@Mapper(componentModel = "spring")
public interface ItemComandaMapper extends EntityMapper<ItemComandaDTO, ItemComanda> {
    @Mapping(target = "tipoPagamento", source = "tipoPagamento", qualifiedByName = "tipoPagamentoDescricao")
    @Mapping(target = "tipoServico", source = "tipoServico", qualifiedByName = "tipoServicoDescricao")
    @Mapping(target = "comandaPai", source = "comandaPai", qualifiedByName = "comandaId")
    @Mapping(target = "comanda", source = "comanda", qualifiedByName = "comandaDescricao")
    ItemComandaDTO toDto(ItemComanda s);

    @Named("tipoPagamentoDescricao")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    TipoPagamentoDTO toDtoTipoPagamentoDescricao(TipoPagamento tipoPagamento);

    @Named("tipoServicoDescricao")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    TipoServicoDTO toDtoTipoServicoDescricao(TipoServico tipoServico);

    @Named("comandaId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ComandaDTO toDtoComandaId(Comanda comanda);

    @Named("comandaDescricao")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    ComandaDTO toDtoComandaDescricao(Comanda comanda);
}
