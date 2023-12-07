package com.apperp.service.impl;

import com.apperp.domain.TipoServico;
import com.apperp.repository.TipoServicoRepository;
import com.apperp.service.TipoServicoService;
import com.apperp.service.dto.TipoServicoDTO;
import com.apperp.service.mapper.TipoServicoMapper;
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
 * Service Implementation for managing {@link com.apperp.domain.TipoServico}.
 */
@Service
@Transactional
public class TipoServicoServiceImpl implements TipoServicoService {

    private final Logger log = LoggerFactory.getLogger(TipoServicoServiceImpl.class);

    private final TipoServicoRepository tipoServicoRepository;

    private final TipoServicoMapper tipoServicoMapper;

    public TipoServicoServiceImpl(TipoServicoRepository tipoServicoRepository, TipoServicoMapper tipoServicoMapper) {
        this.tipoServicoRepository = tipoServicoRepository;
        this.tipoServicoMapper = tipoServicoMapper;
    }

    @Override
    public TipoServicoDTO save(TipoServicoDTO tipoServicoDTO) {
        log.debug("Request to save TipoServico : {}", tipoServicoDTO);
        TipoServico tipoServico = tipoServicoMapper.toEntity(tipoServicoDTO);
        tipoServico = tipoServicoRepository.save(tipoServico);
        return tipoServicoMapper.toDto(tipoServico);
    }

    @Override
    public TipoServicoDTO update(TipoServicoDTO tipoServicoDTO) {
        log.debug("Request to update TipoServico : {}", tipoServicoDTO);
        TipoServico tipoServico = tipoServicoMapper.toEntity(tipoServicoDTO);
        tipoServico = tipoServicoRepository.save(tipoServico);
        return tipoServicoMapper.toDto(tipoServico);
    }

    @Override
    public Optional<TipoServicoDTO> partialUpdate(TipoServicoDTO tipoServicoDTO) {
        log.debug("Request to partially update TipoServico : {}", tipoServicoDTO);

        return tipoServicoRepository
            .findById(tipoServicoDTO.getId())
            .map(existingTipoServico -> {
                tipoServicoMapper.partialUpdate(existingTipoServico, tipoServicoDTO);

                return existingTipoServico;
            })
            .map(tipoServicoRepository::save)
            .map(tipoServicoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TipoServicoDTO> findAll() {
        log.debug("Request to get all TipoServicos");
        return tipoServicoRepository.findAll().stream().map(tipoServicoMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    public Page<TipoServicoDTO> findAllWithEagerRelationships(Pageable pageable) {
        return tipoServicoRepository.findAllWithEagerRelationships(pageable).map(tipoServicoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TipoServicoDTO> findOne(Long id) {
        log.debug("Request to get TipoServico : {}", id);
        return tipoServicoRepository.findOneWithEagerRelationships(id).map(tipoServicoMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoServico : {}", id);
        tipoServicoRepository.deleteById(id);
    }
}
