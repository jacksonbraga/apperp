package com.apperp.web.rest;

import com.apperp.repository.GrupoDespesaRepository;
import com.apperp.service.GrupoDespesaQueryService;
import com.apperp.service.GrupoDespesaService;
import com.apperp.service.criteria.GrupoDespesaCriteria;
import com.apperp.service.dto.GrupoDespesaDTO;
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
 * REST controller for managing {@link com.apperp.domain.GrupoDespesa}.
 */
@RestController
@RequestMapping("/api/grupo-despesas")
public class GrupoDespesaResource {

    private final Logger log = LoggerFactory.getLogger(GrupoDespesaResource.class);

    private static final String ENTITY_NAME = "grupoDespesa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GrupoDespesaService grupoDespesaService;

    private final GrupoDespesaRepository grupoDespesaRepository;

    private final GrupoDespesaQueryService grupoDespesaQueryService;

    public GrupoDespesaResource(
        GrupoDespesaService grupoDespesaService,
        GrupoDespesaRepository grupoDespesaRepository,
        GrupoDespesaQueryService grupoDespesaQueryService
    ) {
        this.grupoDespesaService = grupoDespesaService;
        this.grupoDespesaRepository = grupoDespesaRepository;
        this.grupoDespesaQueryService = grupoDespesaQueryService;
    }

    /**
     * {@code POST  /grupo-despesas} : Create a new grupoDespesa.
     *
     * @param grupoDespesaDTO the grupoDespesaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new grupoDespesaDTO, or with status {@code 400 (Bad Request)} if the grupoDespesa has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<GrupoDespesaDTO> createGrupoDespesa(@RequestBody GrupoDespesaDTO grupoDespesaDTO) throws URISyntaxException {
        log.debug("REST request to save GrupoDespesa : {}", grupoDespesaDTO);
        if (grupoDespesaDTO.getId() != null) {
            throw new BadRequestAlertException("A new grupoDespesa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GrupoDespesaDTO result = grupoDespesaService.save(grupoDespesaDTO);
        return ResponseEntity
            .created(new URI("/api/grupo-despesas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /grupo-despesas/:id} : Updates an existing grupoDespesa.
     *
     * @param id the id of the grupoDespesaDTO to save.
     * @param grupoDespesaDTO the grupoDespesaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated grupoDespesaDTO,
     * or with status {@code 400 (Bad Request)} if the grupoDespesaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the grupoDespesaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<GrupoDespesaDTO> updateGrupoDespesa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody GrupoDespesaDTO grupoDespesaDTO
    ) throws URISyntaxException {
        log.debug("REST request to update GrupoDespesa : {}, {}", id, grupoDespesaDTO);
        if (grupoDespesaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, grupoDespesaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!grupoDespesaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        GrupoDespesaDTO result = grupoDespesaService.update(grupoDespesaDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, grupoDespesaDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /grupo-despesas/:id} : Partial updates given fields of an existing grupoDespesa, field will ignore if it is null
     *
     * @param id the id of the grupoDespesaDTO to save.
     * @param grupoDespesaDTO the grupoDespesaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated grupoDespesaDTO,
     * or with status {@code 400 (Bad Request)} if the grupoDespesaDTO is not valid,
     * or with status {@code 404 (Not Found)} if the grupoDespesaDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the grupoDespesaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<GrupoDespesaDTO> partialUpdateGrupoDespesa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody GrupoDespesaDTO grupoDespesaDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update GrupoDespesa partially : {}, {}", id, grupoDespesaDTO);
        if (grupoDespesaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, grupoDespesaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!grupoDespesaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<GrupoDespesaDTO> result = grupoDespesaService.partialUpdate(grupoDespesaDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, grupoDespesaDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /grupo-despesas} : get all the grupoDespesas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of grupoDespesas in body.
     */
    @GetMapping("")
    public ResponseEntity<List<GrupoDespesaDTO>> getAllGrupoDespesas(GrupoDespesaCriteria criteria) {
        log.debug("REST request to get GrupoDespesas by criteria: {}", criteria);

        List<GrupoDespesaDTO> entityList = grupoDespesaQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /grupo-despesas/count} : count all the grupoDespesas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countGrupoDespesas(GrupoDespesaCriteria criteria) {
        log.debug("REST request to count GrupoDespesas by criteria: {}", criteria);
        return ResponseEntity.ok().body(grupoDespesaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /grupo-despesas/:id} : get the "id" grupoDespesa.
     *
     * @param id the id of the grupoDespesaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the grupoDespesaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<GrupoDespesaDTO> getGrupoDespesa(@PathVariable Long id) {
        log.debug("REST request to get GrupoDespesa : {}", id);
        Optional<GrupoDespesaDTO> grupoDespesaDTO = grupoDespesaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(grupoDespesaDTO);
    }

    /**
     * {@code DELETE  /grupo-despesas/:id} : delete the "id" grupoDespesa.
     *
     * @param id the id of the grupoDespesaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrupoDespesa(@PathVariable Long id) {
        log.debug("REST request to delete GrupoDespesa : {}", id);
        grupoDespesaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
