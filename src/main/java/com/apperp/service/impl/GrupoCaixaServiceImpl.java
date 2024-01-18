package com.apperp.service.impl;

import com.apperp.domain.GrupoCaixa;
import com.apperp.repository.GrupoCaixaRepository;
import com.apperp.service.GrupoCaixaService;
import com.apperp.service.dto.GrupoCaixaDTO;
import com.apperp.service.mapper.GrupoCaixaMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.apperp.domain.GrupoCaixa}.
 */
@Service
@Transactional
public class GrupoCaixaServiceImpl implements GrupoCaixaService {

    private final Logger log = LoggerFactory.getLogger(GrupoCaixaServiceImpl.class);

    private final GrupoCaixaRepository grupoCaixaRepository;

    private final GrupoCaixaMapper grupoCaixaMapper;

    public GrupoCaixaServiceImpl(GrupoCaixaRepository grupoCaixaRepository, GrupoCaixaMapper grupoCaixaMapper) {
        this.grupoCaixaRepository = grupoCaixaRepository;
        this.grupoCaixaMapper = grupoCaixaMapper;
    }

    @Override
    public GrupoCaixaDTO save(GrupoCaixaDTO grupoCaixaDTO) {
        log.debug("Request to save GrupoCaixa : {}", grupoCaixaDTO);
        GrupoCaixa grupoCaixa = grupoCaixaMapper.toEntity(grupoCaixaDTO);
        grupoCaixa = grupoCaixaRepository.save(grupoCaixa);
        return grupoCaixaMapper.toDto(grupoCaixa);
    }

    @Override
    public GrupoCaixaDTO update(GrupoCaixaDTO grupoCaixaDTO) {
        log.debug("Request to update GrupoCaixa : {}", grupoCaixaDTO);
        GrupoCaixa grupoCaixa = grupoCaixaMapper.toEntity(grupoCaixaDTO);
        grupoCaixa = grupoCaixaRepository.save(grupoCaixa);
        return grupoCaixaMapper.toDto(grupoCaixa);
    }

    @Override
    public Optional<GrupoCaixaDTO> partialUpdate(GrupoCaixaDTO grupoCaixaDTO) {
        log.debug("Request to partially update GrupoCaixa : {}", grupoCaixaDTO);

        return grupoCaixaRepository
            .findById(grupoCaixaDTO.getId())
            .map(existingGrupoCaixa -> {
                grupoCaixaMapper.partialUpdate(existingGrupoCaixa, grupoCaixaDTO);

                return existingGrupoCaixa;
            })
            .map(grupoCaixaRepository::save)
            .map(grupoCaixaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<GrupoCaixaDTO> findAll() {
        log.debug("Request to get all GrupoCaixas");
        return grupoCaixaRepository.findAll().stream().map(grupoCaixaMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<GrupoCaixaDTO> findOne(Long id) {
        log.debug("Request to get GrupoCaixa : {}", id);
        return grupoCaixaRepository.findById(id).map(grupoCaixaMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete GrupoCaixa : {}", id);
        grupoCaixaRepository.deleteById(id);
    }
}
