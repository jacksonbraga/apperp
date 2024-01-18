package com.apperp.service;

import com.apperp.service.dto.TipoOrigemDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.apperp.domain.TipoOrigem}.
 */
public interface TipoOrigemService {
    /**
     * Save a tipoOrigem.
     *
     * @param tipoOrigemDTO the entity to save.
     * @return the persisted entity.
     */
    TipoOrigemDTO save(TipoOrigemDTO tipoOrigemDTO);

    /**
     * Updates a tipoOrigem.
     *
     * @param tipoOrigemDTO the entity to update.
     * @return the persisted entity.
     */
    TipoOrigemDTO update(TipoOrigemDTO tipoOrigemDTO);

    /**
     * Partially updates a tipoOrigem.
     *
     * @param tipoOrigemDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TipoOrigemDTO> partialUpdate(TipoOrigemDTO tipoOrigemDTO);

    /**
     * Get all the tipoOrigems.
     *
     * @return the list of entities.
     */
    List<TipoOrigemDTO> findAll();

    /**
     * Get all the tipoOrigems with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TipoOrigemDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" tipoOrigem.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoOrigemDTO> findOne(Long id);

    /**
     * Delete the "id" tipoOrigem.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
