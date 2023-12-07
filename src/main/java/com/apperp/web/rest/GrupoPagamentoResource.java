package com.apperp.web.rest;

import com.apperp.repository.GrupoPagamentoRepository;
import com.apperp.service.GrupoPagamentoQueryService;
import com.apperp.service.GrupoPagamentoService;
import com.apperp.service.criteria.GrupoPagamentoCriteria;
import com.apperp.service.dto.GrupoPagamentoDTO;
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
 * REST controller for managing {@link com.apperp.domain.GrupoPagamento}.
 */
@RestController
@RequestMapping("/api/grupo-pagamentos")
public class GrupoPagamentoResource {

    private final Logger log = LoggerFactory.getLogger(GrupoPagamentoResource.class);

    private static final String ENTITY_NAME = "grupoPagamento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GrupoPagamentoService grupoPagamentoService;

    private final GrupoPagamentoRepository grupoPagamentoRepository;

    private final GrupoPagamentoQueryService grupoPagamentoQueryService;

    public GrupoPagamentoResource(
        GrupoPagamentoService grupoPagamentoService,
        GrupoPagamentoRepository grupoPagamentoRepository,
        GrupoPagamentoQueryService grupoPagamentoQueryService
    ) {
        this.grupoPagamentoService = grupoPagamentoService;
        this.grupoPagamentoRepository = grupoPagamentoRepository;
        this.grupoPagamentoQueryService = grupoPagamentoQueryService;
    }

    /**
     * {@code POST  /grupo-pagamentos} : Create a new grupoPagamento.
     *
     * @param grupoPagamentoDTO the grupoPagamentoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new grupoPagamentoDTO, or with status {@code 400 (Bad Request)} if the grupoPagamento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<GrupoPagamentoDTO> createGrupoPagamento(@RequestBody GrupoPagamentoDTO grupoPagamentoDTO)
        throws URISyntaxException {
        log.debug("REST request to save GrupoPagamento : {}", grupoPagamentoDTO);
        if (grupoPagamentoDTO.getId() != null) {
            throw new BadRequestAlertException("A new grupoPagamento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GrupoPagamentoDTO result = grupoPagamentoService.save(grupoPagamentoDTO);
        return ResponseEntity
            .created(new URI("/api/grupo-pagamentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /grupo-pagamentos/:id} : Updates an existing grupoPagamento.
     *
     * @param id the id of the grupoPagamentoDTO to save.
     * @param grupoPagamentoDTO the grupoPagamentoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated grupoPagamentoDTO,
     * or with status {@code 400 (Bad Request)} if the grupoPagamentoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the grupoPagamentoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<GrupoPagamentoDTO> updateGrupoPagamento(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody GrupoPagamentoDTO grupoPagamentoDTO
    ) throws URISyntaxException {
        log.debug("REST request to update GrupoPagamento : {}, {}", id, grupoPagamentoDTO);
        if (grupoPagamentoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, grupoPagamentoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!grupoPagamentoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        GrupoPagamentoDTO result = grupoPagamentoService.update(grupoPagamentoDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, grupoPagamentoDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /grupo-pagamentos/:id} : Partial updates given fields of an existing grupoPagamento, field will ignore if it is null
     *
     * @param id the id of the grupoPagamentoDTO to save.
     * @param grupoPagamentoDTO the grupoPagamentoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated grupoPagamentoDTO,
     * or with status {@code 400 (Bad Request)} if the grupoPagamentoDTO is not valid,
     * or with status {@code 404 (Not Found)} if the grupoPagamentoDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the grupoPagamentoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<GrupoPagamentoDTO> partialUpdateGrupoPagamento(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody GrupoPagamentoDTO grupoPagamentoDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update GrupoPagamento partially : {}, {}", id, grupoPagamentoDTO);
        if (grupoPagamentoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, grupoPagamentoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!grupoPagamentoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<GrupoPagamentoDTO> result = grupoPagamentoService.partialUpdate(grupoPagamentoDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, grupoPagamentoDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /grupo-pagamentos} : get all the grupoPagamentos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of grupoPagamentos in body.
     */
    @GetMapping("")
    public ResponseEntity<List<GrupoPagamentoDTO>> getAllGrupoPagamentos(GrupoPagamentoCriteria criteria) {
        log.debug("REST request to get GrupoPagamentos by criteria: {}", criteria);

        List<GrupoPagamentoDTO> entityList = grupoPagamentoQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /grupo-pagamentos/count} : count all the grupoPagamentos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countGrupoPagamentos(GrupoPagamentoCriteria criteria) {
        log.debug("REST request to count GrupoPagamentos by criteria: {}", criteria);
        return ResponseEntity.ok().body(grupoPagamentoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /grupo-pagamentos/:id} : get the "id" grupoPagamento.
     *
     * @param id the id of the grupoPagamentoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the grupoPagamentoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<GrupoPagamentoDTO> getGrupoPagamento(@PathVariable Long id) {
        log.debug("REST request to get GrupoPagamento : {}", id);
        Optional<GrupoPagamentoDTO> grupoPagamentoDTO = grupoPagamentoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(grupoPagamentoDTO);
    }

    /**
     * {@code DELETE  /grupo-pagamentos/:id} : delete the "id" grupoPagamento.
     *
     * @param id the id of the grupoPagamentoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrupoPagamento(@PathVariable Long id) {
        log.debug("REST request to delete GrupoPagamento : {}", id);
        grupoPagamentoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
