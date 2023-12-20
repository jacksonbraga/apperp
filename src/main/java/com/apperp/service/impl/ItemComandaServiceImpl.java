package com.apperp.service.impl;

import com.apperp.domain.ItemComanda;
import com.apperp.repository.ItemComandaRepository;
import com.apperp.service.ItemComandaService;
import com.apperp.service.dto.ItemComandaDTO;
import com.apperp.service.mapper.ItemComandaMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.apperp.domain.ItemComanda}.
 */
@Service
@Transactional
public class ItemComandaServiceImpl implements ItemComandaService {

    private final Logger log = LoggerFactory.getLogger(ItemComandaServiceImpl.class);

    private final ItemComandaRepository itemComandaRepository;

    private final ItemComandaMapper itemComandaMapper;

    public ItemComandaServiceImpl(ItemComandaRepository itemComandaRepository, ItemComandaMapper itemComandaMapper) {
        this.itemComandaRepository = itemComandaRepository;
        this.itemComandaMapper = itemComandaMapper;
    }

    @Override
    public ItemComandaDTO save(ItemComandaDTO itemComandaDTO) {
        log.debug("Request to save ItemComanda : {}", itemComandaDTO);
        ItemComanda itemComanda = itemComandaMapper.toEntity(itemComandaDTO);
        itemComanda = itemComandaRepository.save(itemComanda);
        return itemComandaMapper.toDto(itemComanda);
    }

    @Override
    public ItemComandaDTO update(ItemComandaDTO itemComandaDTO) {
        log.debug("Request to update ItemComanda : {}", itemComandaDTO);
        ItemComanda itemComanda = itemComandaMapper.toEntity(itemComandaDTO);
        itemComanda = itemComandaRepository.save(itemComanda);
        return itemComandaMapper.toDto(itemComanda);
    }

    @Override
    public Optional<ItemComandaDTO> partialUpdate(ItemComandaDTO itemComandaDTO) {
        log.debug("Request to partially update ItemComanda : {}", itemComandaDTO);

        return itemComandaRepository
            .findById(itemComandaDTO.getId())
            .map(existingItemComanda -> {
                itemComandaMapper.partialUpdate(existingItemComanda, itemComandaDTO);

                return existingItemComanda;
            })
            .map(itemComandaRepository::save)
            .map(itemComandaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ItemComandaDTO> findAll() {
        log.debug("Request to get all ItemComandas");
        return itemComandaRepository.findAll().stream().map(itemComandaMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    public Page<ItemComandaDTO> findAllWithEagerRelationships(Pageable pageable) {
        Page<ItemComandaDTO> lista = itemComandaRepository.findAllWithEagerRelationships(pageable).map(itemComandaMapper::toDto);
        return itemComandaRepository.findAllWithEagerRelationships(pageable).map(itemComandaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ItemComandaDTO> findOne(Long id) {
        log.debug("Request to get ItemComanda : {}", id);

        return itemComandaRepository.findOneWithEagerRelationships(id).map(itemComandaMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ItemComanda : {}", id);
        itemComandaRepository.deleteById(id);
    }
}
