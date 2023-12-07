package com.apperp.repository;

import com.apperp.domain.GrupoDespesa;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the GrupoDespesa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GrupoDespesaRepository extends JpaRepository<GrupoDespesa, Long>, JpaSpecificationExecutor<GrupoDespesa> {}
