package com.apperp.web.rest;

import com.apperp.repository.ControleComandaRepository;
import com.apperp.service.ComandaService;
import com.apperp.service.ControleComandaQueryService;
import com.apperp.service.ControleComandaService;
import com.apperp.service.ItemComandaService;
import com.apperp.service.criteria.ControleComandaCriteria;
import com.apperp.service.dto.ControleComandaDTO;
import com.apperp.service.dto.PreviaFechamentoDTO;
import com.apperp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.apperp.domain.ControleComanda}.
 */
@RestController
@RequestMapping("/api/controle-comandas")
public class ControleComandaResource {

    private final Logger log = LoggerFactory.getLogger(ControleComandaResource.class);

    private static final String ENTITY_NAME = "controleComanda";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemComandaService itemComandaService;

    private final ComandaService comandaService;

    private final ControleComandaService controleComandaService;

    private final ControleComandaRepository controleComandaRepository;

    private final ControleComandaQueryService controleComandaQueryService;

    public ControleComandaResource(
        ComandaService comandaService,
        ItemComandaService itemComandaService,
        ControleComandaService controleComandaService,
        ControleComandaRepository controleComandaRepository,
        ControleComandaQueryService controleComandaQueryService
    ) {
        this.controleComandaService = controleComandaService;
        this.comandaService = comandaService;
        this.itemComandaService = itemComandaService;
        this.controleComandaRepository = controleComandaRepository;
        this.controleComandaQueryService = controleComandaQueryService;
    }

    /**
     * {@code POST  /controle-comandas} : Create a new controleComanda.
     *
     * @param controleComandaDTO the controleComandaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new controleComandaDTO, or with status {@code 400 (Bad Request)} if the controleComanda has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ControleComandaDTO> createControleComanda(@RequestBody ControleComandaDTO controleComandaDTO)
        throws URISyntaxException {
        log.debug("REST request to save ControleComanda : {}", controleComandaDTO);
        if (controleComandaDTO.getId() != null) {
            throw new BadRequestAlertException("A new controleComanda cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ControleComandaDTO result = controleComandaService.save(controleComandaDTO);
        return ResponseEntity
            .created(new URI("/api/controle-comandas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /controle-comandas/:id} : Updates an existing controleComanda.
     *
     * @param id the id of the controleComandaDTO to save.
     * @param controleComandaDTO the controleComandaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated controleComandaDTO,
     * or with status {@code 400 (Bad Request)} if the controleComandaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the controleComandaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ControleComandaDTO> updateControleComanda(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ControleComandaDTO controleComandaDTO
    ) throws URISyntaxException {
        log.debug("REST request to update ControleComanda : {}, {}", id, controleComandaDTO);
        if (controleComandaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, controleComandaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!controleComandaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ControleComandaDTO result = controleComandaService.update(controleComandaDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, controleComandaDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /controle-comandas/:id} : Partial updates given fields of an existing controleComanda, field will ignore if it is null
     *
     * @param id the id of the controleComandaDTO to save.
     * @param controleComandaDTO the controleComandaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated controleComandaDTO,
     * or with status {@code 400 (Bad Request)} if the controleComandaDTO is not valid,
     * or with status {@code 404 (Not Found)} if the controleComandaDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the controleComandaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ControleComandaDTO> partialUpdateControleComanda(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ControleComandaDTO controleComandaDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update ControleComanda partially : {}, {}", id, controleComandaDTO);
        if (controleComandaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, controleComandaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!controleComandaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ControleComandaDTO> result = controleComandaService.partialUpdate(controleComandaDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, controleComandaDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /controle-comandas} : get all the controleComandas.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of controleComandas in body.
     */
    @GetMapping("")
    public ResponseEntity<List<ControleComandaDTO>> getAllControleComandas(
        ControleComandaCriteria criteria,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get ControleComandas by criteria: {}", criteria);

        Page<ControleComandaDTO> page = controleComandaQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /controle-comandas/count} : count all the controleComandas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countControleComandas(ControleComandaCriteria criteria) {
        log.debug("REST request to count ControleComandas by criteria: {}", criteria);
        return ResponseEntity.ok().body(controleComandaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /controle-comandas/:id} : get the "id" controleComanda.
     *
     * @param id the id of the controleComandaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the controleComandaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ControleComandaDTO> getControleComanda(@PathVariable Long id) {
        log.debug("REST request to get ControleComanda : {}", id);
        Optional<ControleComandaDTO> controleComandaDTO = controleComandaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(controleComandaDTO);
    }

    /**
     * {@code DELETE  /controle-comandas/:id} : delete the "id" controleComanda.
     *
     * @param id the id of the controleComandaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteControleComanda(@PathVariable Long id) {
        log.debug("REST request to delete ControleComanda : {}", id);

        controleComandaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    /**
     * {@code GET  /controle-comandas/previa-fechamento:id} : get the "id" controleComanda.
     *
     * @param id the id of the controleComandaDTO to previa-fechamento.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the previaFechamentoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/previa-fechamento/{id}")
    public ResponseEntity<List<PreviaFechamentoDTO>> getPreviaFechamento(@PathVariable Long id) {
        log.info("REST request to get PreviaFechamento : {}", id);
        List<PreviaFechamentoDTO> lista = controleComandaService.previaFechamento(id);
        return ResponseEntity.ok().body(lista);
    }

    @GetMapping("/atualiza-previa-fechamento/{id}")
    public void atualizaPreviaFechamento(@PathVariable Long id) {
        log.debug("REST request to get PreviaFechamento : {}", id);
        controleComandaService.atualizaPreviaFechamento(id);
        //return ResponseEntity.ok().body(lista);
    }
}
