package com.apperp.service.mapper;

import com.apperp.domain.ControleComanda;
import com.apperp.domain.Cor;
import com.apperp.service.dto.ControleComandaDTO;
import com.apperp.service.dto.CorDTO;
import org.mapstruct.*;
import org.springframework.data.domain.jaxb.SpringDataJaxb.OrderDto;

/**
 * Mapper for the entity {@link ControleComanda} and its DTO {@link ControleComandaDTO}.
 */
@Mapper(componentModel = "spring")
public interface ControleComandaMapper extends EntityMapper<ControleComandaDTO, ControleComanda> {
    @Mapping(target = "cor", source = "cor", qualifiedByName = "corDescricao")
    ControleComandaDTO toDto(ControleComanda s);

    @Named("corDescricao")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "descricao", source = "descricao")
    @Mapping(target = "valor", source = "valor")
    CorDTO toDtoCorDescricao(Cor cor);

    @AfterMapping // or @BeforeMapping
    default void calculateQtde(ControleComanda controleComanda, @MappingTarget ControleComandaDTO dto) {
        dto.setQtdeComandas(Long.valueOf(controleComanda.getComandas().size()));
    }
}
