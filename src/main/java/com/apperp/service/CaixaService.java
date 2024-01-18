package com.apperp.service;

import com.apperp.service.dto.CaixaDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.apperp.domain.Caixa}.
 */
public interface CaixaService {
    /**
     * Save a caixa.
     *
     * @param caixaDTO the entity to save.
     * @return the persisted entity.
     */
    CaixaDTO save(CaixaDTO caixaDTO);

    /**
     * Updates a caixa.
     *
     * @param caixaDTO the entity to update.
     * @return the persisted entity.
     */
    CaixaDTO update(CaixaDTO caixaDTO);

    /**
     * Partially updates a caixa.
     *
     * @param caixaDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CaixaDTO> partialUpdate(CaixaDTO caixaDTO);

    /**
     * Get all the caixas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CaixaDTO> findAll(Pageable pageable);

    /**
     * Get all the caixas with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CaixaDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" caixa.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CaixaDTO> findOne(Long id);

    /**
     * Delete the "id" caixa.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
