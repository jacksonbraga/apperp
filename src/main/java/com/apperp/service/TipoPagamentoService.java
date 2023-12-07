package com.apperp.service;

import com.apperp.service.dto.TipoPagamentoDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.apperp.domain.TipoPagamento}.
 */
public interface TipoPagamentoService {
    /**
     * Save a tipoPagamento.
     *
     * @param tipoPagamentoDTO the entity to save.
     * @return the persisted entity.
     */
    TipoPagamentoDTO save(TipoPagamentoDTO tipoPagamentoDTO);

    /**
     * Updates a tipoPagamento.
     *
     * @param tipoPagamentoDTO the entity to update.
     * @return the persisted entity.
     */
    TipoPagamentoDTO update(TipoPagamentoDTO tipoPagamentoDTO);

    /**
     * Partially updates a tipoPagamento.
     *
     * @param tipoPagamentoDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TipoPagamentoDTO> partialUpdate(TipoPagamentoDTO tipoPagamentoDTO);

    /**
     * Get all the tipoPagamentos.
     *
     * @return the list of entities.
     */
    List<TipoPagamentoDTO> findAll();

    /**
     * Get all the tipoPagamentos with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TipoPagamentoDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" tipoPagamento.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoPagamentoDTO> findOne(Long id);

    /**
     * Delete the "id" tipoPagamento.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
