package com.apperp.service;

import com.apperp.service.dto.CorDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.apperp.domain.Cor}.
 */
public interface CorService {
    /**
     * Save a cor.
     *
     * @param corDTO the entity to save.
     * @return the persisted entity.
     */
    CorDTO save(CorDTO corDTO);

    /**
     * Updates a cor.
     *
     * @param corDTO the entity to update.
     * @return the persisted entity.
     */
    CorDTO update(CorDTO corDTO);

    /**
     * Partially updates a cor.
     *
     * @param corDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CorDTO> partialUpdate(CorDTO corDTO);

    /**
     * Get all the cors.
     *
     * @return the list of entities.
     */
    List<CorDTO> findAll();

    /**
     * Get the "id" cor.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CorDTO> findOne(Long id);

    /**
     * Delete the "id" cor.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
