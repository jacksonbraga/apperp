package com.apperp.service;

import com.apperp.service.dto.GrupoCaixaDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.apperp.domain.GrupoCaixa}.
 */
public interface GrupoCaixaService {
    /**
     * Save a grupoCaixa.
     *
     * @param grupoCaixaDTO the entity to save.
     * @return the persisted entity.
     */
    GrupoCaixaDTO save(GrupoCaixaDTO grupoCaixaDTO);

    /**
     * Updates a grupoCaixa.
     *
     * @param grupoCaixaDTO the entity to update.
     * @return the persisted entity.
     */
    GrupoCaixaDTO update(GrupoCaixaDTO grupoCaixaDTO);

    /**
     * Partially updates a grupoCaixa.
     *
     * @param grupoCaixaDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<GrupoCaixaDTO> partialUpdate(GrupoCaixaDTO grupoCaixaDTO);

    /**
     * Get all the grupoCaixas.
     *
     * @return the list of entities.
     */
    List<GrupoCaixaDTO> findAll();

    /**
     * Get the "id" grupoCaixa.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<GrupoCaixaDTO> findOne(Long id);

    /**
     * Delete the "id" grupoCaixa.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
