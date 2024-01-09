package com.apperp.web.rest;

import com.apperp.repository.ItemComandaRepository;
import com.apperp.service.ComandaService;
import com.apperp.service.ItemComandaQueryService;
import com.apperp.service.ItemComandaService;
import com.apperp.service.criteria.ItemComandaCriteria;
import com.apperp.service.dto.ComandaDTO;
import com.apperp.service.dto.IRelatorio;
import com.apperp.service.dto.IRelatorioComanda;
import com.apperp.service.dto.ItemComandaDTO;
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
 * REST controller for managing {@link com.apperp.domain.ItemComanda}.
 */
@RestController
@RequestMapping("/api/item-comandas")
public class ItemComandaResource {

    private final Logger log = LoggerFactory.getLogger(ItemComandaResource.class);

    private static final String ENTITY_NAME = "itemComanda";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemComandaService itemComandaService;

    private final ComandaService comandaService;

    private final ItemComandaRepository itemComandaRepository;

    private final ItemComandaQueryService itemComandaQueryService;

    public ItemComandaResource(
        ItemComandaService itemComandaService,
        ComandaService comandaService,
        ItemComandaRepository itemComandaRepository,
        ItemComandaQueryService itemComandaQueryService
    ) {
        this.itemComandaService = itemComandaService;
        this.comandaService = comandaService;
        this.itemComandaRepository = itemComandaRepository;
        this.itemComandaQueryService = itemComandaQueryService;
    }

    /**
     * {@code POST  /item-comandas} : Create a new itemComanda.
     *
     * @param itemComandaDTO the itemComandaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemComandaDTO, or with status {@code 400 (Bad Request)} if the itemComanda has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ItemComandaDTO> createItemComanda(@RequestBody ItemComandaDTO itemComandaDTO) throws URISyntaxException {
        log.debug("REST request to save ItemComanda : {}", itemComandaDTO);
        if (itemComandaDTO.getId() != null) {
            throw new BadRequestAlertException("A new itemComanda cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemComandaDTO result = itemComandaService.save(itemComandaDTO);
        return ResponseEntity
            .created(new URI("/api/item-comandas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /item-comandas/:id} : Updates an existing itemComanda.
     *
     * @param id the id of the itemComandaDTO to save.
     * @param itemComandaDTO the itemComandaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemComandaDTO,
     * or with status {@code 400 (Bad Request)} if the itemComandaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemComandaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ItemComandaDTO> updateItemComanda(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ItemComandaDTO itemComandaDTO
    ) throws URISyntaxException {
        log.debug("REST request to update ItemComanda : {}, {}", id, itemComandaDTO);
        if (itemComandaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, itemComandaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!itemComandaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ItemComandaDTO result = itemComandaService.update(itemComandaDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemComandaDTO.getId().toString()))
            .body(result);
    }

    @PutMapping("/updateLista")
    public void updateItemComandaLista(@RequestBody List<ItemComandaDTO> itensComandaDTO) throws URISyntaxException {
        for (ItemComandaDTO item : itensComandaDTO) {
            log.debug("REST request to update ItemComanda : {}, {}", item.getId(), item);
            itemComandaService.update(item);

            SituacaoDTO situacao = new SituacaoDTO();
            situacao.setId(item.getSituacao());

            Optional<ComandaDTO> comanda = comandaService.findOne(item.getComanda().getId());
            if (comanda.isEmpty()) {
                var comandaSituacao = comanda.orElseThrow();
                if (comandaSituacao != null) {
                    comandaSituacao.setSituacao(situacao);
                    comandaService.update(comandaSituacao);
                }
            }
        }
    }

    /**
     * {@code PATCH  /item-comandas/:id} : Partial updates given fields of an existing itemComanda, field will ignore if it is null
     *
     * @param id the id of the itemComandaDTO to save.
     * @param itemComandaDTO the itemComandaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemComandaDTO,
     * or with status {@code 400 (Bad Request)} if the itemComandaDTO is not valid,
     * or with status {@code 404 (Not Found)} if the itemComandaDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the itemComandaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ItemComandaDTO> partialUpdateItemComanda(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ItemComandaDTO itemComandaDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update ItemComanda partially : {}, {}", id, itemComandaDTO);
        if (itemComandaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, itemComandaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!itemComandaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ItemComandaDTO> result = itemComandaService.partialUpdate(itemComandaDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemComandaDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /item-comandas} : get all the itemComandas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemComandas in body.
     */
    @GetMapping("")
    public ResponseEntity<List<ItemComandaDTO>> getAllItemComandas(ItemComandaCriteria criteria) {
        log.debug("REST request to get ItemComandas by criteria: {}", criteria);

        List<ItemComandaDTO> entityList = itemComandaQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /item-comandas/count} : count all the itemComandas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countItemComandas(ItemComandaCriteria criteria) {
        log.debug("REST request to count ItemComandas by criteria: {}", criteria);
        return ResponseEntity.ok().body(itemComandaQueryService.countByCriteria(criteria));
    }

    @GetMapping("/relatorio/{dataInicio}/{dataFim}")
    public ResponseEntity<List<IRelatorio>> listaRelatorioPorDia(@PathVariable String dataInicio, @PathVariable String dataFim) {
        return ResponseEntity.ok().body(itemComandaQueryService.listaRelatorioPorDia(dataInicio, dataFim));
    }

    @GetMapping("/relatorio-comanda/{dataInicio}/{dataFim}")
    public ResponseEntity<List<IRelatorioComanda>> listaRelatorioComandaPorDia(
        @PathVariable String dataInicio,
        @PathVariable String dataFim
    ) {
        return ResponseEntity.ok().body(itemComandaQueryService.listaRelatorioComandaPorDia(dataInicio, dataFim));
    }

    /**
     * {@code GET  /item-comandas/:id} : get the "id" itemComanda.
     *
     * @param id the id of the itemComandaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemComandaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ItemComandaDTO> getItemComanda(@PathVariable Long id) {
        log.debug("REST request to get ItemComanda : {}", id);
        Optional<ItemComandaDTO> itemComandaDTO = itemComandaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(itemComandaDTO);
    }

    /**
     * {@code DELETE  /item-comandas/:id} : delete the "id" itemComanda.
     *
     * @param id the id of the itemComandaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItemComanda(@PathVariable Long id) {
        log.debug("REST request to delete ItemComanda : {}", id);
        itemComandaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
