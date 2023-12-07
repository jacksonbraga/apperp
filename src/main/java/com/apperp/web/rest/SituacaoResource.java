package com.apperp.web.rest;

import com.apperp.repository.SituacaoRepository;
import com.apperp.service.SituacaoQueryService;
import com.apperp.service.SituacaoService;
import com.apperp.service.criteria.SituacaoCriteria;
import com.apperp.service.dto.SituacaoDTO;
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
 * REST controller for managing {@link com.apperp.domain.Situacao}.
 */
@RestController
@RequestMapping("/api/situacaos")
public class SituacaoResource {

    private final Logger log = LoggerFactory.getLogger(SituacaoResource.class);

    private static final String ENTITY_NAME = "situacao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SituacaoService situacaoService;

    private final SituacaoRepository situacaoRepository;

    private final SituacaoQueryService situacaoQueryService;

    public SituacaoResource(
        SituacaoService situacaoService,
        SituacaoRepository situacaoRepository,
        SituacaoQueryService situacaoQueryService
    ) {
        this.situacaoService = situacaoService;
        this.situacaoRepository = situacaoRepository;
        this.situacaoQueryService = situacaoQueryService;
    }

    /**
     * {@code POST  /situacaos} : Create a new situacao.
     *
     * @param situacaoDTO the situacaoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new situacaoDTO, or with status {@code 400 (Bad Request)} if the situacao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<SituacaoDTO> createSituacao(@RequestBody SituacaoDTO situacaoDTO) throws URISyntaxException {
        log.debug("REST request to save Situacao : {}", situacaoDTO);
        if (situacaoDTO.getId() != null) {
            throw new BadRequestAlertException("A new situacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SituacaoDTO result = situacaoService.save(situacaoDTO);
        return ResponseEntity
            .created(new URI("/api/situacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /situacaos/:id} : Updates an existing situacao.
     *
     * @param id the id of the situacaoDTO to save.
     * @param situacaoDTO the situacaoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated situacaoDTO,
     * or with status {@code 400 (Bad Request)} if the situacaoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the situacaoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<SituacaoDTO> updateSituacao(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SituacaoDTO situacaoDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Situacao : {}, {}", id, situacaoDTO);
        if (situacaoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, situacaoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!situacaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SituacaoDTO result = situacaoService.update(situacaoDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, situacaoDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /situacaos/:id} : Partial updates given fields of an existing situacao, field will ignore if it is null
     *
     * @param id the id of the situacaoDTO to save.
     * @param situacaoDTO the situacaoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated situacaoDTO,
     * or with status {@code 400 (Bad Request)} if the situacaoDTO is not valid,
     * or with status {@code 404 (Not Found)} if the situacaoDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the situacaoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SituacaoDTO> partialUpdateSituacao(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SituacaoDTO situacaoDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Situacao partially : {}, {}", id, situacaoDTO);
        if (situacaoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, situacaoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!situacaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SituacaoDTO> result = situacaoService.partialUpdate(situacaoDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, situacaoDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /situacaos} : get all the situacaos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of situacaos in body.
     */
    @GetMapping("")
    public ResponseEntity<List<SituacaoDTO>> getAllSituacaos(SituacaoCriteria criteria) {
        log.debug("REST request to get Situacaos by criteria: {}", criteria);

        List<SituacaoDTO> entityList = situacaoQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /situacaos/count} : count all the situacaos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countSituacaos(SituacaoCriteria criteria) {
        log.debug("REST request to count Situacaos by criteria: {}", criteria);
        return ResponseEntity.ok().body(situacaoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /situacaos/:id} : get the "id" situacao.
     *
     * @param id the id of the situacaoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the situacaoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<SituacaoDTO> getSituacao(@PathVariable Long id) {
        log.debug("REST request to get Situacao : {}", id);
        Optional<SituacaoDTO> situacaoDTO = situacaoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(situacaoDTO);
    }

    /**
     * {@code DELETE  /situacaos/:id} : delete the "id" situacao.
     *
     * @param id the id of the situacaoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSituacao(@PathVariable Long id) {
        log.debug("REST request to delete Situacao : {}", id);
        situacaoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
