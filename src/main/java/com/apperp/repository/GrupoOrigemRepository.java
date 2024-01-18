package com.apperp.repository;

import com.apperp.domain.GrupoOrigem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the GrupoOrigem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GrupoOrigemRepository extends JpaRepository<GrupoOrigem, Long> {}
