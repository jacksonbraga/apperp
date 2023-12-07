package com.apperp.repository;

import com.apperp.domain.ItemComanda;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ItemComanda entity.
 */
@Repository
public interface ItemComandaRepository extends JpaRepository<ItemComanda, Long>, JpaSpecificationExecutor<ItemComanda> {
    default Optional<ItemComanda> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<ItemComanda> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<ItemComanda> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select itemComanda from ItemComanda itemComanda left join fetch itemComanda.tipoPagamento left join fetch itemComanda.tipoServico left join fetch itemComanda.comanda",
        countQuery = "select count(itemComanda) from ItemComanda itemComanda"
    )
    Page<ItemComanda> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select itemComanda from ItemComanda itemComanda left join fetch itemComanda.tipoPagamento left join fetch itemComanda.tipoServico left join fetch itemComanda.comanda"
    )
    List<ItemComanda> findAllWithToOneRelationships();

    @Query(
        "select itemComanda from ItemComanda itemComanda left join fetch itemComanda.tipoPagamento left join fetch itemComanda.tipoServico left join fetch itemComanda.comanda where itemComanda.id =:id"
    )
    Optional<ItemComanda> findOneWithToOneRelationships(@Param("id") Long id);

    List<ItemComanda> findByComandaIdAndTipoServicoId(Long id, Long id2);

    List<ItemComanda> findByComandaIdAndTipoPagamentoId(Long id, Long id2);

    List<ItemComanda> findByComandaIdAndTipoServicoIdAndTipo(Long id, Long id2, String string);

    List<ItemComanda> findByComandaIdAndTipoPagamentoIdAndTipo(Long id, Long id2, String string);
}
