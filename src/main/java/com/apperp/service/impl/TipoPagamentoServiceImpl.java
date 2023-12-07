package com.apperp.service.impl;

import com.apperp.domain.TipoPagamento;
import com.apperp.repository.TipoPagamentoRepository;
import com.apperp.service.TipoPagamentoService;
import com.apperp.service.dto.TipoPagamentoDTO;
import com.apperp.service.mapper.TipoPagamentoMapper;
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
 * Service Implementation for managing {@link com.apperp.domain.TipoPagamento}.
 */
@Service
@Transactional
public class TipoPagamentoServiceImpl implements TipoPagamentoService {

    private final Logger log = LoggerFactory.getLogger(TipoPagamentoServiceImpl.class);

    private final TipoPagamentoRepository tipoPagamentoRepository;

    private final TipoPagamentoMapper tipoPagamentoMapper;

    public TipoPagamentoServiceImpl(TipoPagamentoRepository tipoPagamentoRepository, TipoPagamentoMapper tipoPagamentoMapper) {
        this.tipoPagamentoRepository = tipoPagamentoRepository;
        this.tipoPagamentoMapper = tipoPagamentoMapper;
    }

    @Override
    public TipoPagamentoDTO save(TipoPagamentoDTO tipoPagamentoDTO) {
        log.debug("Request to save TipoPagamento : {}", tipoPagamentoDTO);
        TipoPagamento tipoPagamento = tipoPagamentoMapper.toEntity(tipoPagamentoDTO);
        tipoPagamento = tipoPagamentoRepository.save(tipoPagamento);
        return tipoPagamentoMapper.toDto(tipoPagamento);
    }

    @Override
    public TipoPagamentoDTO update(TipoPagamentoDTO tipoPagamentoDTO) {
        log.debug("Request to update TipoPagamento : {}", tipoPagamentoDTO);
        TipoPagamento tipoPagamento = tipoPagamentoMapper.toEntity(tipoPagamentoDTO);
        tipoPagamento = tipoPagamentoRepository.save(tipoPagamento);
        return tipoPagamentoMapper.toDto(tipoPagamento);
    }

    @Override
    public Optional<TipoPagamentoDTO> partialUpdate(TipoPagamentoDTO tipoPagamentoDTO) {
        log.debug("Request to partially update TipoPagamento : {}", tipoPagamentoDTO);

        return tipoPagamentoRepository
            .findById(tipoPagamentoDTO.getId())
            .map(existingTipoPagamento -> {
                tipoPagamentoMapper.partialUpdate(existingTipoPagamento, tipoPagamentoDTO);

                return existingTipoPagamento;
            })
            .map(tipoPagamentoRepository::save)
            .map(tipoPagamentoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TipoPagamentoDTO> findAll() {
        log.debug("Request to get all TipoPagamentos");
        return tipoPagamentoRepository.findAll().stream().map(tipoPagamentoMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    public Page<TipoPagamentoDTO> findAllWithEagerRelationships(Pageable pageable) {
        return tipoPagamentoRepository.findAllWithEagerRelationships(pageable).map(tipoPagamentoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TipoPagamentoDTO> findOne(Long id) {
        log.debug("Request to get TipoPagamento : {}", id);
        return tipoPagamentoRepository.findOneWithEagerRelationships(id).map(tipoPagamentoMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoPagamento : {}", id);
        tipoPagamentoRepository.deleteById(id);
    }
}
