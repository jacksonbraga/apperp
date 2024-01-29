package com.apperp.service.mapper;

import com.apperp.domain.GrupoPagamento;
import com.apperp.domain.TipoCaixa;
import com.apperp.service.dto.GrupoPagamentoDTO;
import com.apperp.service.dto.TipoCaixaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TipoCaixa} and its DTO {@link TipoCaixaDTO}.
 */
@Mapper(componentModel = "spring")
public interface TipoCaixaMapper extends EntityMapper<TipoCaixaDTO, TipoCaixa> {
    @Mapping(target = "grupoPagamento", source = "grupoPagamento", qualifiedByName = "grupoPagamentoDescricao")
    TipoCaixaDTO toDto(TipoCaixa s);

    @Named("grupoPagamentoDescricao")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    GrupoPagamentoDTO toDtoGrupoPagamentoDescricao(GrupoPagamento grupoPagamento);
}
