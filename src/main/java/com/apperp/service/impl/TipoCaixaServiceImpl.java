package com.apperp.service.impl;

import com.apperp.domain.TipoCaixa;
import com.apperp.repository.TipoCaixaRepository;
import com.apperp.service.TipoCaixaService;
import com.apperp.service.dto.TipoCaixaDTO;
import com.apperp.service.mapper.TipoCaixaMapper;
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
 * Service Implementation for managing {@link com.apperp.domain.TipoCaixa}.
 */
@Service
@Transactional
public class TipoCaixaServiceImpl implements TipoCaixaService {

    private final Logger log = LoggerFactory.getLogger(TipoCaixaServiceImpl.class);

    private final TipoCaixaRepository tipoCaixaRepository;

    private final TipoCaixaMapper tipoCaixaMapper;

    public TipoCaixaServiceImpl(TipoCaixaRepository tipoCaixaRepository, TipoCaixaMapper tipoCaixaMapper) {
        this.tipoCaixaRepository = tipoCaixaRepository;
        this.tipoCaixaMapper = tipoCaixaMapper;
    }

    @Override
    public TipoCaixaDTO save(TipoCaixaDTO tipoCaixaDTO) {
        log.debug("Request to save TipoCaixa : {}", tipoCaixaDTO);
        TipoCaixa tipoCaixa = tipoCaixaMapper.toEntity(tipoCaixaDTO);
        tipoCaixa = tipoCaixaRepository.save(tipoCaixa);
        return tipoCaixaMapper.toDto(tipoCaixa);
    }

    @Override
    public TipoCaixaDTO update(TipoCaixaDTO tipoCaixaDTO) {
        log.debug("Request to update TipoCaixa : {}", tipoCaixaDTO);
        TipoCaixa tipoCaixa = tipoCaixaMapper.toEntity(tipoCaixaDTO);
        tipoCaixa = tipoCaixaRepository.save(tipoCaixa);
        return tipoCaixaMapper.toDto(tipoCaixa);
    }

    @Override
    public Optional<TipoCaixaDTO> partialUpdate(TipoCaixaDTO tipoCaixaDTO) {
        log.debug("Request to partially update TipoCaixa : {}", tipoCaixaDTO);

        return tipoCaixaRepository
            .findById(tipoCaixaDTO.getId())
            .map(existingTipoCaixa -> {
                tipoCaixaMapper.partialUpdate(existingTipoCaixa, tipoCaixaDTO);

                return existingTipoCaixa;
            })
            .map(tipoCaixaRepository::save)
            .map(tipoCaixaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TipoCaixaDTO> findAll() {
        log.debug("Request to get all TipoCaixas");
        return tipoCaixaRepository.findAll().stream().map(tipoCaixaMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    public Page<TipoCaixaDTO> findAllWithEagerRelationships(Pageable pageable) {
        return tipoCaixaRepository.findAllWithEagerRelationships(pageable).map(tipoCaixaMapper::toDto);
    }

    /**
     *  Get all the tipoCaixas where Caixa is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<TipoCaixaDTO> findAllWhereCaixaIsNull() {
        log.debug("Request to get all tipoCaixas where Caixa is null");
        return StreamSupport
            .stream(tipoCaixaRepository.findAll().spliterator(), false)
            //.filter(tipoCaixa -> tipoCaixa.getCaixa() == null)
            .map(tipoCaixaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TipoCaixaDTO> findOne(Long id) {
        log.debug("Request to get TipoCaixa : {}", id);
        return tipoCaixaRepository.findOneWithEagerRelationships(id).map(tipoCaixaMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoCaixa : {}", id);
        tipoCaixaRepository.deleteById(id);
    }
}
