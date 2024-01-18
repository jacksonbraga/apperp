package com.apperp.service.impl;

import com.apperp.domain.GrupoOrigem;
import com.apperp.repository.GrupoOrigemRepository;
import com.apperp.service.GrupoOrigemService;
import com.apperp.service.dto.GrupoOrigemDTO;
import com.apperp.service.mapper.GrupoOrigemMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.apperp.domain.GrupoOrigem}.
 */
@Service
@Transactional
public class GrupoOrigemServiceImpl implements GrupoOrigemService {

    private final Logger log = LoggerFactory.getLogger(GrupoOrigemServiceImpl.class);

    private final GrupoOrigemRepository grupoOrigemRepository;

    private final GrupoOrigemMapper grupoOrigemMapper;

    public GrupoOrigemServiceImpl(GrupoOrigemRepository grupoOrigemRepository, GrupoOrigemMapper grupoOrigemMapper) {
        this.grupoOrigemRepository = grupoOrigemRepository;
        this.grupoOrigemMapper = grupoOrigemMapper;
    }

    @Override
    public GrupoOrigemDTO save(GrupoOrigemDTO grupoOrigemDTO) {
        log.debug("Request to save GrupoOrigem : {}", grupoOrigemDTO);
        GrupoOrigem grupoOrigem = grupoOrigemMapper.toEntity(grupoOrigemDTO);
        grupoOrigem = grupoOrigemRepository.save(grupoOrigem);
        return grupoOrigemMapper.toDto(grupoOrigem);
    }

    @Override
    public GrupoOrigemDTO update(GrupoOrigemDTO grupoOrigemDTO) {
        log.debug("Request to update GrupoOrigem : {}", grupoOrigemDTO);
        GrupoOrigem grupoOrigem = grupoOrigemMapper.toEntity(grupoOrigemDTO);
        grupoOrigem = grupoOrigemRepository.save(grupoOrigem);
        return grupoOrigemMapper.toDto(grupoOrigem);
    }

    @Override
    public Optional<GrupoOrigemDTO> partialUpdate(GrupoOrigemDTO grupoOrigemDTO) {
        log.debug("Request to partially update GrupoOrigem : {}", grupoOrigemDTO);

        return grupoOrigemRepository
            .findById(grupoOrigemDTO.getId())
            .map(existingGrupoOrigem -> {
                grupoOrigemMapper.partialUpdate(existingGrupoOrigem, grupoOrigemDTO);

                return existingGrupoOrigem;
            })
            .map(grupoOrigemRepository::save)
            .map(grupoOrigemMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<GrupoOrigemDTO> findAll() {
        log.debug("Request to get all GrupoOrigems");
        return grupoOrigemRepository.findAll().stream().map(grupoOrigemMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<GrupoOrigemDTO> findOne(Long id) {
        log.debug("Request to get GrupoOrigem : {}", id);
        return grupoOrigemRepository.findById(id).map(grupoOrigemMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete GrupoOrigem : {}", id);
        grupoOrigemRepository.deleteById(id);
    }
}
