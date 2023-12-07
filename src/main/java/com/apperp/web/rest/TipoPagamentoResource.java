package com.apperp.web.rest;

import com.apperp.repository.TipoPagamentoRepository;
import com.apperp.service.TipoPagamentoQueryService;
import com.apperp.service.TipoPagamentoService;
import com.apperp.service.criteria.TipoPagamentoCriteria;
import com.apperp.service.dto.TipoPagamentoDTO;
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
 * REST controller for managing {@link com.apperp.domain.TipoPagamento}.
 */
@RestController
@RequestMapping("/api/tipo-pagamentos")
public class TipoPagamentoResource {

    private final Logger log = LoggerFactory.getLogger(TipoPagamentoResource.class);

    private static final String ENTITY_NAME = "tipoPagamento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoPagamentoService tipoPagamentoService;

    private final TipoPagamentoRepository tipoPagamentoRepository;

    private final TipoPagamentoQueryService tipoPagamentoQueryService;

    public TipoPagamentoResource(
        TipoPagamentoService tipoPagamentoService,
        TipoPagamentoRepository tipoPagamentoRepository,
        TipoPagamentoQueryService tipoPagamentoQueryService
    ) {
        this.tipoPagamentoService = tipoPagamentoService;
        this.tipoPagamentoRepository = tipoPagamentoRepository;
        this.tipoPagamentoQueryService = tipoPagamentoQueryService;
    }

    /**
     * {@code POST  /tipo-pagamentos} : Create a new tipoPagamento.
     *
     * @param tipoPagamentoDTO the tipoPagamentoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoPagamentoDTO, or with status {@code 400 (Bad Request)} if the tipoPagamento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TipoPagamentoDTO> createTipoPagamento(@RequestBody TipoPagamentoDTO tipoPagamentoDTO) throws URISyntaxException {
        log.debug("REST request to save TipoPagamento : {}", tipoPagamentoDTO);
        if (tipoPagamentoDTO.getId() != null) {
            throw new BadRequestAlertException("A new tipoPagamento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoPagamentoDTO result = tipoPagamentoService.save(tipoPagamentoDTO);
        return ResponseEntity
            .created(new URI("/api/tipo-pagamentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-pagamentos/:id} : Updates an existing tipoPagamento.
     *
     * @param id the id of the tipoPagamentoDTO to save.
     * @param tipoPagamentoDTO the tipoPagamentoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoPagamentoDTO,
     * or with status {@code 400 (Bad Request)} if the tipoPagamentoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoPagamentoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TipoPagamentoDTO> updateTipoPagamento(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TipoPagamentoDTO tipoPagamentoDTO
    ) throws URISyntaxException {
        log.debug("REST request to update TipoPagamento : {}, {}", id, tipoPagamentoDTO);
        if (tipoPagamentoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoPagamentoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoPagamentoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TipoPagamentoDTO result = tipoPagamentoService.update(tipoPagamentoDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoPagamentoDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tipo-pagamentos/:id} : Partial updates given fields of an existing tipoPagamento, field will ignore if it is null
     *
     * @param id the id of the tipoPagamentoDTO to save.
     * @param tipoPagamentoDTO the tipoPagamentoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoPagamentoDTO,
     * or with status {@code 400 (Bad Request)} if the tipoPagamentoDTO is not valid,
     * or with status {@code 404 (Not Found)} if the tipoPagamentoDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the tipoPagamentoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TipoPagamentoDTO> partialUpdateTipoPagamento(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TipoPagamentoDTO tipoPagamentoDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update TipoPagamento partially : {}, {}", id, tipoPagamentoDTO);
        if (tipoPagamentoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoPagamentoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoPagamentoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TipoPagamentoDTO> result = tipoPagamentoService.partialUpdate(tipoPagamentoDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoPagamentoDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /tipo-pagamentos} : get all the tipoPagamentos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoPagamentos in body.
     */
    @GetMapping("")
    public ResponseEntity<List<TipoPagamentoDTO>> getAllTipoPagamentos(TipoPagamentoCriteria criteria) {
        log.debug("REST request to get TipoPagamentos by criteria: {}", criteria);

        List<TipoPagamentoDTO> entityList = tipoPagamentoQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /tipo-pagamentos/count} : count all the tipoPagamentos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countTipoPagamentos(TipoPagamentoCriteria criteria) {
        log.debug("REST request to count TipoPagamentos by criteria: {}", criteria);
        return ResponseEntity.ok().body(tipoPagamentoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /tipo-pagamentos/:id} : get the "id" tipoPagamento.
     *
     * @param id the id of the tipoPagamentoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoPagamentoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TipoPagamentoDTO> getTipoPagamento(@PathVariable Long id) {
        log.debug("REST request to get TipoPagamento : {}", id);
        Optional<TipoPagamentoDTO> tipoPagamentoDTO = tipoPagamentoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoPagamentoDTO);
    }

    /**
     * {@code DELETE  /tipo-pagamentos/:id} : delete the "id" tipoPagamento.
     *
     * @param id the id of the tipoPagamentoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTipoPagamento(@PathVariable Long id) {
        log.debug("REST request to delete TipoPagamento : {}", id);
        tipoPagamentoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
