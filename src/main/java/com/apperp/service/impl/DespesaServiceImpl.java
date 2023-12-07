package com.apperp.service.impl;

import com.apperp.domain.Despesa;
import com.apperp.repository.DespesaRepository;
import com.apperp.service.DespesaService;
import com.apperp.service.dto.DespesaDTO;
import com.apperp.service.mapper.DespesaMapper;
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
 * Service Implementation for managing {@link com.apperp.domain.Despesa}.
 */
@Service
@Transactional
public class DespesaServiceImpl implements DespesaService {

    private final Logger log = LoggerFactory.getLogger(DespesaServiceImpl.class);

    private final DespesaRepository despesaRepository;

    private final DespesaMapper despesaMapper;

    public DespesaServiceImpl(DespesaRepository despesaRepository, DespesaMapper despesaMapper) {
        this.despesaRepository = despesaRepository;
        this.despesaMapper = despesaMapper;
    }

    @Override
    public DespesaDTO save(DespesaDTO despesaDTO) {
        log.debug("Request to save Despesa : {}", despesaDTO);
        Despesa despesa = despesaMapper.toEntity(despesaDTO);
        despesa = despesaRepository.save(despesa);
        return despesaMapper.toDto(despesa);
    }

    @Override
    public DespesaDTO update(DespesaDTO despesaDTO) {
        log.debug("Request to update Despesa : {}", despesaDTO);
        Despesa despesa = despesaMapper.toEntity(despesaDTO);
        despesa = despesaRepository.save(despesa);
        return despesaMapper.toDto(despesa);
    }

    @Override
    public Optional<DespesaDTO> partialUpdate(DespesaDTO despesaDTO) {
        log.debug("Request to partially update Despesa : {}", despesaDTO);

        return despesaRepository
            .findById(despesaDTO.getId())
            .map(existingDespesa -> {
                despesaMapper.partialUpdate(existingDespesa, despesaDTO);

                return existingDespesa;
            })
            .map(despesaRepository::save)
            .map(despesaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DespesaDTO> findAll() {
        log.debug("Request to get all Despesas");
        return despesaRepository.findAll().stream().map(despesaMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    public Page<DespesaDTO> findAllWithEagerRelationships(Pageable pageable) {
        return despesaRepository.findAllWithEagerRelationships(pageable).map(despesaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DespesaDTO> findOne(Long id) {
        log.debug("Request to get Despesa : {}", id);
        return despesaRepository.findOneWithEagerRelationships(id).map(despesaMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Despesa : {}", id);
        despesaRepository.deleteById(id);
    }
}
