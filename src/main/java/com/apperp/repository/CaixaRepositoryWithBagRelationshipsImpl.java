package com.apperp.repository;

import com.apperp.domain.Caixa;
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
public class CaixaRepositoryWithBagRelationshipsImpl implements CaixaRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Caixa> fetchBagRelationships(Optional<Caixa> caixa) {
        return caixa.map(this::fetchTipoCaixas).map(this::fetchTipoOrigems);
    }

    @Override
    public Page<Caixa> fetchBagRelationships(Page<Caixa> caixas) {
        return new PageImpl<>(fetchBagRelationships(caixas.getContent()), caixas.getPageable(), caixas.getTotalElements());
    }

    @Override
    public List<Caixa> fetchBagRelationships(List<Caixa> caixas) {
        return Optional.of(caixas).map(this::fetchTipoCaixas).map(this::fetchTipoOrigems).orElse(Collections.emptyList());
    }

    Caixa fetchTipoCaixas(Caixa result) {
        return entityManager
            .createQuery("select caixa from Caixa caixa left join fetch caixa.tipoCaixas where caixa.id = :id", Caixa.class)
            .setParameter("id", result.getId())
            .getSingleResult();
    }

    List<Caixa> fetchTipoCaixas(List<Caixa> caixas) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, caixas.size()).forEach(index -> order.put(caixas.get(index).getId(), index));
        List<Caixa> result = entityManager
            .createQuery("select caixa from Caixa caixa left join fetch caixa.tipoCaixas where caixa in :caixas", Caixa.class)
            .setParameter("caixas", caixas)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }

    Caixa fetchTipoOrigems(Caixa result) {
        return entityManager
            .createQuery("select caixa from Caixa caixa left join fetch caixa.tipoOrigems where caixa.id = :id", Caixa.class)
            .setParameter("id", result.getId())
            .getSingleResult();
    }

    List<Caixa> fetchTipoOrigems(List<Caixa> caixas) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, caixas.size()).forEach(index -> order.put(caixas.get(index).getId(), index));
        List<Caixa> result = entityManager
            .createQuery("select caixa from Caixa caixa left join fetch caixa.tipoOrigems where caixa in :caixas", Caixa.class)
            .setParameter("caixas", caixas)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
