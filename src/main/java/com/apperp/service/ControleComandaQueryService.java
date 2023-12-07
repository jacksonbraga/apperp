package com.apperp.service;

import com.apperp.domain.*; // for static metamodels
import com.apperp.domain.ControleComanda;
import com.apperp.repository.ControleComandaRepository;
import com.apperp.service.criteria.ControleComandaCriteria;
import com.apperp.service.dto.ControleComandaDTO;
import com.apperp.service.mapper.ControleComandaMapper;
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
 * Service for executing complex queries for {@link ControleComanda} entities in the database.
 * The main input is a {@link ControleComandaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link ControleComandaDTO} or a {@link Page} of {@link ControleComandaDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ControleComandaQueryService extends QueryService<ControleComanda> {

    private final Logger log = LoggerFactory.getLogger(ControleComandaQueryService.class);

    private final ControleComandaRepository controleComandaRepository;

    private final ControleComandaMapper controleComandaMapper;

    public ControleComandaQueryService(ControleComandaRepository controleComandaRepository, ControleComandaMapper controleComandaMapper) {
        this.controleComandaRepository = controleComandaRepository;
        this.controleComandaMapper = controleComandaMapper;
    }

    /**
     * Return a {@link List} of {@link ControleComandaDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<ControleComandaDTO> findByCriteria(ControleComandaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<ControleComanda> specification = createSpecification(criteria);
        return controleComandaMapper.toDto(controleComandaRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link ControleComandaDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<ControleComandaDTO> findByCriteria(ControleComandaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<ControleComanda> specification = createSpecification(criteria);
        return controleComandaRepository.findAll(specification, page).map(controleComandaMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ControleComandaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<ControleComanda> specification = createSpecification(criteria);
        return controleComandaRepository.count(specification);
    }

    /**
     * Function to convert {@link ControleComandaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<ControleComanda> createSpecification(ControleComandaCriteria criteria) {
        Specification<ControleComanda> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), ControleComanda_.id));
            }
            if (criteria.getDescricao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescricao(), ControleComanda_.descricao));
            }
            if (criteria.getFaixaInicio() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFaixaInicio(), ControleComanda_.faixaInicio));
            }
            if (criteria.getFaixaFim() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFaixaFim(), ControleComanda_.faixaFim));
            }
            if (criteria.getData() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getData(), ControleComanda_.data));
            }
            if (criteria.getComandasId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getComandasId(),
                            root -> root.join(ControleComanda_.comandas, JoinType.LEFT).get(Comanda_.id)
                        )
                    );
            }
            if (criteria.getCorId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getCorId(), root -> root.join(ControleComanda_.cor, JoinType.LEFT).get(Cor_.id))
                    );
            }
            if (criteria.getListaComandasId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getListaComandasId(),
                            root -> root.join(ControleComanda_.listaComandas, JoinType.LEFT).get(Comanda_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
