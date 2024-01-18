package com.apperp.repository;

import com.apperp.domain.TipoCaixa;
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
public class TipoCaixaRepositoryWithBagRelationshipsImpl implements TipoCaixaRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<TipoCaixa> fetchBagRelationships(Optional<TipoCaixa> tipoCaixa) {
        return tipoCaixa.map(this::fetchGrupoCaixas);
    }

    @Override
    public Page<TipoCaixa> fetchBagRelationships(Page<TipoCaixa> tipoCaixas) {
        return new PageImpl<>(fetchBagRelationships(tipoCaixas.getContent()), tipoCaixas.getPageable(), tipoCaixas.getTotalElements());
    }

    @Override
    public List<TipoCaixa> fetchBagRelationships(List<TipoCaixa> tipoCaixas) {
        return Optional.of(tipoCaixas).map(this::fetchGrupoCaixas).orElse(Collections.emptyList());
    }

    TipoCaixa fetchGrupoCaixas(TipoCaixa result) {
        return entityManager
            .createQuery(
                "select tipoCaixa from TipoCaixa tipoCaixa left join fetch tipoCaixa.grupoCaixas where tipoCaixa.id = :id",
                TipoCaixa.class
            )
            .setParameter("id", result.getId())
            .getSingleResult();
    }

    List<TipoCaixa> fetchGrupoCaixas(List<TipoCaixa> tipoCaixas) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, tipoCaixas.size()).forEach(index -> order.put(tipoCaixas.get(index).getId(), index));
        List<TipoCaixa> result = entityManager
            .createQuery(
                "select tipoCaixa from TipoCaixa tipoCaixa left join fetch tipoCaixa.grupoCaixas where tipoCaixa in :tipoCaixas",
                TipoCaixa.class
            )
            .setParameter("tipoCaixas", tipoCaixas)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
