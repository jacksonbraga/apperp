package com.apperp.service;

import com.apperp.service.dto.GrupoServicoDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.apperp.domain.GrupoServico}.
 */
public interface GrupoServicoService {
    /**
     * Save a grupoServico.
     *
     * @param grupoServicoDTO the entity to save.
     * @return the persisted entity.
     */
    GrupoServicoDTO save(GrupoServicoDTO grupoServicoDTO);

    /**
     * Updates a grupoServico.
     *
     * @param grupoServicoDTO the entity to update.
     * @return the persisted entity.
     */
    GrupoServicoDTO update(GrupoServicoDTO grupoServicoDTO);

    /**
     * Partially updates a grupoServico.
     *
     * @param grupoServicoDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<GrupoServicoDTO> partialUpdate(GrupoServicoDTO grupoServicoDTO);

    /**
     * Get all the grupoServicos.
     *
     * @return the list of entities.
     */
    List<GrupoServicoDTO> findAll();

    /**
     * Get the "id" grupoServico.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<GrupoServicoDTO> findOne(Long id);

    /**
     * Delete the "id" grupoServico.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
