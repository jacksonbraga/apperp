package com.apperp.service.mapper;

import com.apperp.domain.Caixa;
import com.apperp.domain.TipoCaixa;
import com.apperp.domain.TipoOrigem;
import com.apperp.service.dto.CaixaDTO;
import com.apperp.service.dto.TipoCaixaDTO;
import com.apperp.service.dto.TipoOrigemDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Caixa} and its DTO {@link CaixaDTO}.
 */
@Mapper(componentModel = "spring")
public interface CaixaMapper extends EntityMapper<CaixaDTO, Caixa> {
    @Mapping(target = "tipoCaixas", source = "tipoCaixas", qualifiedByName = "tipoCaixaDescricaoSet")
    @Mapping(target = "tipoOrigems", source = "tipoOrigems", qualifiedByName = "tipoOrigemDescricaoSet")
    CaixaDTO toDto(Caixa s);

    @Mapping(target = "removeTipoCaixa", ignore = true)
    @Mapping(target = "removeTipoOrigem", ignore = true)
    Caixa toEntity(CaixaDTO caixaDTO);

    @Named("tipoCaixaDescricao")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    TipoCaixaDTO toDtoTipoCaixaDescricao(TipoCaixa tipoCaixa);

    @Named("tipoCaixaDescricaoSet")
    default Set<TipoCaixaDTO> toDtoTipoCaixaDescricaoSet(Set<TipoCaixa> tipoCaixa) {
        return tipoCaixa.stream().map(this::toDtoTipoCaixaDescricao).collect(Collectors.toSet());
    }

    @Named("tipoOrigemDescricao")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    TipoOrigemDTO toDtoTipoOrigemDescricao(TipoOrigem tipoOrigem);

    @Named("tipoOrigemDescricaoSet")
    default Set<TipoOrigemDTO> toDtoTipoOrigemDescricaoSet(Set<TipoOrigem> tipoOrigem) {
        return tipoOrigem.stream().map(this::toDtoTipoOrigemDescricao).collect(Collectors.toSet());
    }
}
