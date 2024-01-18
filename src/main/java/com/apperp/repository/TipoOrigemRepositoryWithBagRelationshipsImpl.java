package com.apperp.repository;

import com.apperp.domain.TipoOrigem;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class TipoOrigemRepositoryWithBagRelationshipsImpl implements TipoOrigemRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<TipoOrigem> fetchBagRelationships(Optional<TipoOrigem> tipoOrigem) {
        return tipoOrigem.map(this::fetchGrupoOrigems);
    }

    @Override
    public Page<TipoOrigem> fetchBagRelationships(Page<TipoOrigem> tipoOrigems) {
        return new PageImpl<>(fetchBagRelationships(tipoOrigems.getContent()), tipoOrigems.getPageable(), tipoOrigems.getTotalElements());
    }

    @Override
    public List<TipoOrigem> fetchBagRelationships(List<TipoOrigem> tipoOrigems) {
        return Optional.of(tipoOrigems).map(this::fetchGrupoOrigems).orElse(Collections.emptyList());
    }

    TipoOrigem fetchGrupoOrigems(TipoOrigem result) {
        return entityManager
            .createQuery(
                "select tipoOrigem from TipoOrigem tipoOrigem left join fetch tipoOrigem.grupoOrigems where tipoOrigem.id = :id",
                TipoOrigem.class
            )
            .setParameter("id", result.getId())
            .getSingleResult();
    }

    List<TipoOrigem> fetchGrupoOrigems(List<TipoOrigem> tipoOrigems) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, tipoOrigems.size()).forEach(index -> order.put(tipoOrigems.get(index).getId(), index));
        List<TipoOrigem> result = entityManager
            .createQuery(
                "select tipoOrigem from TipoOrigem tipoOrigem left join fetch tipoOrigem.grupoOrigems where tipoOrigem in :tipoOrigems",
                TipoOrigem.class
            )
            .setParameter("tipoOrigems", tipoOrigems)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
