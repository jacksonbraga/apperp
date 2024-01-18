package com.apperp.web.rest;

import com.apperp.repository.TipoCaixaRepository;
import com.apperp.service.TipoCaixaService;
import com.apperp.service.dto.TipoCaixaDTO;
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
 * REST controller for managing {@link com.apperp.domain.TipoCaixa}.
 */
@RestController
@RequestMapping("/api/tipo-caixas")
public class TipoCaixaResource {

    private final Logger log = LoggerFactory.getLogger(TipoCaixaResource.class);

    private static final String ENTITY_NAME = "tipoCaixa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoCaixaService tipoCaixaService;

    private final TipoCaixaRepository tipoCaixaRepository;

    public TipoCaixaResource(TipoCaixaService tipoCaixaService, TipoCaixaRepository tipoCaixaRepository) {
        this.tipoCaixaService = tipoCaixaService;
        this.tipoCaixaRepository = tipoCaixaRepository;
    }

    /**
     * {@code POST  /tipo-caixas} : Create a new tipoCaixa.
     *
     * @param tipoCaixaDTO the tipoCaixaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoCaixaDTO, or with status {@code 400 (Bad Request)} if the tipoCaixa has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TipoCaixaDTO> createTipoCaixa(@RequestBody TipoCaixaDTO tipoCaixaDTO) throws URISyntaxException {
        log.debug("REST request to save TipoCaixa : {}", tipoCaixaDTO);
        if (tipoCaixaDTO.getId() != null) {
            throw new BadRequestAlertException("A new tipoCaixa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoCaixaDTO result = tipoCaixaService.save(tipoCaixaDTO);
        return ResponseEntity
            .created(new URI("/api/tipo-caixas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-caixas/:id} : Updates an existing tipoCaixa.
     *
     * @param id the id of the tipoCaixaDTO to save.
     * @param tipoCaixaDTO the tipoCaixaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoCaixaDTO,
     * or with status {@code 400 (Bad Request)} if the tipoCaixaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoCaixaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TipoCaixaDTO> updateTipoCaixa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TipoCaixaDTO tipoCaixaDTO
    ) throws URISyntaxException {
        log.debug("REST request to update TipoCaixa : {}, {}", id, tipoCaixaDTO);
        if (tipoCaixaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoCaixaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoCaixaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TipoCaixaDTO result = tipoCaixaService.update(tipoCaixaDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoCaixaDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tipo-caixas/:id} : Partial updates given fields of an existing tipoCaixa, field will ignore if it is null
     *
     * @param id the id of the tipoCaixaDTO to save.
     * @param tipoCaixaDTO the tipoCaixaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoCaixaDTO,
     * or with status {@code 400 (Bad Request)} if the tipoCaixaDTO is not valid,
     * or with status {@code 404 (Not Found)} if the tipoCaixaDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the tipoCaixaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TipoCaixaDTO> partialUpdateTipoCaixa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TipoCaixaDTO tipoCaixaDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update TipoCaixa partially : {}, {}", id, tipoCaixaDTO);
        if (tipoCaixaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoCaixaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoCaixaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TipoCaixaDTO> result = tipoCaixaService.partialUpdate(tipoCaixaDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoCaixaDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /tipo-caixas} : get all the tipoCaixas.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoCaixas in body.
     */
    @GetMapping("")
    public List<TipoCaixaDTO> getAllTipoCaixas(@RequestParam(required = false, defaultValue = "true") boolean eagerload) {
        log.debug("REST request to get all TipoCaixas");
        return tipoCaixaService.findAll();
    }

    /**
     * {@code GET  /tipo-caixas/:id} : get the "id" tipoCaixa.
     *
     * @param id the id of the tipoCaixaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoCaixaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TipoCaixaDTO> getTipoCaixa(@PathVariable Long id) {
        log.debug("REST request to get TipoCaixa : {}", id);
        Optional<TipoCaixaDTO> tipoCaixaDTO = tipoCaixaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoCaixaDTO);
    }

    /**
     * {@code DELETE  /tipo-caixas/:id} : delete the "id" tipoCaixa.
     *
     * @param id the id of the tipoCaixaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTipoCaixa(@PathVariable Long id) {
        log.debug("REST request to delete TipoCaixa : {}", id);
        tipoCaixaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
