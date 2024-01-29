package com.apperp.service;

import com.apperp.service.dto.TipoCaixaDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.apperp.domain.TipoCaixa}.
 */
public interface TipoCaixaService {
    /**
     * Save a tipoCaixa.
     *
     * @param tipoCaixaDTO the entity to save.
     * @return the persisted entity.
     */
    TipoCaixaDTO save(TipoCaixaDTO tipoCaixaDTO);

    /**
     * Updates a tipoCaixa.
     *
     * @param tipoCaixaDTO the entity to update.
     * @return the persisted entity.
     */
    TipoCaixaDTO update(TipoCaixaDTO tipoCaixaDTO);

    /**
     * Partially updates a tipoCaixa.
     *
     * @param tipoCaixaDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TipoCaixaDTO> partialUpdate(TipoCaixaDTO tipoCaixaDTO);

    /**
     * Get all the tipoCaixas.
     *
     * @return the list of entities.
     */
    List<TipoCaixaDTO> findAll();

    /**
     * Get all the TipoCaixaDTO where Caixa is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<TipoCaixaDTO> findAllWhereCaixaIsNull();

    /**
     * Get all the tipoCaixas with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TipoCaixaDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" tipoCaixa.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoCaixaDTO> findOne(Long id);

    /**
     * Delete the "id" tipoCaixa.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
