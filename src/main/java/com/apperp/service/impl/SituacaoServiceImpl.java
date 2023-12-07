package com.apperp.service.impl;

import com.apperp.domain.Situacao;
import com.apperp.repository.SituacaoRepository;
import com.apperp.service.SituacaoService;
import com.apperp.service.dto.SituacaoDTO;
import com.apperp.service.mapper.SituacaoMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.apperp.domain.Situacao}.
 */
@Service
@Transactional
public class SituacaoServiceImpl implements SituacaoService {

    private final Logger log = LoggerFactory.getLogger(SituacaoServiceImpl.class);

    private final SituacaoRepository situacaoRepository;

    private final SituacaoMapper situacaoMapper;

    public SituacaoServiceImpl(SituacaoRepository situacaoRepository, SituacaoMapper situacaoMapper) {
        this.situacaoRepository = situacaoRepository;
        this.situacaoMapper = situacaoMapper;
    }

    @Override
    public SituacaoDTO save(SituacaoDTO situacaoDTO) {
        log.debug("Request to save Situacao : {}", situacaoDTO);
        Situacao situacao = situacaoMapper.toEntity(situacaoDTO);
        situacao = situacaoRepository.save(situacao);
        return situacaoMapper.toDto(situacao);
    }

    @Override
    public SituacaoDTO update(SituacaoDTO situacaoDTO) {
        log.debug("Request to update Situacao : {}", situacaoDTO);
        Situacao situacao = situacaoMapper.toEntity(situacaoDTO);
        situacao = situacaoRepository.save(situacao);
        return situacaoMapper.toDto(situacao);
    }

    @Override
    public Optional<SituacaoDTO> partialUpdate(SituacaoDTO situacaoDTO) {
        log.debug("Request to partially update Situacao : {}", situacaoDTO);

        return situacaoRepository
            .findById(situacaoDTO.getId())
            .map(existingSituacao -> {
                situacaoMapper.partialUpdate(existingSituacao, situacaoDTO);

                return existingSituacao;
            })
            .map(situacaoRepository::save)
            .map(situacaoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SituacaoDTO> findAll() {
        log.debug("Request to get all Situacaos");
        return situacaoRepository.findAll().stream().map(situacaoMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<SituacaoDTO> findOne(Long id) {
        log.debug("Request to get Situacao : {}", id);
        return situacaoRepository.findById(id).map(situacaoMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Situacao : {}", id);
        situacaoRepository.deleteById(id);
    }
}
