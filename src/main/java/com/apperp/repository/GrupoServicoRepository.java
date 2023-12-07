package com.apperp.repository;

import com.apperp.domain.GrupoServico;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the GrupoServico entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GrupoServicoRepository extends JpaRepository<GrupoServico, Long>, JpaSpecificationExecutor<GrupoServico> {}
