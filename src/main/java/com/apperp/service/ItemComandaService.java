package com.apperp.service;

import com.apperp.service.dto.ItemComandaDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.apperp.domain.ItemComanda}.
 */
public interface ItemComandaService {
    /**
     * Save a itemComanda.
     *
     * @param itemComandaDTO the entity to save.
     * @return the persisted entity.
     */
    ItemComandaDTO save(ItemComandaDTO itemComandaDTO);

    /**
     * Updates a itemComanda.
     *
     * @param itemComandaDTO the entity to update.
     * @return the persisted entity.
     */
    ItemComandaDTO update(ItemComandaDTO itemComandaDTO);

    /**
     * Partially updates a itemComanda.
     *
     * @param itemComandaDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ItemComandaDTO> partialUpdate(ItemComandaDTO itemComandaDTO);

    /**
     * Get all the itemComandas.
     *
     * @return the list of entities.
     */
    List<ItemComandaDTO> findAll();

    /**
     * Get all the itemComandas with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ItemComandaDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" itemComanda.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ItemComandaDTO> findOne(Long id);

    /**
     * Delete the "id" itemComanda.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
