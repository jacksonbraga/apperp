package com.apperp.service.mapper;

import com.apperp.domain.Caixa;
import com.apperp.domain.TipoCaixa;
import com.apperp.domain.TipoOrigem;
import com.apperp.service.dto.CaixaDTO;
import com.apperp.service.dto.TipoCaixaDTO;
import com.apperp.service.dto.TipoOrigemDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Caixa} and its DTO {@link CaixaDTO}.
 */
@Mapper(componentModel = "spring")
public interface CaixaMapper extends EntityMapper<CaixaDTO, Caixa> {
    @Mapping(target = "tipoCaixa", source = "tipoCaixa", qualifiedByName = "tipoCaixaDescricao")
    @Mapping(target = "tipoOrigem", source = "tipoOrigem", qualifiedByName = "tipoOrigemDescricao")
    CaixaDTO toDto(Caixa s);

    @Named("tipoCaixaDescricao")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    TipoCaixaDTO toDtoTipoCaixaDescricao(TipoCaixa tipoCaixa);

    @Named("tipoOrigemDescricao")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    TipoOrigemDTO toDtoTipoOrigemDescricao(TipoOrigem tipoOrigem);
}
