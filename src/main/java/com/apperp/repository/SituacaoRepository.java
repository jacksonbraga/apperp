package com.apperp.repository;

import com.apperp.domain.Situacao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Situacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SituacaoRepository extends JpaRepository<Situacao, Long>, JpaSpecificationExecutor<Situacao> {}
