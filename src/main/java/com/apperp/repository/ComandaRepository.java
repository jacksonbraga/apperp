package com.apperp.repository;

import com.apperp.domain.Comanda;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Comanda entity.
 */
@Repository
public interface ComandaRepository extends JpaRepository<Comanda, Long>, JpaSpecificationExecutor<Comanda> {
    default Optional<Comanda> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Comanda> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Comanda> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select comanda from Comanda comanda left join fetch comanda.situacao left join fetch comanda.controleComanda",
        countQuery = "select count(comanda) from Comanda comanda"
    )
    Page<Comanda> findAllWithToOneRelationships(Pageable pageable);

    @Query("select comanda from Comanda comanda left join fetch comanda.situacao left join fetch comanda.controleComanda")
    List<Comanda> findAllWithToOneRelationships();

    @Query(
        "select comanda from Comanda comanda left join fetch comanda.situacao left join fetch comanda.controleComanda where comanda.id =:id"
    )
    Optional<Comanda> findOneWithToOneRelationships(@Param("id") Long id);

    List<Comanda> findByNumeroAndControleComandaId(Long i, Long id);

    List<Comanda> findAllByControleId(Long id);

    List<Comanda> findAllByControleComandaId(Long id);

    void deleteByControleComandaId(Long id);
}
