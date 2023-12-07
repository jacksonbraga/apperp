package com.apperp.service;

import com.apperp.service.dto.DespesaDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.apperp.domain.Despesa}.
 */
public interface DespesaService {
    /**
     * Save a despesa.
     *
     * @param despesaDTO the entity to save.
     * @return the persisted entity.
     */
    DespesaDTO save(DespesaDTO despesaDTO);

    /**
     * Updates a despesa.
     *
     * @param despesaDTO the entity to update.
     * @return the persisted entity.
     */
    DespesaDTO update(DespesaDTO despesaDTO);

    /**
     * Partially updates a despesa.
     *
     * @param despesaDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DespesaDTO> partialUpdate(DespesaDTO despesaDTO);

    /**
     * Get all the despesas.
     *
     * @return the list of entities.
     */
    List<DespesaDTO> findAll();

    /**
     * Get all the despesas with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DespesaDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" despesa.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DespesaDTO> findOne(Long id);

    /**
     * Delete the "id" despesa.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
