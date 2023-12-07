package com.apperp.service;

import com.apperp.service.dto.SituacaoDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.apperp.domain.Situacao}.
 */
public interface SituacaoService {
    /**
     * Save a situacao.
     *
     * @param situacaoDTO the entity to save.
     * @return the persisted entity.
     */
    SituacaoDTO save(SituacaoDTO situacaoDTO);

    /**
     * Updates a situacao.
     *
     * @param situacaoDTO the entity to update.
     * @return the persisted entity.
     */
    SituacaoDTO update(SituacaoDTO situacaoDTO);

    /**
     * Partially updates a situacao.
     *
     * @param situacaoDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<SituacaoDTO> partialUpdate(SituacaoDTO situacaoDTO);

    /**
     * Get all the situacaos.
     *
     * @return the list of entities.
     */
    List<SituacaoDTO> findAll();

    /**
     * Get the "id" situacao.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SituacaoDTO> findOne(Long id);

    /**
     * Delete the "id" situacao.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
