package com.apperp.service;

import com.apperp.domain.*; // for static metamodels
import com.apperp.domain.GrupoPagamento;
import com.apperp.repository.GrupoPagamentoRepository;
import com.apperp.service.criteria.GrupoPagamentoCriteria;
import com.apperp.service.dto.GrupoPagamentoDTO;
import com.apperp.service.mapper.GrupoPagamentoMapper;
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
 * Service for executing complex queries for {@link GrupoPagamento} entities in the database.
 * The main input is a {@link GrupoPagamentoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link GrupoPagamentoDTO} or a {@link Page} of {@link GrupoPagamentoDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class GrupoPagamentoQueryService extends QueryService<GrupoPagamento> {

    private final Logger log = LoggerFactory.getLogger(GrupoPagamentoQueryService.class);

    private final GrupoPagamentoRepository grupoPagamentoRepository;

    private final GrupoPagamentoMapper grupoPagamentoMapper;

    public GrupoPagamentoQueryService(GrupoPagamentoRepository grupoPagamentoRepository, GrupoPagamentoMapper grupoPagamentoMapper) {
        this.grupoPagamentoRepository = grupoPagamentoRepository;
        this.grupoPagamentoMapper = grupoPagamentoMapper;
    }

    /**
     * Return a {@link List} of {@link GrupoPagamentoDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<GrupoPagamentoDTO> findByCriteria(GrupoPagamentoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<GrupoPagamento> specification = createSpecification(criteria);
        return grupoPagamentoMapper.toDto(grupoPagamentoRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link GrupoPagamentoDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<GrupoPagamentoDTO> findByCriteria(GrupoPagamentoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<GrupoPagamento> specification = createSpecification(criteria);
        return grupoPagamentoRepository.findAll(specification, page).map(grupoPagamentoMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(GrupoPagamentoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<GrupoPagamento> specification = createSpecification(criteria);
        return grupoPagamentoRepository.count(specification);
    }

    /**
     * Function to convert {@link GrupoPagamentoCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<GrupoPagamento> createSpecification(GrupoPagamentoCriteria criteria) {
        Specification<GrupoPagamento> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), GrupoPagamento_.id));
            }
            if (criteria.getDescricao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescricao(), GrupoPagamento_.descricao));
            }
        }
        return specification;
    }
}
