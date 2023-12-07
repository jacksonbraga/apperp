package com.apperp.web.rest;

import com.apperp.repository.CorRepository;
import com.apperp.service.CorQueryService;
import com.apperp.service.CorService;
import com.apperp.service.criteria.CorCriteria;
import com.apperp.service.dto.CorDTO;
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
 * REST controller for managing {@link com.apperp.domain.Cor}.
 */
@RestController
@RequestMapping("/api/cors")
public class CorResource {

    private final Logger log = LoggerFactory.getLogger(CorResource.class);

    private static final String ENTITY_NAME = "cor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CorService corService;

    private final CorRepository corRepository;

    private final CorQueryService corQueryService;

    public CorResource(CorService corService, CorRepository corRepository, CorQueryService corQueryService) {
        this.corService = corService;
        this.corRepository = corRepository;
        this.corQueryService = corQueryService;
    }

    /**
     * {@code POST  /cors} : Create a new cor.
     *
     * @param corDTO the corDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new corDTO, or with status {@code 400 (Bad Request)} if the cor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CorDTO> createCor(@RequestBody CorDTO corDTO) throws URISyntaxException {
        log.debug("REST request to save Cor : {}", corDTO);
        if (corDTO.getId() != null) {
            throw new BadRequestAlertException("A new cor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CorDTO result = corService.save(corDTO);
        return ResponseEntity
            .created(new URI("/api/cors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cors/:id} : Updates an existing cor.
     *
     * @param id the id of the corDTO to save.
     * @param corDTO the corDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated corDTO,
     * or with status {@code 400 (Bad Request)} if the corDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the corDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CorDTO> updateCor(@PathVariable(value = "id", required = false) final Long id, @RequestBody CorDTO corDTO)
        throws URISyntaxException {
        log.debug("REST request to update Cor : {}, {}", id, corDTO);
        if (corDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, corDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!corRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CorDTO result = corService.update(corDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, corDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cors/:id} : Partial updates given fields of an existing cor, field will ignore if it is null
     *
     * @param id the id of the corDTO to save.
     * @param corDTO the corDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated corDTO,
     * or with status {@code 400 (Bad Request)} if the corDTO is not valid,
     * or with status {@code 404 (Not Found)} if the corDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the corDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CorDTO> partialUpdateCor(@PathVariable(value = "id", required = false) final Long id, @RequestBody CorDTO corDTO)
        throws URISyntaxException {
        log.debug("REST request to partial update Cor partially : {}, {}", id, corDTO);
        if (corDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, corDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!corRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CorDTO> result = corService.partialUpdate(corDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, corDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /cors} : get all the cors.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cors in body.
     */
    @GetMapping("")
    public ResponseEntity<List<CorDTO>> getAllCors(CorCriteria criteria) {
        log.debug("REST request to get Cors by criteria: {}", criteria);

        List<CorDTO> entityList = corQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /cors/count} : count all the cors.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countCors(CorCriteria criteria) {
        log.debug("REST request to count Cors by criteria: {}", criteria);
        return ResponseEntity.ok().body(corQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /cors/:id} : get the "id" cor.
     *
     * @param id the id of the corDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the corDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CorDTO> getCor(@PathVariable Long id) {
        log.debug("REST request to get Cor : {}", id);
        Optional<CorDTO> corDTO = corService.findOne(id);
        return ResponseUtil.wrapOrNotFound(corDTO);
    }

    /**
     * {@code DELETE  /cors/:id} : delete the "id" cor.
     *
     * @param id the id of the corDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCor(@PathVariable Long id) {
        log.debug("REST request to delete Cor : {}", id);
        corService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
