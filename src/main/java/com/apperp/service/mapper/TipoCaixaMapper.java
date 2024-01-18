package com.apperp.service.mapper;

import com.apperp.domain.GrupoCaixa;
import com.apperp.domain.TipoCaixa;
import com.apperp.service.dto.GrupoCaixaDTO;
import com.apperp.service.dto.TipoCaixaDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TipoCaixa} and its DTO {@link TipoCaixaDTO}.
 */
@Mapper(componentModel = "spring")
public interface TipoCaixaMapper extends EntityMapper<TipoCaixaDTO, TipoCaixa> {
    @Mapping(target = "grupoCaixas", source = "grupoCaixas", qualifiedByName = "grupoCaixaDescricaoSet")
    TipoCaixaDTO toDto(TipoCaixa s);

    @Mapping(target = "removeGrupoCaixa", ignore = true)
    TipoCaixa toEntity(TipoCaixaDTO tipoCaixaDTO);

    @Named("grupoCaixaDescricao")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    GrupoCaixaDTO toDtoGrupoCaixaDescricao(GrupoCaixa grupoCaixa);

    @Named("grupoCaixaDescricaoSet")
    default Set<GrupoCaixaDTO> toDtoGrupoCaixaDescricaoSet(Set<GrupoCaixa> grupoCaixa) {
        return grupoCaixa.stream().map(this::toDtoGrupoCaixaDescricao).collect(Collectors.toSet());
    }
}
