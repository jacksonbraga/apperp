package com.apperp.web.rest;

import com.apperp.repository.TipoDespesaRepository;
import com.apperp.service.TipoDespesaQueryService;
import com.apperp.service.TipoDespesaService;
import com.apperp.service.criteria.TipoDespesaCriteria;
import com.apperp.service.dto.TipoDespesaDTO;
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
 * REST controller for managing {@link com.apperp.domain.TipoDespesa}.
 */
@RestController
@RequestMapping("/api/tipo-despesas")
public class TipoDespesaResource {

    private final Logger log = LoggerFactory.getLogger(TipoDespesaResource.class);

    private static final String ENTITY_NAME = "tipoDespesa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoDespesaService tipoDespesaService;

    private final TipoDespesaRepository tipoDespesaRepository;

    private final TipoDespesaQueryService tipoDespesaQueryService;

    public TipoDespesaResource(
        TipoDespesaService tipoDespesaService,
        TipoDespesaRepository tipoDespesaRepository,
        TipoDespesaQueryService tipoDespesaQueryService
    ) {
        this.tipoDespesaService = tipoDespesaService;
        this.tipoDespesaRepository = tipoDespesaRepository;
        this.tipoDespesaQueryService = tipoDespesaQueryService;
    }

    /**
     * {@code POST  /tipo-despesas} : Create a new tipoDespesa.
     *
     * @param tipoDespesaDTO the tipoDespesaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoDespesaDTO, or with status {@code 400 (Bad Request)} if the tipoDespesa has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TipoDespesaDTO> createTipoDespesa(@RequestBody TipoDespesaDTO tipoDespesaDTO) throws URISyntaxException {
        log.debug("REST request to save TipoDespesa : {}", tipoDespesaDTO);
        if (tipoDespesaDTO.getId() != null) {
            throw new BadRequestAlertException("A new tipoDespesa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoDespesaDTO result = tipoDespesaService.save(tipoDespesaDTO);
        return ResponseEntity
            .created(new URI("/api/tipo-despesas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-despesas/:id} : Updates an existing tipoDespesa.
     *
     * @param id the id of the tipoDespesaDTO to save.
     * @param tipoDespesaDTO the tipoDespesaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoDespesaDTO,
     * or with status {@code 400 (Bad Request)} if the tipoDespesaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoDespesaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TipoDespesaDTO> updateTipoDespesa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TipoDespesaDTO tipoDespesaDTO
    ) throws URISyntaxException {
        log.debug("REST request to update TipoDespesa : {}, {}", id, tipoDespesaDTO);
        if (tipoDespesaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoDespesaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoDespesaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TipoDespesaDTO result = tipoDespesaService.update(tipoDespesaDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoDespesaDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tipo-despesas/:id} : Partial updates given fields of an existing tipoDespesa, field will ignore if it is null
     *
     * @param id the id of the tipoDespesaDTO to save.
     * @param tipoDespesaDTO the tipoDespesaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoDespesaDTO,
     * or with status {@code 400 (Bad Request)} if the tipoDespesaDTO is not valid,
     * or with status {@code 404 (Not Found)} if the tipoDespesaDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the tipoDespesaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TipoDespesaDTO> partialUpdateTipoDespesa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TipoDespesaDTO tipoDespesaDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update TipoDespesa partially : {}, {}", id, tipoDespesaDTO);
        if (tipoDespesaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoDespesaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoDespesaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TipoDespesaDTO> result = tipoDespesaService.partialUpdate(tipoDespesaDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoDespesaDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /tipo-despesas} : get all the tipoDespesas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoDespesas in body.
     */
    @GetMapping("")
    public ResponseEntity<List<TipoDespesaDTO>> getAllTipoDespesas(TipoDespesaCriteria criteria) {
        log.debug("REST request to get TipoDespesas by criteria: {}", criteria);

        List<TipoDespesaDTO> entityList = tipoDespesaQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /tipo-despesas/count} : count all the tipoDespesas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countTipoDespesas(TipoDespesaCriteria criteria) {
        log.debug("REST request to count TipoDespesas by criteria: {}", criteria);
        return ResponseEntity.ok().body(tipoDespesaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /tipo-despesas/:id} : get the "id" tipoDespesa.
     *
     * @param id the id of the tipoDespesaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoDespesaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TipoDespesaDTO> getTipoDespesa(@PathVariable Long id) {
        log.debug("REST request to get TipoDespesa : {}", id);
        Optional<TipoDespesaDTO> tipoDespesaDTO = tipoDespesaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoDespesaDTO);
    }

    /**
     * {@code DELETE  /tipo-despesas/:id} : delete the "id" tipoDespesa.
     *
     * @param id the id of the tipoDespesaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTipoDespesa(@PathVariable Long id) {
        log.debug("REST request to delete TipoDespesa : {}", id);
        tipoDespesaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
