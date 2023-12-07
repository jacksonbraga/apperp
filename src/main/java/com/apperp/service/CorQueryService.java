package com.apperp.service;

import com.apperp.domain.*; // for static metamodels
import com.apperp.domain.Cor;
import com.apperp.repository.CorRepository;
import com.apperp.service.criteria.CorCriteria;
import com.apperp.service.dto.CorDTO;
import com.apperp.service.mapper.CorMapper;
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
 * Service for executing complex queries for {@link Cor} entities in the database.
 * The main input is a {@link CorCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link CorDTO} or a {@link Page} of {@link CorDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class CorQueryService extends QueryService<Cor> {

    private final Logger log = LoggerFactory.getLogger(CorQueryService.class);

    private final CorRepository corRepository;

    private final CorMapper corMapper;

    public CorQueryService(CorRepository corRepository, CorMapper corMapper) {
        this.corRepository = corRepository;
        this.corMapper = corMapper;
    }

    /**
     * Return a {@link List} of {@link CorDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<CorDTO> findByCriteria(CorCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Cor> specification = createSpecification(criteria);
        return corMapper.toDto(corRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link CorDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<CorDTO> findByCriteria(CorCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Cor> specification = createSpecification(criteria);
        return corRepository.findAll(specification, page).map(corMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(CorCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Cor> specification = createSpecification(criteria);
        return corRepository.count(specification);
    }

    /**
     * Function to convert {@link CorCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Cor> createSpecification(CorCriteria criteria) {
        Specification<Cor> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Cor_.id));
            }
            if (criteria.getDescricao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescricao(), Cor_.descricao));
            }
        }
        return specification;
    }
}
