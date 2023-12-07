package com.apperp.service;

import com.apperp.domain.*; // for static metamodels
import com.apperp.domain.TipoServico;
import com.apperp.repository.TipoServicoRepository;
import com.apperp.service.criteria.TipoServicoCriteria;
import com.apperp.service.dto.TipoServicoDTO;
import com.apperp.service.mapper.TipoServicoMapper;
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
 * Service for executing complex queries for {@link TipoServico} entities in the database.
 * The main input is a {@link TipoServicoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TipoServicoDTO} or a {@link Page} of {@link TipoServicoDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TipoServicoQueryService extends QueryService<TipoServico> {

    private final Logger log = LoggerFactory.getLogger(TipoServicoQueryService.class);

    private final TipoServicoRepository tipoServicoRepository;

    private final TipoServicoMapper tipoServicoMapper;

    public TipoServicoQueryService(TipoServicoRepository tipoServicoRepository, TipoServicoMapper tipoServicoMapper) {
        this.tipoServicoRepository = tipoServicoRepository;
        this.tipoServicoMapper = tipoServicoMapper;
    }

    /**
     * Return a {@link List} of {@link TipoServicoDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TipoServicoDTO> findByCriteria(TipoServicoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<TipoServico> specification = createSpecification(criteria);
        return tipoServicoMapper.toDto(tipoServicoRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link TipoServicoDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TipoServicoDTO> findByCriteria(TipoServicoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<TipoServico> specification = createSpecification(criteria);
        return tipoServicoRepository.findAll(specification, page).map(tipoServicoMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TipoServicoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<TipoServico> specification = createSpecification(criteria);
        return tipoServicoRepository.count(specification);
    }

    /**
     * Function to convert {@link TipoServicoCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<TipoServico> createSpecification(TipoServicoCriteria criteria) {
        Specification<TipoServico> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), TipoServico_.id));
            }
            if (criteria.getDescricao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescricao(), TipoServico_.descricao));
            }
            if (criteria.getGrupoServicoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getGrupoServicoId(),
                            root -> root.join(TipoServico_.grupoServico, JoinType.LEFT).get(GrupoServico_.id)
                        )
                    );
            }
            if (criteria.getTipoServicoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getTipoServicoId(),
                            root -> root.join(TipoServico_.tipoServicos, JoinType.LEFT).get(ItemComanda_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
