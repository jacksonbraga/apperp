package com.apperp.service;

import com.apperp.service.dto.GrupoPagamentoDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.apperp.domain.GrupoPagamento}.
 */
public interface GrupoPagamentoService {
    /**
     * Save a grupoPagamento.
     *
     * @param grupoPagamentoDTO the entity to save.
     * @return the persisted entity.
     */
    GrupoPagamentoDTO save(GrupoPagamentoDTO grupoPagamentoDTO);

    /**
     * Updates a grupoPagamento.
     *
     * @param grupoPagamentoDTO the entity to update.
     * @return the persisted entity.
     */
    GrupoPagamentoDTO update(GrupoPagamentoDTO grupoPagamentoDTO);

    /**
     * Partially updates a grupoPagamento.
     *
     * @param grupoPagamentoDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<GrupoPagamentoDTO> partialUpdate(GrupoPagamentoDTO grupoPagamentoDTO);

    /**
     * Get all the grupoPagamentos.
     *
     * @return the list of entities.
     */
    List<GrupoPagamentoDTO> findAll();

    /**
     * Get the "id" grupoPagamento.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<GrupoPagamentoDTO> findOne(Long id);

    /**
     * Delete the "id" grupoPagamento.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
