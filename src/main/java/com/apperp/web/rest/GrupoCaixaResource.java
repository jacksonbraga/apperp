package com.apperp.web.rest;

import com.apperp.repository.GrupoCaixaRepository;
import com.apperp.service.GrupoCaixaService;
import com.apperp.service.dto.GrupoCaixaDTO;
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
 * REST controller for managing {@link com.apperp.domain.GrupoCaixa}.
 */
@RestController
@RequestMapping("/api/grupo-caixas")
public class GrupoCaixaResource {

    private final Logger log = LoggerFactory.getLogger(GrupoCaixaResource.class);

    private static final String ENTITY_NAME = "grupoCaixa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GrupoCaixaService grupoCaixaService;

    private final GrupoCaixaRepository grupoCaixaRepository;

    public GrupoCaixaResource(GrupoCaixaService grupoCaixaService, GrupoCaixaRepository grupoCaixaRepository) {
        this.grupoCaixaService = grupoCaixaService;
        this.grupoCaixaRepository = grupoCaixaRepository;
    }

    /**
     * {@code POST  /grupo-caixas} : Create a new grupoCaixa.
     *
     * @param grupoCaixaDTO the grupoCaixaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new grupoCaixaDTO, or with status {@code 400 (Bad Request)} if the grupoCaixa has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<GrupoCaixaDTO> createGrupoCaixa(@RequestBody GrupoCaixaDTO grupoCaixaDTO) throws URISyntaxException {
        log.debug("REST request to save GrupoCaixa : {}", grupoCaixaDTO);
        if (grupoCaixaDTO.getId() != null) {
            throw new BadRequestAlertException("A new grupoCaixa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GrupoCaixaDTO result = grupoCaixaService.save(grupoCaixaDTO);
        return ResponseEntity
            .created(new URI("/api/grupo-caixas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /grupo-caixas/:id} : Updates an existing grupoCaixa.
     *
     * @param id the id of the grupoCaixaDTO to save.
     * @param grupoCaixaDTO the grupoCaixaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated grupoCaixaDTO,
     * or with status {@code 400 (Bad Request)} if the grupoCaixaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the grupoCaixaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<GrupoCaixaDTO> updateGrupoCaixa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody GrupoCaixaDTO grupoCaixaDTO
    ) throws URISyntaxException {
        log.debug("REST request to update GrupoCaixa : {}, {}", id, grupoCaixaDTO);
        if (grupoCaixaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, grupoCaixaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!grupoCaixaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        GrupoCaixaDTO result = grupoCaixaService.update(grupoCaixaDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, grupoCaixaDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /grupo-caixas/:id} : Partial updates given fields of an existing grupoCaixa, field will ignore if it is null
     *
     * @param id the id of the grupoCaixaDTO to save.
     * @param grupoCaixaDTO the grupoCaixaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated grupoCaixaDTO,
     * or with status {@code 400 (Bad Request)} if the grupoCaixaDTO is not valid,
     * or with status {@code 404 (Not Found)} if the grupoCaixaDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the grupoCaixaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<GrupoCaixaDTO> partialUpdateGrupoCaixa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody GrupoCaixaDTO grupoCaixaDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update GrupoCaixa partially : {}, {}", id, grupoCaixaDTO);
        if (grupoCaixaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, grupoCaixaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!grupoCaixaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<GrupoCaixaDTO> result = grupoCaixaService.partialUpdate(grupoCaixaDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, grupoCaixaDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /grupo-caixas} : get all the grupoCaixas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of grupoCaixas in body.
     */
    @GetMapping("")
    public List<GrupoCaixaDTO> getAllGrupoCaixas() {
        log.debug("REST request to get all GrupoCaixas");
        return grupoCaixaService.findAll();
    }

    /**
     * {@code GET  /grupo-caixas/:id} : get the "id" grupoCaixa.
     *
     * @param id the id of the grupoCaixaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the grupoCaixaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<GrupoCaixaDTO> getGrupoCaixa(@PathVariable Long id) {
        log.debug("REST request to get GrupoCaixa : {}", id);
        Optional<GrupoCaixaDTO> grupoCaixaDTO = grupoCaixaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(grupoCaixaDTO);
    }

    /**
     * {@code DELETE  /grupo-caixas/:id} : delete the "id" grupoCaixa.
     *
     * @param id the id of the grupoCaixaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrupoCaixa(@PathVariable Long id) {
        log.debug("REST request to delete GrupoCaixa : {}", id);
        grupoCaixaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
