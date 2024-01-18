package com.apperp.repository;

import com.apperp.domain.GrupoCaixa;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the GrupoCaixa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GrupoCaixaRepository extends JpaRepository<GrupoCaixa, Long> {}
