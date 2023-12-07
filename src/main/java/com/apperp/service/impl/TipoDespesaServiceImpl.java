package com.apperp.service.impl;

import com.apperp.domain.TipoDespesa;
import com.apperp.repository.TipoDespesaRepository;
import com.apperp.service.TipoDespesaService;
import com.apperp.service.dto.TipoDespesaDTO;
import com.apperp.service.mapper.TipoDespesaMapper;
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
 * Service Implementation for managing {@link com.apperp.domain.TipoDespesa}.
 */
@Service
@Transactional
public class TipoDespesaServiceImpl implements TipoDespesaService {

    private final Logger log = LoggerFactory.getLogger(TipoDespesaServiceImpl.class);

    private final TipoDespesaRepository tipoDespesaRepository;

    private final TipoDespesaMapper tipoDespesaMapper;

    public TipoDespesaServiceImpl(TipoDespesaRepository tipoDespesaRepository, TipoDespesaMapper tipoDespesaMapper) {
        this.tipoDespesaRepository = tipoDespesaRepository;
        this.tipoDespesaMapper = tipoDespesaMapper;
    }

    @Override
    public TipoDespesaDTO save(TipoDespesaDTO tipoDespesaDTO) {
        log.debug("Request to save TipoDespesa : {}", tipoDespesaDTO);
        TipoDespesa tipoDespesa = tipoDespesaMapper.toEntity(tipoDespesaDTO);
        tipoDespesa = tipoDespesaRepository.save(tipoDespesa);
        return tipoDespesaMapper.toDto(tipoDespesa);
    }

    @Override
    public TipoDespesaDTO update(TipoDespesaDTO tipoDespesaDTO) {
        log.debug("Request to update TipoDespesa : {}", tipoDespesaDTO);
        TipoDespesa tipoDespesa = tipoDespesaMapper.toEntity(tipoDespesaDTO);
        tipoDespesa = tipoDespesaRepository.save(tipoDespesa);
        return tipoDespesaMapper.toDto(tipoDespesa);
    }

    @Override
    public Optional<TipoDespesaDTO> partialUpdate(TipoDespesaDTO tipoDespesaDTO) {
        log.debug("Request to partially update TipoDespesa : {}", tipoDespesaDTO);

        return tipoDespesaRepository
            .findById(tipoDespesaDTO.getId())
            .map(existingTipoDespesa -> {
                tipoDespesaMapper.partialUpdate(existingTipoDespesa, tipoDespesaDTO);

                return existingTipoDespesa;
            })
            .map(tipoDespesaRepository::save)
            .map(tipoDespesaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TipoDespesaDTO> findAll() {
        log.debug("Request to get all TipoDespesas");
        return tipoDespesaRepository.findAll().stream().map(tipoDespesaMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    public Page<TipoDespesaDTO> findAllWithEagerRelationships(Pageable pageable) {
        return tipoDespesaRepository.findAllWithEagerRelationships(pageable).map(tipoDespesaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TipoDespesaDTO> findOne(Long id) {
        log.debug("Request to get TipoDespesa : {}", id);
        return tipoDespesaRepository.findOneWithEagerRelationships(id).map(tipoDespesaMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoDespesa : {}", id);
        tipoDespesaRepository.deleteById(id);
    }
}
