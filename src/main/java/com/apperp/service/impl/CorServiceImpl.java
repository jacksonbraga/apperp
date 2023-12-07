package com.apperp.service.impl;

import com.apperp.domain.Cor;
import com.apperp.repository.CorRepository;
import com.apperp.service.CorService;
import com.apperp.service.dto.CorDTO;
import com.apperp.service.mapper.CorMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.apperp.domain.Cor}.
 */
@Service
@Transactional
public class CorServiceImpl implements CorService {

    private final Logger log = LoggerFactory.getLogger(CorServiceImpl.class);

    private final CorRepository corRepository;

    private final CorMapper corMapper;

    public CorServiceImpl(CorRepository corRepository, CorMapper corMapper) {
        this.corRepository = corRepository;
        this.corMapper = corMapper;
    }

    @Override
    public CorDTO save(CorDTO corDTO) {
        log.debug("Request to save Cor : {}", corDTO);
        Cor cor = corMapper.toEntity(corDTO);
        cor = corRepository.save(cor);
        return corMapper.toDto(cor);
    }

    @Override
    public CorDTO update(CorDTO corDTO) {
        log.debug("Request to update Cor : {}", corDTO);
        Cor cor = corMapper.toEntity(corDTO);
        cor = corRepository.save(cor);
        return corMapper.toDto(cor);
    }

    @Override
    public Optional<CorDTO> partialUpdate(CorDTO corDTO) {
        log.debug("Request to partially update Cor : {}", corDTO);

        return corRepository
            .findById(corDTO.getId())
            .map(existingCor -> {
                corMapper.partialUpdate(existingCor, corDTO);

                return existingCor;
            })
            .map(corRepository::save)
            .map(corMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CorDTO> findAll() {
        log.debug("Request to get all Cors");
        return corRepository.findAll().stream().map(corMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CorDTO> findOne(Long id) {
        log.debug("Request to get Cor : {}", id);
        return corRepository.findById(id).map(corMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cor : {}", id);
        corRepository.deleteById(id);
    }
}
