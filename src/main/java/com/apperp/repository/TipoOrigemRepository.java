package com.apperp.repository;

import com.apperp.domain.TipoOrigem;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TipoOrigem entity.
 */
@Repository
public interface TipoOrigemRepository extends JpaRepository<TipoOrigem, Long> {
    default Optional<TipoOrigem> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<TipoOrigem> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<TipoOrigem> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select tipoOrigem from TipoOrigem tipoOrigem left join fetch tipoOrigem.grupoOrigem",
        countQuery = "select count(tipoOrigem) from TipoOrigem tipoOrigem"
    )
    Page<TipoOrigem> findAllWithToOneRelationships(Pageable pageable);

    @Query("select tipoOrigem from TipoOrigem tipoOrigem left join fetch tipoOrigem.grupoOrigem")
    List<TipoOrigem> findAllWithToOneRelationships();

    @Query("select tipoOrigem from TipoOrigem tipoOrigem left join fetch tipoOrigem.grupoOrigem where tipoOrigem.id =:id")
    Optional<TipoOrigem> findOneWithToOneRelationships(@Param("id") Long id);
}
