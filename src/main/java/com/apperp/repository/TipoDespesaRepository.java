package com.apperp.repository;

import com.apperp.domain.TipoDespesa;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TipoDespesa entity.
 */
@Repository
public interface TipoDespesaRepository extends JpaRepository<TipoDespesa, Long>, JpaSpecificationExecutor<TipoDespesa> {
    default Optional<TipoDespesa> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<TipoDespesa> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<TipoDespesa> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select tipoDespesa from TipoDespesa tipoDespesa left join fetch tipoDespesa.grupoDespesa",
        countQuery = "select count(tipoDespesa) from TipoDespesa tipoDespesa"
    )
    Page<TipoDespesa> findAllWithToOneRelationships(Pageable pageable);

    @Query("select tipoDespesa from TipoDespesa tipoDespesa left join fetch tipoDespesa.grupoDespesa")
    List<TipoDespesa> findAllWithToOneRelationships();

    @Query("select tipoDespesa from TipoDespesa tipoDespesa left join fetch tipoDespesa.grupoDespesa where tipoDespesa.id =:id")
    Optional<TipoDespesa> findOneWithToOneRelationships(@Param("id") Long id);
}
