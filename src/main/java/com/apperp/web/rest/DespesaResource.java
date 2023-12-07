package com.apperp.web.rest;

import com.apperp.repository.DespesaRepository;
import com.apperp.service.DespesaQueryService;
import com.apperp.service.DespesaService;
import com.apperp.service.criteria.DespesaCriteria;
import com.apperp.service.dto.DespesaDTO;
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
 * REST controller for managing {@link com.apperp.domain.Despesa}.
 */
@RestController
@RequestMapping("/api/despesas")
public class DespesaResource {

    private final Logger log = LoggerFactory.getLogger(DespesaResource.class);

    private static final String ENTITY_NAME = "despesa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DespesaService despesaService;

    private final DespesaRepository despesaRepository;

    private final DespesaQueryService despesaQueryService;

    public DespesaResource(DespesaService despesaService, DespesaRepository despesaRepository, DespesaQueryService despesaQueryService) {
        this.despesaService = despesaService;
        this.despesaRepository = despesaRepository;
        this.despesaQueryService = despesaQueryService;
    }

    /**
     * {@code POST  /despesas} : Create a new despesa.
     *
     * @param despesaDTO the despesaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new despesaDTO, or with status {@code 400 (Bad Request)} if the despesa has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<DespesaDTO> createDespesa(@RequestBody DespesaDTO despesaDTO) throws URISyntaxException {
        log.debug("REST request to save Despesa : {}", despesaDTO);
        if (despesaDTO.getId() != null) {
            throw new BadRequestAlertException("A new despesa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DespesaDTO result = despesaService.save(despesaDTO);
        return ResponseEntity
            .created(new URI("/api/despesas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /despesas/:id} : Updates an existing despesa.
     *
     * @param id the id of the despesaDTO to save.
     * @param despesaDTO the despesaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated despesaDTO,
     * or with status {@code 400 (Bad Request)} if the despesaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the despesaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<DespesaDTO> updateDespesa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DespesaDTO despesaDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Despesa : {}, {}", id, despesaDTO);
        if (despesaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, despesaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!despesaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DespesaDTO result = despesaService.update(despesaDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, despesaDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /despesas/:id} : Partial updates given fields of an existing despesa, field will ignore if it is null
     *
     * @param id the id of the despesaDTO to save.
     * @param despesaDTO the despesaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated despesaDTO,
     * or with status {@code 400 (Bad Request)} if the despesaDTO is not valid,
     * or with status {@code 404 (Not Found)} if the despesaDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the despesaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DespesaDTO> partialUpdateDespesa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DespesaDTO despesaDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Despesa partially : {}, {}", id, despesaDTO);
        if (despesaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, despesaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!despesaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DespesaDTO> result = despesaService.partialUpdate(despesaDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, despesaDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /despesas} : get all the despesas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of despesas in body.
     */
    @GetMapping("")
    public ResponseEntity<List<DespesaDTO>> getAllDespesas(DespesaCriteria criteria) {
        log.debug("REST request to get Despesas by criteria: {}", criteria);

        List<DespesaDTO> entityList = despesaQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /despesas/count} : count all the despesas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countDespesas(DespesaCriteria criteria) {
        log.debug("REST request to count Despesas by criteria: {}", criteria);
        return ResponseEntity.ok().body(despesaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /despesas/:id} : get the "id" despesa.
     *
     * @param id the id of the despesaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the despesaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<DespesaDTO> getDespesa(@PathVariable Long id) {
        log.debug("REST request to get Despesa : {}", id);
        Optional<DespesaDTO> despesaDTO = despesaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(despesaDTO);
    }

    /**
     * {@code DELETE  /despesas/:id} : delete the "id" despesa.
     *
     * @param id the id of the despesaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDespesa(@PathVariable Long id) {
        log.debug("REST request to delete Despesa : {}", id);
        despesaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
