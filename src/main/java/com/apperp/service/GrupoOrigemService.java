package com.apperp.service;

import com.apperp.service.dto.GrupoOrigemDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.apperp.domain.GrupoOrigem}.
 */
public interface GrupoOrigemService {
    /**
     * Save a grupoOrigem.
     *
     * @param grupoOrigemDTO the entity to save.
     * @return the persisted entity.
     */
    GrupoOrigemDTO save(GrupoOrigemDTO grupoOrigemDTO);

    /**
     * Updates a grupoOrigem.
     *
     * @param grupoOrigemDTO the entity to update.
     * @return the persisted entity.
     */
    GrupoOrigemDTO update(GrupoOrigemDTO grupoOrigemDTO);

    /**
     * Partially updates a grupoOrigem.
     *
     * @param grupoOrigemDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<GrupoOrigemDTO> partialUpdate(GrupoOrigemDTO grupoOrigemDTO);

    /**
     * Get all the grupoOrigems.
     *
     * @return the list of entities.
     */
    List<GrupoOrigemDTO> findAll();

    /**
     * Get the "id" grupoOrigem.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<GrupoOrigemDTO> findOne(Long id);

    /**
     * Delete the "id" grupoOrigem.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
