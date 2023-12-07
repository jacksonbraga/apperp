package com.apperp.web.rest;

import com.apperp.repository.TipoServicoRepository;
import com.apperp.service.TipoServicoQueryService;
import com.apperp.service.TipoServicoService;
import com.apperp.service.criteria.TipoServicoCriteria;
import com.apperp.service.dto.TipoServicoDTO;
import com.apperp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.apperp.domain.TipoServico}.
 */
@RestController
@RequestMapping("/api/tipo-servicos")
public class TipoServicoResource {

    private final Logger log = LoggerFactory.getLogger(TipoServicoResource.class);

    private static final String ENTITY_NAME = "tipoServico";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoServicoService tipoServicoService;

    private final TipoServicoRepository tipoServicoRepository;

    private final TipoServicoQueryService tipoServicoQueryService;

    public TipoServicoResource(
        TipoServicoService tipoServicoService,
        TipoServicoRepository tipoServicoRepository,
        TipoServicoQueryService tipoServicoQueryService
    ) {
        this.tipoServicoService = tipoServicoService;
        this.tipoServicoRepository = tipoServicoRepository;
        this.tipoServicoQueryService = tipoServicoQueryService;
    }

    /**
     * {@code POST  /tipo-servicos} : Create a new tipoServico.
     *
     * @param tipoServicoDTO the tipoServicoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoServicoDTO, or with status {@code 400 (Bad Request)} if the tipoServico has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TipoServicoDTO> createTipoServico(@RequestBody TipoServicoDTO tipoServicoDTO) throws URISyntaxException {
        log.debug("REST request to save TipoServico : {}", tipoServicoDTO);
        if (tipoServicoDTO.getId() != null) {
            throw new BadRequestAlertException("A new tipoServico cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoServicoDTO result = tipoServicoService.save(tipoServicoDTO);
        return ResponseEntity
            .created(new URI("/api/tipo-servicos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-servicos/:id} : Updates an existing tipoServico.
     *
     * @param id the id of the tipoServicoDTO to save.
     * @param tipoServicoDTO the tipoServicoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoServicoDTO,
     * or with status {@code 400 (Bad Request)} if the tipoServicoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoServicoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TipoServicoDTO> updateTipoServico(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TipoServicoDTO tipoServicoDTO
    ) throws URISyntaxException {
        log.debug("REST request to update TipoServico : {}, {}", id, tipoServicoDTO);
        if (tipoServicoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoServicoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoServicoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TipoServicoDTO result = tipoServicoService.update(tipoServicoDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoServicoDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tipo-servicos/:id} : Partial updates given fields of an existing tipoServico, field will ignore if it is null
     *
     * @param id the id of the tipoServicoDTO to save.
     * @param tipoServicoDTO the tipoServicoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoServicoDTO,
     * or with status {@code 400 (Bad Request)} if the tipoServicoDTO is not valid,
     * or with status {@code 404 (Not Found)} if the tipoServicoDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the tipoServicoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TipoServicoDTO> partialUpdateTipoServico(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TipoServicoDTO tipoServicoDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update TipoServico partially : {}, {}", id, tipoServicoDTO);
        if (tipoServicoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoServicoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoServicoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TipoServicoDTO> result = tipoServicoService.partialUpdate(tipoServicoDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoServicoDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /tipo-servicos} : get all the tipoServicos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoServicos in body.
     */
    @GetMapping("")
    public ResponseEntity<List<TipoServicoDTO>> getAllTipoServicos(TipoServicoCriteria criteria) {
        log.debug("REST request to get TipoServicos by criteria: {}", criteria);

        List<TipoServicoDTO> entityList = tipoServicoQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /tipo-servicos/count} : count all the tipoServicos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countTipoServicos(TipoServicoCriteria criteria) {
        log.debug("REST request to count TipoServicos by criteria: {}", criteria);
        return ResponseEntity.ok().body(tipoServicoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /tipo-servicos/:id} : get the "id" tipoServico.
     *
     * @param id the id of the tipoServicoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoServicoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TipoServicoDTO> getTipoServico(@PathVariable Long id) {
        log.debug("REST request to get TipoServico : {}", id);
        Optional<TipoServicoDTO> tipoServicoDTO = tipoServicoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoServicoDTO);
    }

    /**
     * {@code DELETE  /tipo-servicos/:id} : delete the "id" tipoServico.
     *
     * @param id the id of the tipoServicoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTipoServico(@PathVariable Long id) {
        log.debug("REST request to delete TipoServico : {}", id);
        tipoServicoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
