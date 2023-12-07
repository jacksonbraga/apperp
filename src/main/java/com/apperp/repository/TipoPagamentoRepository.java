package com.apperp.repository;

import com.apperp.domain.TipoPagamento;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TipoPagamento entity.
 */
@Repository
public interface TipoPagamentoRepository extends JpaRepository<TipoPagamento, Long>, JpaSpecificationExecutor<TipoPagamento> {
    default Optional<TipoPagamento> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<TipoPagamento> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<TipoPagamento> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select tipoPagamento from TipoPagamento tipoPagamento left join fetch tipoPagamento.grupoPagamento",
        countQuery = "select count(tipoPagamento) from TipoPagamento tipoPagamento"
    )
    Page<TipoPagamento> findAllWithToOneRelationships(Pageable pageable);

    @Query("select tipoPagamento from TipoPagamento tipoPagamento left join fetch tipoPagamento.grupoPagamento")
    List<TipoPagamento> findAllWithToOneRelationships();

    @Query("select tipoPagamento from TipoPagamento tipoPagamento left join fetch tipoPagamento.grupoPagamento where tipoPagamento.id =:id")
    Optional<TipoPagamento> findOneWithToOneRelationships(@Param("id") Long id);
}
