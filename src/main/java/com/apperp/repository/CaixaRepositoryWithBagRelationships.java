package com.apperp.repository;

import com.apperp.domain.Caixa;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface CaixaRepositoryWithBagRelationships {
    Optional<Caixa> fetchBagRelationships(Optional<Caixa> caixa);

    List<Caixa> fetchBagRelationships(List<Caixa> caixas);

    Page<Caixa> fetchBagRelationships(Page<Caixa> caixas);
}
