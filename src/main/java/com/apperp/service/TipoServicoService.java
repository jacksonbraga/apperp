package com.apperp.service;

import com.apperp.service.dto.TipoServicoDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.apperp.domain.TipoServico}.
 */
public interface TipoServicoService {
    /**
     * Save a tipoServico.
     *
     * @param tipoServicoDTO the entity to save.
     * @return the persisted entity.
     */
    TipoServicoDTO save(TipoServicoDTO tipoServicoDTO);

    /**
     * Updates a tipoServico.
     *
     * @param tipoServicoDTO the entity to update.
     * @return the persisted entity.
     */
    TipoServicoDTO update(TipoServicoDTO tipoServicoDTO);

    /**
     * Partially updates a tipoServico.
     *
     * @param tipoServicoDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TipoServicoDTO> partialUpdate(TipoServicoDTO tipoServicoDTO);

    /**
     * Get all the tipoServicos.
     *
     * @return the list of entities.
     */
    List<TipoServicoDTO> findAll();

    /**
     * Get all the tipoServicos with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TipoServicoDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" tipoServico.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoServicoDTO> findOne(Long id);

    /**
     * Delete the "id" tipoServico.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
