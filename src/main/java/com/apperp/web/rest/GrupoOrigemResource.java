package com.apperp.web.rest;

import com.apperp.repository.GrupoOrigemRepository;
import com.apperp.service.GrupoOrigemService;
import com.apperp.service.dto.GrupoOrigemDTO;
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
 * REST controller for managing {@link com.apperp.domain.GrupoOrigem}.
 */
@RestController
@RequestMapping("/api/grupo-origems")
public class GrupoOrigemResource {

    private final Logger log = LoggerFactory.getLogger(GrupoOrigemResource.class);

    private static final String ENTITY_NAME = "grupoOrigem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GrupoOrigemService grupoOrigemService;

    private final GrupoOrigemRepository grupoOrigemRepository;

    public GrupoOrigemResource(GrupoOrigemService grupoOrigemService, GrupoOrigemRepository grupoOrigemRepository) {
        this.grupoOrigemService = grupoOrigemService;
        this.grupoOrigemRepository = grupoOrigemRepository;
    }

    /**
     * {@code POST  /grupo-origems} : Create a new grupoOrigem.
     *
     * @param grupoOrigemDTO the grupoOrigemDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new grupoOrigemDTO, or with status {@code 400 (Bad Request)} if the grupoOrigem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<GrupoOrigemDTO> createGrupoOrigem(@RequestBody GrupoOrigemDTO grupoOrigemDTO) throws URISyntaxException {
        log.debug("REST request to save GrupoOrigem : {}", grupoOrigemDTO);
        if (grupoOrigemDTO.getId() != null) {
            throw new BadRequestAlertException("A new grupoOrigem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GrupoOrigemDTO result = grupoOrigemService.save(grupoOrigemDTO);
        return ResponseEntity
            .created(new URI("/api/grupo-origems/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /grupo-origems/:id} : Updates an existing grupoOrigem.
     *
     * @param id the id of the grupoOrigemDTO to save.
     * @param grupoOrigemDTO the grupoOrigemDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated grupoOrigemDTO,
     * or with status {@code 400 (Bad Request)} if the grupoOrigemDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the grupoOrigemDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<GrupoOrigemDTO> updateGrupoOrigem(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody GrupoOrigemDTO grupoOrigemDTO
    ) throws URISyntaxException {
        log.debug("REST request to update GrupoOrigem : {}, {}", id, grupoOrigemDTO);
        if (grupoOrigemDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, grupoOrigemDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!grupoOrigemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        GrupoOrigemDTO result = grupoOrigemService.update(grupoOrigemDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, grupoOrigemDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /grupo-origems/:id} : Partial updates given fields of an existing grupoOrigem, field will ignore if it is null
     *
     * @param id the id of the grupoOrigemDTO to save.
     * @param grupoOrigemDTO the grupoOrigemDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated grupoOrigemDTO,
     * or with status {@code 400 (Bad Request)} if the grupoOrigemDTO is not valid,
     * or with status {@code 404 (Not Found)} if the grupoOrigemDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the grupoOrigemDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<GrupoOrigemDTO> partialUpdateGrupoOrigem(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody GrupoOrigemDTO grupoOrigemDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update GrupoOrigem partially : {}, {}", id, grupoOrigemDTO);
        if (grupoOrigemDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, grupoOrigemDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!grupoOrigemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<GrupoOrigemDTO> result = grupoOrigemService.partialUpdate(grupoOrigemDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, grupoOrigemDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /grupo-origems} : get all the grupoOrigems.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of grupoOrigems in body.
     */
    @GetMapping("")
    public List<GrupoOrigemDTO> getAllGrupoOrigems() {
        log.debug("REST request to get all GrupoOrigems");
        return grupoOrigemService.findAll();
    }

    /**
     * {@code GET  /grupo-origems/:id} : get the "id" grupoOrigem.
     *
     * @param id the id of the grupoOrigemDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the grupoOrigemDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<GrupoOrigemDTO> getGrupoOrigem(@PathVariable Long id) {
        log.debug("REST request to get GrupoOrigem : {}", id);
        Optional<GrupoOrigemDTO> grupoOrigemDTO = grupoOrigemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(grupoOrigemDTO);
    }

    /**
     * {@code DELETE  /grupo-origems/:id} : delete the "id" grupoOrigem.
     *
     * @param id the id of the grupoOrigemDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrupoOrigem(@PathVariable Long id) {
        log.debug("REST request to delete GrupoOrigem : {}", id);
        grupoOrigemService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
