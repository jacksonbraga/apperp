package com.apperp.web.rest;

import com.apperp.repository.TipoOrigemRepository;
import com.apperp.service.TipoOrigemService;
import com.apperp.service.dto.TipoOrigemDTO;
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
 * REST controller for managing {@link com.apperp.domain.TipoOrigem}.
 */
@RestController
@RequestMapping("/api/tipo-origems")
public class TipoOrigemResource {

    private final Logger log = LoggerFactory.getLogger(TipoOrigemResource.class);

    private static final String ENTITY_NAME = "tipoOrigem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoOrigemService tipoOrigemService;

    private final TipoOrigemRepository tipoOrigemRepository;

    public TipoOrigemResource(TipoOrigemService tipoOrigemService, TipoOrigemRepository tipoOrigemRepository) {
        this.tipoOrigemService = tipoOrigemService;
        this.tipoOrigemRepository = tipoOrigemRepository;
    }

    /**
     * {@code POST  /tipo-origems} : Create a new tipoOrigem.
     *
     * @param tipoOrigemDTO the tipoOrigemDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoOrigemDTO, or with status {@code 400 (Bad Request)} if the tipoOrigem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TipoOrigemDTO> createTipoOrigem(@RequestBody TipoOrigemDTO tipoOrigemDTO) throws URISyntaxException {
        log.debug("REST request to save TipoOrigem : {}", tipoOrigemDTO);
        if (tipoOrigemDTO.getId() != null) {
            throw new BadRequestAlertException("A new tipoOrigem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoOrigemDTO result = tipoOrigemService.save(tipoOrigemDTO);
        return ResponseEntity
            .created(new URI("/api/tipo-origems/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-origems/:id} : Updates an existing tipoOrigem.
     *
     * @param id the id of the tipoOrigemDTO to save.
     * @param tipoOrigemDTO the tipoOrigemDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoOrigemDTO,
     * or with status {@code 400 (Bad Request)} if the tipoOrigemDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoOrigemDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TipoOrigemDTO> updateTipoOrigem(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TipoOrigemDTO tipoOrigemDTO
    ) throws URISyntaxException {
        log.debug("REST request to update TipoOrigem : {}, {}", id, tipoOrigemDTO);
        if (tipoOrigemDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoOrigemDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoOrigemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TipoOrigemDTO result = tipoOrigemService.update(tipoOrigemDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoOrigemDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tipo-origems/:id} : Partial updates given fields of an existing tipoOrigem, field will ignore if it is null
     *
     * @param id the id of the tipoOrigemDTO to save.
     * @param tipoOrigemDTO the tipoOrigemDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoOrigemDTO,
     * or with status {@code 400 (Bad Request)} if the tipoOrigemDTO is not valid,
     * or with status {@code 404 (Not Found)} if the tipoOrigemDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the tipoOrigemDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TipoOrigemDTO> partialUpdateTipoOrigem(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TipoOrigemDTO tipoOrigemDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update TipoOrigem partially : {}, {}", id, tipoOrigemDTO);
        if (tipoOrigemDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoOrigemDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoOrigemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TipoOrigemDTO> result = tipoOrigemService.partialUpdate(tipoOrigemDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoOrigemDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /tipo-origems} : get all the tipoOrigems.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoOrigems in body.
     */
    @GetMapping("")
    public List<TipoOrigemDTO> getAllTipoOrigems(
        @RequestParam(required = false) String filter,
        @RequestParam(required = false, defaultValue = "true") boolean eagerload
    ) {
        if ("caixa-is-null".equals(filter)) {
            log.debug("REST request to get all TipoOrigems where caixa is null");
            return tipoOrigemService.findAllWhereCaixaIsNull();
        }
        log.debug("REST request to get all TipoOrigems");
        return tipoOrigemService.findAll();
    }

    /**
     * {@code GET  /tipo-origems/:id} : get the "id" tipoOrigem.
     *
     * @param id the id of the tipoOrigemDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoOrigemDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TipoOrigemDTO> getTipoOrigem(@PathVariable Long id) {
        log.debug("REST request to get TipoOrigem : {}", id);
        Optional<TipoOrigemDTO> tipoOrigemDTO = tipoOrigemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoOrigemDTO);
    }

    /**
     * {@code DELETE  /tipo-origems/:id} : delete the "id" tipoOrigem.
     *
     * @param id the id of the tipoOrigemDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTipoOrigem(@PathVariable Long id) {
        log.debug("REST request to delete TipoOrigem : {}", id);
        tipoOrigemService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
