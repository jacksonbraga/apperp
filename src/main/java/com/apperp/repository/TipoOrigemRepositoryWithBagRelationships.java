package com.apperp.repository;

import com.apperp.domain.TipoOrigem;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface TipoOrigemRepositoryWithBagRelationships {
    Optional<TipoOrigem> fetchBagRelationships(Optional<TipoOrigem> tipoOrigem);

    List<TipoOrigem> fetchBagRelationships(List<TipoOrigem> tipoOrigems);

    Page<TipoOrigem> fetchBagRelationships(Page<TipoOrigem> tipoOrigems);
}
