package com.apperp.service;

import com.apperp.domain.*; // for static metamodels
import com.apperp.domain.GrupoDespesa;
import com.apperp.repository.GrupoDespesaRepository;
import com.apperp.service.criteria.GrupoDespesaCriteria;
import com.apperp.service.dto.GrupoDespesaDTO;
import com.apperp.service.mapper.GrupoDespesaMapper;
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
 * Service for executing complex queries for {@link GrupoDespesa} entities in the database.
 * The main input is a {@link GrupoDespesaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link GrupoDespesaDTO} or a {@link Page} of {@link GrupoDespesaDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class GrupoDespesaQueryService extends QueryService<GrupoDespesa> {

    private final Logger log = LoggerFactory.getLogger(GrupoDespesaQueryService.class);

    private final GrupoDespesaRepository grupoDespesaRepository;

    private final GrupoDespesaMapper grupoDespesaMapper;

    public GrupoDespesaQueryService(GrupoDespesaRepository grupoDespesaRepository, GrupoDespesaMapper grupoDespesaMapper) {
        this.grupoDespesaRepository = grupoDespesaRepository;
        this.grupoDespesaMapper = grupoDespesaMapper;
    }

    /**
     * Return a {@link List} of {@link GrupoDespesaDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<GrupoDespesaDTO> findByCriteria(GrupoDespesaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<GrupoDespesa> specification = createSpecification(criteria);
        return grupoDespesaMapper.toDto(grupoDespesaRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link GrupoDespesaDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<GrupoDespesaDTO> findByCriteria(GrupoDespesaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<GrupoDespesa> specification = createSpecification(criteria);
        return grupoDespesaRepository.findAll(specification, page).map(grupoDespesaMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(GrupoDespesaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<GrupoDespesa> specification = createSpecification(criteria);
        return grupoDespesaRepository.count(specification);
    }

    /**
     * Function to convert {@link GrupoDespesaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<GrupoDespesa> createSpecification(GrupoDespesaCriteria criteria) {
        Specification<GrupoDespesa> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), GrupoDespesa_.id));
            }
            if (criteria.getDescricao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescricao(), GrupoDespesa_.descricao));
            }
        }
        return specification;
    }
}
