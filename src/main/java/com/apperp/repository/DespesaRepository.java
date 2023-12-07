package com.apperp.repository;

import com.apperp.domain.Despesa;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Despesa entity.
 */
@Repository
public interface DespesaRepository extends JpaRepository<Despesa, Long>, JpaSpecificationExecutor<Despesa> {
    default Optional<Despesa> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Despesa> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Despesa> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select despesa from Despesa despesa left join fetch despesa.tipoDespesa",
        countQuery = "select count(despesa) from Despesa despesa"
    )
    Page<Despesa> findAllWithToOneRelationships(Pageable pageable);

    @Query("select despesa from Despesa despesa left join fetch despesa.tipoDespesa")
    List<Despesa> findAllWithToOneRelationships();

    @Query("select despesa from Despesa despesa left join fetch despesa.tipoDespesa where despesa.id =:id")
    Optional<Despesa> findOneWithToOneRelationships(@Param("id") Long id);
}
