package com.apperp.web.rest;

import com.apperp.repository.ComandaRepository;
import com.apperp.service.ComandaQueryService;
import com.apperp.service.ComandaService;
import com.apperp.service.criteria.ComandaCriteria;
import com.apperp.service.dto.ComandaDTO;
import com.apperp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.apperp.domain.Comanda}.
 */
@RestController
@RequestMapping("/api/comandas")
public class ComandaResource {

    private final Logger log = LoggerFactory.getLogger(ComandaResource.class);

    private static final String ENTITY_NAME = "comanda";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ComandaService comandaService;

    private final ComandaRepository comandaRepository;

    private final ComandaQueryService comandaQueryService;

    public ComandaResource(ComandaService comandaService, ComandaRepository comandaRepository, ComandaQueryService comandaQueryService) {
        this.comandaService = comandaService;
        this.comandaRepository = comandaRepository;
        this.comandaQueryService = comandaQueryService;
    }

    /**
     * {@code POST  /comandas} : Create a new comanda.
     *
     * @param comandaDTO the comandaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new comandaDTO, or with status {@code 400 (Bad Request)} if the comanda has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ComandaDTO> createComanda(@RequestBody ComandaDTO comandaDTO) throws URISyntaxException {
        log.debug("REST request to save Comanda : {}", comandaDTO);
        if (comandaDTO.getId() != null) {
            throw new BadRequestAlertException("A new comanda cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ComandaDTO result = comandaService.save(comandaDTO);
        return ResponseEntity
            .created(new URI("/api/comandas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /comandas/:id} : Updates an existing comanda.
     *
     * @param id the id of the comandaDTO to save.
     * @param comandaDTO the comandaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated comandaDTO,
     * or with status {@code 400 (Bad Request)} if the comandaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the comandaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ComandaDTO> updateComanda(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ComandaDTO comandaDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Comanda : {}, {}", id, comandaDTO);
        if (comandaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, comandaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!comandaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ComandaDTO result = comandaService.update(comandaDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, comandaDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /comandas/:id} : Partial updates given fields of an existing comanda, field will ignore if it is null
     *
     * @param id the id of the comandaDTO to save.
     * @param comandaDTO the comandaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated comandaDTO,
     * or with status {@code 400 (Bad Request)} if the comandaDTO is not valid,
     * or with status {@code 404 (Not Found)} if the comandaDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the comandaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ComandaDTO> partialUpdateComanda(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ComandaDTO comandaDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Comanda partially : {}, {}", id, comandaDTO);
        if (comandaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, comandaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!comandaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ComandaDTO> result = comandaService.partialUpdate(comandaDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, comandaDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /comandas} : get all the comandas.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of comandas in body.
     */
    @GetMapping("")
    public ResponseEntity<List<ComandaDTO>> getAllComandas(
        ComandaCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get Comandas by criteria: {}", criteria);

        Page<ComandaDTO> page = comandaQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /comandas/count} : count all the comandas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countComandas(ComandaCriteria criteria) {
        log.debug("REST request to count Comandas by criteria: {}", criteria);
        return ResponseEntity.ok().body(comandaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /comandas/:id} : get the "id" comanda.
     *
     * @param id the id of the comandaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the comandaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ComandaDTO> getComanda(@PathVariable Long id) {
        log.debug("REST request to get Comanda : {}", id);
        Optional<ComandaDTO> comandaDTO = comandaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(comandaDTO);
    }

    /**
     * {@code DELETE  /comandas/:id} : delete the "id" comanda.
     *
     * @param id the id of the comandaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComanda(@PathVariable Long id) {
        log.debug("REST request to delete Comanda : {}", id);
        comandaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
