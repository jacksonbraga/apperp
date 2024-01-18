package com.apperp.repository;

import com.apperp.domain.TipoCaixa;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface TipoCaixaRepositoryWithBagRelationships {
    Optional<TipoCaixa> fetchBagRelationships(Optional<TipoCaixa> tipoCaixa);

    List<TipoCaixa> fetchBagRelationships(List<TipoCaixa> tipoCaixas);

    Page<TipoCaixa> fetchBagRelationships(Page<TipoCaixa> tipoCaixas);
}
