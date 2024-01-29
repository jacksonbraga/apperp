package com.apperp.repository;

import com.apperp.domain.Caixa;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Caixa entity.
 */
@Repository
public interface CaixaRepository extends JpaRepository<Caixa, Long>, JpaSpecificationExecutor<Caixa> {
    default Optional<Caixa> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Caixa> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Caixa> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select caixa from Caixa caixa left join fetch caixa.tipoCaixa left join fetch caixa.tipoOrigem",
        countQuery = "select count(caixa) from Caixa caixa"
    )
    Page<Caixa> findAllWithToOneRelationships(Pageable pageable);

    @Query("select caixa from Caixa caixa left join fetch caixa.tipoCaixa left join fetch caixa.tipoOrigem")
    List<Caixa> findAllWithToOneRelationships();

    @Query("select caixa from Caixa caixa left join fetch caixa.tipoCaixa left join fetch caixa.tipoOrigem where caixa.id =:id")
    Optional<Caixa> findOneWithToOneRelationships(@Param("id") Long id);
}
