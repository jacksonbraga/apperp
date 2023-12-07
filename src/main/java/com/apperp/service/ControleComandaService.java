package com.apperp.service;

import com.apperp.service.dto.ControleComandaDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.apperp.domain.ControleComanda}.
 */
public interface ControleComandaService {
    /**
     * Save a controleComanda.
     *
     * @param controleComandaDTO the entity to save.
     * @return the persisted entity.
     */
    ControleComandaDTO save(ControleComandaDTO controleComandaDTO);

    /**
     * Updates a controleComanda.
     *
     * @param controleComandaDTO the entity to update.
     * @return the persisted entity.
     */
    ControleComandaDTO update(ControleComandaDTO controleComandaDTO);

    /**
     * Partially updates a controleComanda.
     *
     * @param controleComandaDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ControleComandaDTO> partialUpdate(ControleComandaDTO controleComandaDTO);

    /**
     * Get all the controleComandas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ControleComandaDTO> findAll(Pageable pageable);

    /**
     * Get all the controleComandas with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ControleComandaDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" controleComanda.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ControleComandaDTO> findOne(Long id);

    /**
     * Delete the "id" controleComanda.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
