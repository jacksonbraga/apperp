package com.apperp.service;

import com.apperp.domain.*; // for static metamodels
import com.apperp.domain.Despesa;
import com.apperp.repository.DespesaRepository;
import com.apperp.service.criteria.DespesaCriteria;
import com.apperp.service.dto.DespesaDTO;
import com.apperp.service.mapper.DespesaMapper;
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
 * Service for executing complex queries for {@link Despesa} entities in the database.
 * The main input is a {@link DespesaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link DespesaDTO} or a {@link Page} of {@link DespesaDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class DespesaQueryService extends QueryService<Despesa> {

    private final Logger log = LoggerFactory.getLogger(DespesaQueryService.class);

    private final DespesaRepository despesaRepository;

    private final DespesaMapper despesaMapper;

    public DespesaQueryService(DespesaRepository despesaRepository, DespesaMapper despesaMapper) {
        this.despesaRepository = despesaRepository;
        this.despesaMapper = despesaMapper;
    }

    /**
     * Return a {@link List} of {@link DespesaDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<DespesaDTO> findByCriteria(DespesaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Despesa> specification = createSpecification(criteria);
        return despesaMapper.toDto(despesaRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link DespesaDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<DespesaDTO> findByCriteria(DespesaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Despesa> specification = createSpecification(criteria);
        return despesaRepository.findAll(specification, page).map(despesaMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(DespesaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Despesa> specification = createSpecification(criteria);
        return despesaRepository.count(specification);
    }

    /**
     * Function to convert {@link DespesaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Despesa> createSpecification(DespesaCriteria criteria) {
        Specification<Despesa> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Despesa_.id));
            }
            if (criteria.getDescricao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescricao(), Despesa_.descricao));
            }
            if (criteria.getObservacao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getObservacao(), Despesa_.observacao));
            }
            if (criteria.getParcela() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getParcela(), Despesa_.parcela));
            }
            if (criteria.getTotalParcela() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getTotalParcela(), Despesa_.totalParcela));
            }
            if (criteria.getValor() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getValor(), Despesa_.valor));
            }
            if (criteria.getData() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getData(), Despesa_.data));
            }
            if (criteria.getDataVencimento() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDataVencimento(), Despesa_.dataVencimento));
            }
            if (criteria.getTipoDespesaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getTipoDespesaId(),
                            root -> root.join(Despesa_.tipoDespesa, JoinType.LEFT).get(TipoDespesa_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
