package com.apperp.service;

import com.apperp.domain.*; // for static metamodels
import com.apperp.repository.GrupoPagamentoRepository;
import com.apperp.repository.ItemComandaRepository;
import com.apperp.repository.TipoPagamentoRepository;
import com.apperp.service.criteria.ItemComandaCriteria;
import com.apperp.service.dto.IRelatorio;
import com.apperp.service.dto.IRelatorioCaixa;
import com.apperp.service.dto.IRelatorioComanda;
import com.apperp.service.dto.IRelatorioConferenciaExtrato;
import com.apperp.service.dto.IRelatorioConferenciaExtratoAcumulado;
import com.apperp.service.dto.IRelatorioControle;
import com.apperp.service.dto.IRelatorioControle4;
import com.apperp.service.dto.IRelatorioControleValoresRecebidos;
import com.apperp.service.dto.IRelatorioControleValoresRecebidosResumo;
import com.apperp.service.dto.ItemComandaDTO;
import com.apperp.service.mapper.ItemComandaMapper;
import jakarta.persistence.criteria.JoinType;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link ItemComanda} entities in the database.
 * The main input is a {@link ItemComandaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link ItemComandaDTO} or a {@link Page} of {@link ItemComandaDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ItemComandaQueryService extends QueryService<ItemComanda> {

    private final Logger log = LoggerFactory.getLogger(ItemComandaQueryService.class);

    private final ItemComandaRepository itemComandaRepository;

    private final GrupoPagamentoRepository grupoPagamentoRepository;

    private final TipoPagamentoRepository tipoPagamentoRepository;

    private final ItemComandaMapper itemComandaMapper;

    public ItemComandaQueryService(
        TipoPagamentoRepository tipoPagamentoRepository,
        GrupoPagamentoRepository grupoPagamentoRepository,
        ItemComandaRepository itemComandaRepository,
        ItemComandaMapper itemComandaMapper
    ) {
        this.itemComandaRepository = itemComandaRepository;
        this.tipoPagamentoRepository = tipoPagamentoRepository;
        this.grupoPagamentoRepository = grupoPagamentoRepository;
        this.itemComandaMapper = itemComandaMapper;
    }

    /**
     * Return a {@link List} of {@link ItemComandaDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<ItemComandaDTO> findByCriteria(ItemComandaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<ItemComanda> specification = createSpecification(criteria);

        return itemComandaMapper.toDto(itemComandaRepository.findAll(specification));
    }

    @Transactional(readOnly = true)
    public List<IRelatorio> listaRelatorioPorDia(String dataInicio, String dataFim) {
        return itemComandaRepository.listaRelatorioPorDia(dataInicio, dataFim);
    }

    @Transactional(readOnly = true)
    public List<IRelatorioComanda> listaRelatorioComandaPorDia(String dataInicio, String dataFim) {
        return itemComandaRepository.listaRelatorioComandaPorDia(dataInicio, dataFim);
    }

    /**
     * Return a {@link Page} of {@link ItemComandaDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<ItemComandaDTO> findByCriteria(ItemComandaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<ItemComanda> specification = createSpecification(criteria);
        return itemComandaRepository.findAll(specification, page).map(itemComandaMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ItemComandaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<ItemComanda> specification = createSpecification(criteria);
        return itemComandaRepository.count(specification);
    }

    /**
     * Function to convert {@link ItemComandaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<ItemComanda> createSpecification(ItemComandaCriteria criteria) {
        Specification<ItemComanda> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), ItemComanda_.id));
            }
            if (criteria.getDescricao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescricao(), ItemComanda_.descricao));
            }
            if (criteria.getObservacao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getObservacao(), ItemComanda_.observacao));
            }
            if (criteria.getData() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getData(), ItemComanda_.data));
            }
            if (criteria.getNumero() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getNumero(), ItemComanda_.numero));
            }
            if (criteria.getQtde() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getQtde(), ItemComanda_.qtde));
            }
            if (criteria.getValor() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getValor(), ItemComanda_.valor));
            }
            if (criteria.getTipoPagamentoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getTipoPagamentoId(),
                            root -> root.join(ItemComanda_.tipoPagamento, JoinType.LEFT).get(TipoPagamento_.id)
                        )
                    );
            }
            if (criteria.getTipoServicoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getTipoServicoId(),
                            root -> root.join(ItemComanda_.tipoServico, JoinType.LEFT).get(TipoServico_.id)
                        )
                    );
            }
            if (criteria.getComandaPaiId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getComandaPaiId(),
                            root -> root.join(ItemComanda_.comandaPai, JoinType.LEFT).get(Comanda_.id)
                        )
                    );
            }
            if (criteria.getComandaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getComandaId(), root -> root.join(ItemComanda_.comanda, JoinType.LEFT).get(Comanda_.id))
                    );
            }
        }
        return specification;
    }

    @Transactional(readOnly = true)
    public List<IRelatorioControleValoresRecebidos> listaRelatorioControleValoresRecebidosPorDia(String dataInicio, String dataFim) {
        return itemComandaRepository.listaRelatorioControleValoresRecebidosPorDia(dataInicio, dataFim);
    }

    @Transactional(readOnly = true)
    public List<IRelatorioControleValoresRecebidosResumo> listaRelatorioControleValoresRecebidosResumoPorDia(
        String dataInicio,
        String dataFim
    ) {
        return itemComandaRepository.listaRelatorioControleValoresRecebidosResumoPorDia(dataInicio, dataFim);
    }

    @Transactional(readOnly = true)
    public List<IRelatorioControleValoresRecebidosResumo> listaRelatorioTicketMedioPorDia(String dataInicio, String dataFim) {
        return itemComandaRepository.listaRelatorioTicketMedioPorDia(dataInicio, dataFim);
    }

    @Transactional(readOnly = true)
    public List<IRelatorioCaixa> listaRelatorioCaixaPorDia(String dataInicio, String dataFim) {
        return itemComandaRepository.listaRelatorioCaixaPorDia(dataInicio, dataFim);
    }

    @Transactional(readOnly = true)
    public List<IRelatorioControle4> listaRelatorioControle4PorDia(String dataInicio, String dataFim) {
        return itemComandaRepository.listaRelatorioControle4PorDia(dataInicio, dataFim);
    }

    @Transactional(readOnly = true)
    public List<IRelatorioConferenciaExtrato> listaRelatorioConferenciaExtrato(String dataInicio, String dataFim) {
        return itemComandaRepository.listaRelatorioConferenciaExtratoPorDia(dataInicio, dataFim);
    }

    @Transactional(readOnly = true)
    public List<IRelatorioConferenciaExtratoAcumulado> listaRelatorioConferenciaExtratoAcumulado(String dataInicio, String dataFim) {
        return itemComandaRepository.listaRelatorioConferenciaExtratoAcumuladoPorDia(dataInicio, dataFim);
    }
}
