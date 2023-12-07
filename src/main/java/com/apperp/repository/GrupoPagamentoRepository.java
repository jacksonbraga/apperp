package com.apperp.repository;

import com.apperp.domain.GrupoPagamento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the GrupoPagamento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GrupoPagamentoRepository extends JpaRepository<GrupoPagamento, Long>, JpaSpecificationExecutor<GrupoPagamento> {}
