package com.apperp.web.rest;

import com.apperp.repository.GrupoServicoRepository;
import com.apperp.service.GrupoServicoQueryService;
import com.apperp.service.GrupoServicoService;
import com.apperp.service.criteria.GrupoServicoCriteria;
import com.apperp.service.dto.GrupoServicoDTO;
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
 * REST controller for managing {@link com.apperp.domain.GrupoServico}.
 */
@RestController
@RequestMapping("/api/grupo-servicos")
public class GrupoServicoResource {

    private final Logger log = LoggerFactory.getLogger(GrupoServicoResource.class);

    private static final String ENTITY_NAME = "grupoServico";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GrupoServicoService grupoServicoService;

    private final GrupoServicoRepository grupoServicoRepository;

    private final GrupoServicoQueryService grupoServicoQueryService;

    public GrupoServicoResource(
        GrupoServicoService grupoServicoService,
        GrupoServicoRepository grupoServicoRepository,
        GrupoServicoQueryService grupoServicoQueryService
    ) {
        this.grupoServicoService = grupoServicoService;
        this.grupoServicoRepository = grupoServicoRepository;
        this.grupoServicoQueryService = grupoServicoQueryService;
    }

    /**
     * {@code POST  /grupo-servicos} : Create a new grupoServico.
     *
     * @param grupoServicoDTO the grupoServicoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new grupoServicoDTO, or with status {@code 400 (Bad Request)} if the grupoServico has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<GrupoServicoDTO> createGrupoServico(@RequestBody GrupoServicoDTO grupoServicoDTO) throws URISyntaxException {
        log.debug("REST request to save GrupoServico : {}", grupoServicoDTO);
        if (grupoServicoDTO.getId() != null) {
            throw new BadRequestAlertException("A new grupoServico cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GrupoServicoDTO result = grupoServicoService.save(grupoServicoDTO);
        return ResponseEntity
            .created(new URI("/api/grupo-servicos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /grupo-servicos/:id} : Updates an existing grupoServico.
     *
     * @param id the id of the grupoServicoDTO to save.
     * @param grupoServicoDTO the grupoServicoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated grupoServicoDTO,
     * or with status {@code 400 (Bad Request)} if the grupoServicoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the grupoServicoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<GrupoServicoDTO> updateGrupoServico(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody GrupoServicoDTO grupoServicoDTO
    ) throws URISyntaxException {
        log.debug("REST request to update GrupoServico : {}, {}", id, grupoServicoDTO);
        if (grupoServicoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, grupoServicoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!grupoServicoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        GrupoServicoDTO result = grupoServicoService.update(grupoServicoDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, grupoServicoDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /grupo-servicos/:id} : Partial updates given fields of an existing grupoServico, field will ignore if it is null
     *
     * @param id the id of the grupoServicoDTO to save.
     * @param grupoServicoDTO the grupoServicoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated grupoServicoDTO,
     * or with status {@code 400 (Bad Request)} if the grupoServicoDTO is not valid,
     * or with status {@code 404 (Not Found)} if the grupoServicoDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the grupoServicoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<GrupoServicoDTO> partialUpdateGrupoServico(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody GrupoServicoDTO grupoServicoDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update GrupoServico partially : {}, {}", id, grupoServicoDTO);
        if (grupoServicoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, grupoServicoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!grupoServicoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<GrupoServicoDTO> result = grupoServicoService.partialUpdate(grupoServicoDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, grupoServicoDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /grupo-servicos} : get all the grupoServicos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of grupoServicos in body.
     */
    @GetMapping("")
    public ResponseEntity<List<GrupoServicoDTO>> getAllGrupoServicos(GrupoServicoCriteria criteria) {
        log.debug("REST request to get GrupoServicos by criteria: {}", criteria);

        List<GrupoServicoDTO> entityList = grupoServicoQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /grupo-servicos/count} : count all the grupoServicos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countGrupoServicos(GrupoServicoCriteria criteria) {
        log.debug("REST request to count GrupoServicos by criteria: {}", criteria);
        return ResponseEntity.ok().body(grupoServicoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /grupo-servicos/:id} : get the "id" grupoServico.
     *
     * @param id the id of the grupoServicoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the grupoServicoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<GrupoServicoDTO> getGrupoServico(@PathVariable Long id) {
        log.debug("REST request to get GrupoServico : {}", id);
        Optional<GrupoServicoDTO> grupoServicoDTO = grupoServicoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(grupoServicoDTO);
    }

    /**
     * {@code DELETE  /grupo-servicos/:id} : delete the "id" grupoServico.
     *
     * @param id the id of the grupoServicoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrupoServico(@PathVariable Long id) {
        log.debug("REST request to delete GrupoServico : {}", id);
        grupoServicoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
