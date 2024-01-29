package com.apperp.service.impl;

import com.apperp.domain.TipoOrigem;
import com.apperp.repository.TipoOrigemRepository;
import com.apperp.service.TipoOrigemService;
import com.apperp.service.dto.TipoOrigemDTO;
import com.apperp.service.mapper.TipoOrigemMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.apperp.domain.TipoOrigem}.
 */
@Service
@Transactional
public class TipoOrigemServiceImpl implements TipoOrigemService {

    private final Logger log = LoggerFactory.getLogger(TipoOrigemServiceImpl.class);

    private final TipoOrigemRepository tipoOrigemRepository;

    private final TipoOrigemMapper tipoOrigemMapper;

    public TipoOrigemServiceImpl(TipoOrigemRepository tipoOrigemRepository, TipoOrigemMapper tipoOrigemMapper) {
        this.tipoOrigemRepository = tipoOrigemRepository;
        this.tipoOrigemMapper = tipoOrigemMapper;
    }

    @Override
    public TipoOrigemDTO save(TipoOrigemDTO tipoOrigemDTO) {
        log.debug("Request to save TipoOrigem : {}", tipoOrigemDTO);
        TipoOrigem tipoOrigem = tipoOrigemMapper.toEntity(tipoOrigemDTO);
        tipoOrigem = tipoOrigemRepository.save(tipoOrigem);
        return tipoOrigemMapper.toDto(tipoOrigem);
    }

    @Override
    public TipoOrigemDTO update(TipoOrigemDTO tipoOrigemDTO) {
        log.debug("Request to update TipoOrigem : {}", tipoOrigemDTO);
        TipoOrigem tipoOrigem = tipoOrigemMapper.toEntity(tipoOrigemDTO);
        tipoOrigem = tipoOrigemRepository.save(tipoOrigem);
        return tipoOrigemMapper.toDto(tipoOrigem);
    }

    @Override
    public Optional<TipoOrigemDTO> partialUpdate(TipoOrigemDTO tipoOrigemDTO) {
        log.debug("Request to partially update TipoOrigem : {}", tipoOrigemDTO);

        return tipoOrigemRepository
            .findById(tipoOrigemDTO.getId())
            .map(existingTipoOrigem -> {
                tipoOrigemMapper.partialUpdate(existingTipoOrigem, tipoOrigemDTO);

                return existingTipoOrigem;
            })
            .map(tipoOrigemRepository::save)
            .map(tipoOrigemMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TipoOrigemDTO> findAll() {
        log.debug("Request to get all TipoOrigems");
        return tipoOrigemRepository.findAll().stream().map(tipoOrigemMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    public Page<TipoOrigemDTO> findAllWithEagerRelationships(Pageable pageable) {
        return tipoOrigemRepository.findAllWithEagerRelationships(pageable).map(tipoOrigemMapper::toDto);
    }

    /**
     *  Get all the tipoOrigems where Caixa is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<TipoOrigemDTO> findAllWhereCaixaIsNull() {
        log.debug("Request to get all tipoOrigems where Caixa is null");
        return StreamSupport
            .stream(tipoOrigemRepository.findAll().spliterator(), false)
            //.filter(tipoOrigem -> tipoOrigem.getCaixa() == null)
            .map(tipoOrigemMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TipoOrigemDTO> findOne(Long id) {
        log.debug("Request to get TipoOrigem : {}", id);
        return tipoOrigemRepository.findOneWithEagerRelationships(id).map(tipoOrigemMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoOrigem : {}", id);
        tipoOrigemRepository.deleteById(id);
    }
}
