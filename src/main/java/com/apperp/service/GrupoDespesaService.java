package com.apperp.service;

import com.apperp.service.dto.GrupoDespesaDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.apperp.domain.GrupoDespesa}.
 */
public interface GrupoDespesaService {
    /**
     * Save a grupoDespesa.
     *
     * @param grupoDespesaDTO the entity to save.
     * @return the persisted entity.
     */
    GrupoDespesaDTO save(GrupoDespesaDTO grupoDespesaDTO);

    /**
     * Updates a grupoDespesa.
     *
     * @param grupoDespesaDTO the entity to update.
     * @return the persisted entity.
     */
    GrupoDespesaDTO update(GrupoDespesaDTO grupoDespesaDTO);

    /**
     * Partially updates a grupoDespesa.
     *
     * @param grupoDespesaDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<GrupoDespesaDTO> partialUpdate(GrupoDespesaDTO grupoDespesaDTO);

    /**
     * Get all the grupoDespesas.
     *
     * @return the list of entities.
     */
    List<GrupoDespesaDTO> findAll();

    /**
     * Get the "id" grupoDespesa.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<GrupoDespesaDTO> findOne(Long id);

    /**
     * Delete the "id" grupoDespesa.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
