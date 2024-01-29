package com.apperp.repository;

import com.apperp.domain.TipoCaixa;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TipoCaixa entity.
 */
@Repository
public interface TipoCaixaRepository extends JpaRepository<TipoCaixa, Long> {
    default Optional<TipoCaixa> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<TipoCaixa> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<TipoCaixa> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select tipoCaixa from TipoCaixa tipoCaixa left join fetch tipoCaixa.grupoPagamento",
        countQuery = "select count(tipoCaixa) from TipoCaixa tipoCaixa"
    )
    Page<TipoCaixa> findAllWithToOneRelationships(Pageable pageable);

    @Query("select tipoCaixa from TipoCaixa tipoCaixa left join fetch tipoCaixa.grupoPagamento")
    List<TipoCaixa> findAllWithToOneRelationships();

    @Query("select tipoCaixa from TipoCaixa tipoCaixa left join fetch tipoCaixa.grupoPagamento where tipoCaixa.id =:id")
    Optional<TipoCaixa> findOneWithToOneRelationships(@Param("id") Long id);
}
