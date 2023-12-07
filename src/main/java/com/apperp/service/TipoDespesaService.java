package com.apperp.service;

import com.apperp.service.dto.TipoDespesaDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.apperp.domain.TipoDespesa}.
 */
public interface TipoDespesaService {
    /**
     * Save a tipoDespesa.
     *
     * @param tipoDespesaDTO the entity to save.
     * @return the persisted entity.
     */
    TipoDespesaDTO save(TipoDespesaDTO tipoDespesaDTO);

    /**
     * Updates a tipoDespesa.
     *
     * @param tipoDespesaDTO the entity to update.
     * @return the persisted entity.
     */
    TipoDespesaDTO update(TipoDespesaDTO tipoDespesaDTO);

    /**
     * Partially updates a tipoDespesa.
     *
     * @param tipoDespesaDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TipoDespesaDTO> partialUpdate(TipoDespesaDTO tipoDespesaDTO);

    /**
     * Get all the tipoDespesas.
     *
     * @return the list of entities.
     */
    List<TipoDespesaDTO> findAll();

    /**
     * Get all the tipoDespesas with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TipoDespesaDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" tipoDespesa.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoDespesaDTO> findOne(Long id);

    /**
     * Delete the "id" tipoDespesa.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
