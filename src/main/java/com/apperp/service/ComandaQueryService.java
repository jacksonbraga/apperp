package com.apperp.service;

import com.apperp.domain.*; // for static metamodels
import com.apperp.domain.Comanda;
import com.apperp.repository.ComandaRepository;
import com.apperp.service.criteria.ComandaCriteria;
import com.apperp.service.dto.ComandaDTO;
import com.apperp.service.mapper.ComandaMapper;
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
 * Service for executing complex queries for {@link Comanda} entities in the database.
 * The main input is a {@link ComandaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link ComandaDTO} or a {@link Page} of {@link ComandaDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ComandaQueryService extends QueryService<Comanda> {

    private final Logger log = LoggerFactory.getLogger(ComandaQueryService.class);

    private final ComandaRepository comandaRepository;

    private final ComandaMapper comandaMapper;

    public ComandaQueryService(ComandaRepository comandaRepository, ComandaMapper comandaMapper) {
        this.comandaRepository = comandaRepository;
        this.comandaMapper = comandaMapper;
    }

    /**
     * Return a {@link List} of {@link ComandaDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<ComandaDTO> findByCriteria(ComandaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Comanda> specification = createSpecification(criteria);
        return comandaMapper.toDto(comandaRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link ComandaDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<ComandaDTO> findByCriteria(ComandaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Comanda> specification = createSpecification(criteria);
        return comandaRepository.findAll(specification, page).map(comandaMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ComandaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Comanda> specification = createSpecification(criteria);
        return comandaRepository.count(specification);
    }

    /**
     * Function to convert {@link ComandaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Comanda> createSpecification(ComandaCriteria criteria) {
        Specification<Comanda> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Comanda_.id));
            }
            if (criteria.getDescricao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescricao(), Comanda_.descricao));
            }
            if (criteria.getObservacao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getObservacao(), Comanda_.observacao));
            }
            if (criteria.getData() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getData(), Comanda_.data));
            }
            if (criteria.getNumero() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getNumero(), Comanda_.numero));
            }
            if (criteria.getItensId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getItensId(), root -> root.join(Comanda_.itens, JoinType.LEFT).get(ItemComanda_.id))
                    );
            }
            if (criteria.getSituacaoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getSituacaoId(), root -> root.join(Comanda_.situacao, JoinType.LEFT).get(Situacao_.id))
                    );
            }
            if (criteria.getControleId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getControleId(),
                            root -> root.join(Comanda_.controle, JoinType.LEFT).get(ControleComanda_.id)
                        )
                    );
            }
            if (criteria.getControleComandaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getControleComandaId(),
                            root -> root.join(Comanda_.controleComanda, JoinType.LEFT).get(ControleComanda_.id)
                        )
                    );
            }
            if (criteria.getListaItensId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getListaItensId(),
                            root -> root.join(Comanda_.listaItens, JoinType.LEFT).get(ItemComanda_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
