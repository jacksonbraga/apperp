package com.apperp.service.impl;

import com.apperp.domain.Caixa;
import com.apperp.domain.TipoCaixa;
import com.apperp.repository.CaixaRepository;
import com.apperp.repository.TipoCaixaRepository;
import com.apperp.service.CaixaService;
import com.apperp.service.dto.CaixaDTO;
import com.apperp.service.mapper.CaixaMapper;
import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.apperp.domain.Caixa}.
 */
@Service
@Transactional
public class CaixaServiceImpl implements CaixaService {

    private final Logger log = LoggerFactory.getLogger(CaixaServiceImpl.class);

    private final CaixaRepository caixaRepository;

    private final TipoCaixaRepository tipoCaixaRepository;

    private final CaixaMapper caixaMapper;

    public CaixaServiceImpl(CaixaRepository caixaRepository, CaixaMapper caixaMapper, TipoCaixaRepository tipoCaixaRepository) {
        this.caixaRepository = caixaRepository;
        this.tipoCaixaRepository = tipoCaixaRepository;
        this.caixaMapper = caixaMapper;
    }

    @Override
    public CaixaDTO save(CaixaDTO caixaDTO) {
        log.debug("Request to save Caixa : {}", caixaDTO);
        Caixa caixa = caixaMapper.toEntity(caixaDTO);

        Optional<TipoCaixa> tipoCaixa = tipoCaixaRepository.findById(caixa.getTipoCaixa().getId());

        if (!tipoCaixa.isEmpty()) {
            BigDecimal percentual = tipoCaixa.orElse(null).getPercTaxa();
            Integer prazo = tipoCaixa.orElse(null).getPrazoExtrato();

            if (percentual == null) {
                percentual = new BigDecimal(0);
            }

            if (prazo == null) {
                prazo = 0;
            }

            BigDecimal valorTaxa = (caixa.getValor().multiply(percentual)).divide(new BigDecimal(100));

            LocalDate dataEstimada = caixa.getData();

            for (Integer i = 0; i < prazo; i++) {
                dataEstimada = dataEstimada.plusDays(1);
                if ((this.fimDeSemana(dataEstimada))) prazo--;
            }

            dataEstimada = caixa.getData().plusDays(prazo);
            BigDecimal valorEstimado = caixa.getValor().subtract(valorTaxa);

            caixa.setValorTaxa(valorTaxa);
            caixa.setDataEstimadaExtrato(dataEstimada);
            caixa.setValorEstimadoExtrato(valorEstimado);
        }

        caixa = caixaRepository.save(caixa);
        return caixaMapper.toDto(caixa);
    }

    public static boolean fimDeSemana(LocalDate ld) {
        DayOfWeek d = ld.getDayOfWeek();
        return d == DayOfWeek.SATURDAY || d == DayOfWeek.SUNDAY;
    }

    @Override
    public CaixaDTO update(CaixaDTO caixaDTO) {
        log.debug("Request to update Caixa : {}", caixaDTO);

        Caixa caixa = caixaMapper.toEntity(caixaDTO);

        Optional<TipoCaixa> tipoCaixa = tipoCaixaRepository.findById(caixa.getTipoCaixa().getId());

        if (!tipoCaixa.isEmpty()) {
            BigDecimal percentual = tipoCaixa.orElse(null).getPercTaxa();
            Integer prazo = tipoCaixa.orElse(null).getPrazoExtrato();

            if (percentual == null) {
                percentual = new BigDecimal(0);
            }

            if (prazo == null) {
                prazo = 0;
            }

            BigDecimal valorTaxa = (caixa.getValor().multiply(percentual)).divide(new BigDecimal(100));
            BigDecimal valorEstimado = caixa.getValor().subtract(valorTaxa);

            LocalDate dataEstimada = caixa.getData();

            for (Integer i = 0; i < prazo; i++) {
                dataEstimada = dataEstimada.plusDays(1);
                if ((this.fimDeSemana(dataEstimada))) prazo--;
            }

            dataEstimada = caixa.getData().plusDays(prazo);

            caixa.setValorTaxa(valorTaxa);
            caixa.setDataEstimadaExtrato(dataEstimada);
            caixa.setValorEstimadoExtrato(valorEstimado);
        }

        caixa = caixaRepository.save(caixa);
        return caixaMapper.toDto(caixa);
    }

    @Override
    public Optional<CaixaDTO> partialUpdate(CaixaDTO caixaDTO) {
        log.debug("Request to partially update Caixa : {}", caixaDTO);

        return caixaRepository
            .findById(caixaDTO.getId())
            .map(existingCaixa -> {
                caixaMapper.partialUpdate(existingCaixa, caixaDTO);

                return existingCaixa;
            })
            .map(caixaRepository::save)
            .map(caixaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CaixaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Caixas");
        return caixaRepository.findAll(pageable).map(caixaMapper::toDto);
    }

    public Page<CaixaDTO> findAllWithEagerRelationships(Pageable pageable) {
        return caixaRepository.findAllWithEagerRelationships(pageable).map(caixaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CaixaDTO> findOne(Long id) {
        log.debug("Request to get Caixa : {}", id);
        return caixaRepository.findOneWithEagerRelationships(id).map(caixaMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Caixa : {}", id);
        caixaRepository.deleteById(id);
    }
}
