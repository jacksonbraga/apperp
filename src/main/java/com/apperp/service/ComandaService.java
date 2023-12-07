package com.apperp.service;

import com.apperp.service.dto.ComandaDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.apperp.domain.Comanda}.
 */
public interface ComandaService {
    /**
     * Save a comanda.
     *
     * @param comandaDTO the entity to save.
     * @return the persisted entity.
     */
    ComandaDTO save(ComandaDTO comandaDTO);

    /**
     * Updates a comanda.
     *
     * @param comandaDTO the entity to update.
     * @return the persisted entity.
     */
    ComandaDTO update(ComandaDTO comandaDTO);

    /**
     * Partially updates a comanda.
     *
     * @param comandaDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ComandaDTO> partialUpdate(ComandaDTO comandaDTO);

    /**
     * Get all the comandas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ComandaDTO> findAll(Pageable pageable);

    /**
     * Get all the comandas with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ComandaDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" comanda.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ComandaDTO> findOne(Long id);

    /**
     * Delete the "id" comanda.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
