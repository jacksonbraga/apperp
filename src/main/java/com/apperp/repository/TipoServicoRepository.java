package com.apperp.repository;

import com.apperp.domain.TipoServico;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TipoServico entity.
 */
@Repository
public interface TipoServicoRepository extends JpaRepository<TipoServico, Long>, JpaSpecificationExecutor<TipoServico> {
    default Optional<TipoServico> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<TipoServico> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<TipoServico> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select tipoServico from TipoServico tipoServico left join fetch tipoServico.grupoServico",
        countQuery = "select count(tipoServico) from TipoServico tipoServico"
    )
    Page<TipoServico> findAllWithToOneRelationships(Pageable pageable);

    @Query("select tipoServico from TipoServico tipoServico left join fetch tipoServico.grupoServico")
    List<TipoServico> findAllWithToOneRelationships();

    @Query("select tipoServico from TipoServico tipoServico left join fetch tipoServico.grupoServico where tipoServico.id =:id")
    Optional<TipoServico> findOneWithToOneRelationships(@Param("id") Long id);
}
