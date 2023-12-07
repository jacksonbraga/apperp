package com.apperp.service.impl;

import com.apperp.domain.GrupoDespesa;
import com.apperp.repository.GrupoDespesaRepository;
import com.apperp.service.GrupoDespesaService;
import com.apperp.service.dto.GrupoDespesaDTO;
import com.apperp.service.mapper.GrupoDespesaMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.apperp.domain.GrupoDespesa}.
 */
@Service
@Transactional
public class GrupoDespesaServiceImpl implements GrupoDespesaService {

    private final Logger log = LoggerFactory.getLogger(GrupoDespesaServiceImpl.class);

    private final GrupoDespesaRepository grupoDespesaRepository;

    private final GrupoDespesaMapper grupoDespesaMapper;

    public GrupoDespesaServiceImpl(GrupoDespesaRepository grupoDespesaRepository, GrupoDespesaMapper grupoDespesaMapper) {
        this.grupoDespesaRepository = grupoDespesaRepository;
        this.grupoDespesaMapper = grupoDespesaMapper;
    }

    @Override
    public GrupoDespesaDTO save(GrupoDespesaDTO grupoDespesaDTO) {
        log.debug("Request to save GrupoDespesa : {}", grupoDespesaDTO);
        GrupoDespesa grupoDespesa = grupoDespesaMapper.toEntity(grupoDespesaDTO);
        grupoDespesa = grupoDespesaRepository.save(grupoDespesa);
        return grupoDespesaMapper.toDto(grupoDespesa);
    }

    @Override
    public GrupoDespesaDTO update(GrupoDespesaDTO grupoDespesaDTO) {
        log.debug("Request to update GrupoDespesa : {}", grupoDespesaDTO);
        GrupoDespesa grupoDespesa = grupoDespesaMapper.toEntity(grupoDespesaDTO);
        grupoDespesa = grupoDespesaRepository.save(grupoDespesa);
        return grupoDespesaMapper.toDto(grupoDespesa);
    }

    @Override
    public Optional<GrupoDespesaDTO> partialUpdate(GrupoDespesaDTO grupoDespesaDTO) {
        log.debug("Request to partially update GrupoDespesa : {}", grupoDespesaDTO);

        return grupoDespesaRepository
            .findById(grupoDespesaDTO.getId())
            .map(existingGrupoDespesa -> {
                grupoDespesaMapper.partialUpdate(existingGrupoDespesa, grupoDespesaDTO);

                return existingGrupoDespesa;
            })
            .map(grupoDespesaRepository::save)
            .map(grupoDespesaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<GrupoDespesaDTO> findAll() {
        log.debug("Request to get all GrupoDespesas");
        return grupoDespesaRepository.findAll().stream().map(grupoDespesaMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<GrupoDespesaDTO> findOne(Long id) {
        log.debug("Request to get GrupoDespesa : {}", id);
        return grupoDespesaRepository.findById(id).map(grupoDespesaMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete GrupoDespesa : {}", id);
        grupoDespesaRepository.deleteById(id);
    }
}
