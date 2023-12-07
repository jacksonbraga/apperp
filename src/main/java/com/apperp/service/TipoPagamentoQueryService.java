package com.apperp.service;

import com.apperp.domain.*; // for static metamodels
import com.apperp.domain.TipoPagamento;
import com.apperp.repository.TipoPagamentoRepository;
import com.apperp.service.criteria.TipoPagamentoCriteria;
import com.apperp.service.dto.TipoPagamentoDTO;
import com.apperp.service.mapper.TipoPagamentoMapper;
import jakarta.persistence.criteria.JoinType;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link TipoPagamento} entities in the database.
 * The main input is a {@link TipoPagamentoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TipoPagamentoDTO} or a {@link Page} of {@link TipoPagamentoDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TipoPagamentoQueryService extends QueryService<TipoPagamento> {

    private final Logger log = LoggerFactory.getLogger(TipoPagamentoQueryService.class);

    private final TipoPagamentoRepository tipoPagamentoRepository;

    private final TipoPagamentoMapper tipoPagamentoMapper;

    public TipoPagamentoQueryService(TipoPagamentoRepository tipoPagamentoRepository, TipoPagamentoMapper tipoPagamentoMapper) {
        this.tipoPagamentoRepository = tipoPagamentoRepository;
        this.tipoPagamentoMapper = tipoPagamentoMapper;
    }

    /**
     * Return a {@link List} of {@link TipoPagamentoDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TipoPagamentoDTO> findByCriteria(TipoPagamentoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<TipoPagamento> specification = createSpecification(criteria);
        return tipoPagamentoMapper.toDto(tipoPagamentoRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link TipoPagamentoDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TipoPagamentoDTO> findByCriteria(TipoPagamentoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<TipoPagamento> specification = createSpecification(criteria);
        return tipoPagamentoRepository.findAll(specification, page).map(tipoPagamentoMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TipoPagamentoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<TipoPagamento> specification = createSpecification(criteria);
        return tipoPagamentoRepository.count(specification);
    }

    /**
     * Function to convert {@link TipoPagamentoCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<TipoPagamento> createSpecification(TipoPagamentoCriteria criteria) {
        Specification<TipoPagamento> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), TipoPagamento_.id));
            }
            if (criteria.getDescricao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescricao(), TipoPagamento_.descricao));
            }
            if (criteria.getGrupoPagamentoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getGrupoPagamentoId(),
                            root -> root.join(TipoPagamento_.grupoPagamento, JoinType.LEFT).get(GrupoPagamento_.id)
                        )
                    );
            }
            if (criteria.getTipoPagamentoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getTipoPagamentoId(),
                            root -> root.join(TipoPagamento_.tipoPagamentos, JoinType.LEFT).get(ItemComanda_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
