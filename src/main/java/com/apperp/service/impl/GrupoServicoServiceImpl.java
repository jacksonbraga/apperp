package com.apperp.service.impl;

import com.apperp.domain.GrupoServico;
import com.apperp.repository.GrupoServicoRepository;
import com.apperp.service.GrupoServicoService;
import com.apperp.service.dto.GrupoServicoDTO;
import com.apperp.service.mapper.GrupoServicoMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.apperp.domain.GrupoServico}.
 */
@Service
@Transactional
public class GrupoServicoServiceImpl implements GrupoServicoService {

    private final Logger log = LoggerFactory.getLogger(GrupoServicoServiceImpl.class);

    private final GrupoServicoRepository grupoServicoRepository;

    private final GrupoServicoMapper grupoServicoMapper;

    public GrupoServicoServiceImpl(GrupoServicoRepository grupoServicoRepository, GrupoServicoMapper grupoServicoMapper) {
        this.grupoServicoRepository = grupoServicoRepository;
        this.grupoServicoMapper = grupoServicoMapper;
    }

    @Override
    public GrupoServicoDTO save(GrupoServicoDTO grupoServicoDTO) {
        log.debug("Request to save GrupoServico : {}", grupoServicoDTO);
        GrupoServico grupoServico = grupoServicoMapper.toEntity(grupoServicoDTO);
        grupoServico = grupoServicoRepository.save(grupoServico);
        return grupoServicoMapper.toDto(grupoServico);
    }

    @Override
    public GrupoServicoDTO update(GrupoServicoDTO grupoServicoDTO) {
        log.debug("Request to update GrupoServico : {}", grupoServicoDTO);
        GrupoServico grupoServico = grupoServicoMapper.toEntity(grupoServicoDTO);
        grupoServico = grupoServicoRepository.save(grupoServico);
        return grupoServicoMapper.toDto(grupoServico);
    }

    @Override
    public Optional<GrupoServicoDTO> partialUpdate(GrupoServicoDTO grupoServicoDTO) {
        log.debug("Request to partially update GrupoServico : {}", grupoServicoDTO);

        return grupoServicoRepository
            .findById(grupoServicoDTO.getId())
            .map(existingGrupoServico -> {
                grupoServicoMapper.partialUpdate(existingGrupoServico, grupoServicoDTO);

                return existingGrupoServico;
            })
            .map(grupoServicoRepository::save)
            .map(grupoServicoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<GrupoServicoDTO> findAll() {
        log.debug("Request to get all GrupoServicos");
        return grupoServicoRepository.findAll().stream().map(grupoServicoMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<GrupoServicoDTO> findOne(Long id) {
        log.debug("Request to get GrupoServico : {}", id);
        return grupoServicoRepository.findById(id).map(grupoServicoMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete GrupoServico : {}", id);
        grupoServicoRepository.deleteById(id);
    }
}
