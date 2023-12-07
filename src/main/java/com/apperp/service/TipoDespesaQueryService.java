package com.apperp.service;

import com.apperp.domain.*; // for static metamodels
import com.apperp.domain.TipoDespesa;
import com.apperp.repository.TipoDespesaRepository;
import com.apperp.service.criteria.TipoDespesaCriteria;
import com.apperp.service.dto.TipoDespesaDTO;
import com.apperp.service.mapper.TipoDespesaMapper;
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
 * Service for executing complex queries for {@link TipoDespesa} entities in the database.
 * The main input is a {@link TipoDespesaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TipoDespesaDTO} or a {@link Page} of {@link TipoDespesaDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TipoDespesaQueryService extends QueryService<TipoDespesa> {

    private final Logger log = LoggerFactory.getLogger(TipoDespesaQueryService.class);

    private final TipoDespesaRepository tipoDespesaRepository;

    private final TipoDespesaMapper tipoDespesaMapper;

    public TipoDespesaQueryService(TipoDespesaRepository tipoDespesaRepository, TipoDespesaMapper tipoDespesaMapper) {
        this.tipoDespesaRepository = tipoDespesaRepository;
        this.tipoDespesaMapper = tipoDespesaMapper;
    }

    /**
     * Return a {@link List} of {@link TipoDespesaDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TipoDespesaDTO> findByCriteria(TipoDespesaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<TipoDespesa> specification = createSpecification(criteria);
        return tipoDespesaMapper.toDto(tipoDespesaRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link TipoDespesaDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TipoDespesaDTO> findByCriteria(TipoDespesaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<TipoDespesa> specification = createSpecification(criteria);
        return tipoDespesaRepository.findAll(specification, page).map(tipoDespesaMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TipoDespesaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<TipoDespesa> specification = createSpecification(criteria);
        return tipoDespesaRepository.count(specification);
    }

    /**
     * Function to convert {@link TipoDespesaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<TipoDespesa> createSpecification(TipoDespesaCriteria criteria) {
        Specification<TipoDespesa> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), TipoDespesa_.id));
            }
            if (criteria.getDescricao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescricao(), TipoDespesa_.descricao));
            }
            if (criteria.getGrupoDespesaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getGrupoDespesaId(),
                            root -> root.join(TipoDespesa_.grupoDespesa, JoinType.LEFT).get(GrupoDespesa_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
