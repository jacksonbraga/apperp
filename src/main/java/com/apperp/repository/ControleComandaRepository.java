package com.apperp.repository;

import com.apperp.domain.ControleComanda;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ControleComanda entity.
 */
@Repository
public interface ControleComandaRepository extends JpaRepository<ControleComanda, Long>, JpaSpecificationExecutor<ControleComanda> {
    default Optional<ControleComanda> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<ControleComanda> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<ControleComanda> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select controleComanda from ControleComanda controleComanda left join fetch controleComanda.cor",
        countQuery = "select count(controleComanda) from ControleComanda controleComanda"
    )
    Page<ControleComanda> findAllWithToOneRelationships(Pageable pageable);

    @Query("select controleComanda from ControleComanda controleComanda left join fetch controleComanda.cor")
    List<ControleComanda> findAllWithToOneRelationships();

    @Query("select controleComanda from ControleComanda controleComanda left join fetch controleComanda.cor where controleComanda.id =:id")
    Optional<ControleComanda> findOneWithToOneRelationships(@Param("id") Long id);
}
