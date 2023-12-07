package com.apperp.service.impl;

import com.apperp.domain.GrupoPagamento;
import com.apperp.repository.GrupoPagamentoRepository;
import com.apperp.service.GrupoPagamentoService;
import com.apperp.service.dto.GrupoPagamentoDTO;
import com.apperp.service.mapper.GrupoPagamentoMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.apperp.domain.GrupoPagamento}.
 */
@Service
@Transactional
public class GrupoPagamentoServiceImpl implements GrupoPagamentoService {

    private final Logger log = LoggerFactory.getLogger(GrupoPagamentoServiceImpl.class);

    private final GrupoPagamentoRepository grupoPagamentoRepository;

    private final GrupoPagamentoMapper grupoPagamentoMapper;

    public GrupoPagamentoServiceImpl(GrupoPagamentoRepository grupoPagamentoRepository, GrupoPagamentoMapper grupoPagamentoMapper) {
        this.grupoPagamentoRepository = grupoPagamentoRepository;
        this.grupoPagamentoMapper = grupoPagamentoMapper;
    }

    @Override
    public GrupoPagamentoDTO save(GrupoPagamentoDTO grupoPagamentoDTO) {
        log.debug("Request to save GrupoPagamento : {}", grupoPagamentoDTO);
        GrupoPagamento grupoPagamento = grupoPagamentoMapper.toEntity(grupoPagamentoDTO);
        grupoPagamento = grupoPagamentoRepository.save(grupoPagamento);
        return grupoPagamentoMapper.toDto(grupoPagamento);
    }

    @Override
    public GrupoPagamentoDTO update(GrupoPagamentoDTO grupoPagamentoDTO) {
        log.debug("Request to update GrupoPagamento : {}", grupoPagamentoDTO);
        GrupoPagamento grupoPagamento = grupoPagamentoMapper.toEntity(grupoPagamentoDTO);
        grupoPagamento = grupoPagamentoRepository.save(grupoPagamento);
        return grupoPagamentoMapper.toDto(grupoPagamento);
    }

    @Override
    public Optional<GrupoPagamentoDTO> partialUpdate(GrupoPagamentoDTO grupoPagamentoDTO) {
        log.debug("Request to partially update GrupoPagamento : {}", grupoPagamentoDTO);

        return grupoPagamentoRepository
            .findById(grupoPagamentoDTO.getId())
            .map(existingGrupoPagamento -> {
                grupoPagamentoMapper.partialUpdate(existingGrupoPagamento, grupoPagamentoDTO);

                return existingGrupoPagamento;
            })
            .map(grupoPagamentoRepository::save)
            .map(grupoPagamentoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<GrupoPagamentoDTO> findAll() {
        log.debug("Request to get all GrupoPagamentos");
        return grupoPagamentoRepository
            .findAll()
            .stream()
            .map(grupoPagamentoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<GrupoPagamentoDTO> findOne(Long id) {
        log.debug("Request to get GrupoPagamento : {}", id);
        return grupoPagamentoRepository.findById(id).map(grupoPagamentoMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete GrupoPagamento : {}", id);
        grupoPagamentoRepository.deleteById(id);
    }
}
