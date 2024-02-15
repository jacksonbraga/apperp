package com.apperp.service.impl;

import com.apperp.domain.Comanda;
import com.apperp.domain.ControleComanda;
import com.apperp.domain.ItemComanda;
import com.apperp.domain.Situacao;
import com.apperp.domain.TipoPagamento;
import com.apperp.domain.TipoServico;
import com.apperp.repository.ComandaRepository;
import com.apperp.repository.ItemComandaRepository;
import com.apperp.repository.TipoPagamentoRepository;
import com.apperp.repository.TipoServicoRepository;
import com.apperp.service.ComandaService;
import com.apperp.service.dto.ComandaDTO;
import com.apperp.service.mapper.ComandaMapper;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.apperp.domain.Comanda}.
 */
@Service
@Transactional
public class ComandaServiceImpl implements ComandaService {

    private final Logger log = LoggerFactory.getLogger(ComandaServiceImpl.class);

    private final ComandaRepository comandaRepository;

    private final TipoServicoRepository tipoServicoRepository;

    private final TipoPagamentoRepository tipoPagamentoRepository;

    private final ItemComandaRepository itemComandaRepository;

    private final ComandaMapper comandaMapper;

    public ComandaServiceImpl(
        TipoPagamentoRepository tipoPagamentoRepository,
        ItemComandaRepository itemComandaRepository,
        TipoServicoRepository tipoServicoRepository,
        ComandaRepository comandaRepository,
        ComandaMapper comandaMapper
    ) {
        this.comandaRepository = comandaRepository;
        this.tipoServicoRepository = tipoServicoRepository;
        this.itemComandaRepository = itemComandaRepository;
        this.tipoPagamentoRepository = tipoPagamentoRepository;
        this.comandaMapper = comandaMapper;
    }

    @Override
    public ComandaDTO save(ComandaDTO comandaDTO) {
        log.debug("Request to save Comanda : {}", comandaDTO);
        Comanda comanda = comandaMapper.toEntity(comandaDTO);
        comanda = comandaRepository.save(comanda);
        this.saveItensComandas(comanda);
        return comandaMapper.toDto(comanda);
    }

    private void saveItensComandas(Comanda comanda) {
        Situacao situacao = new Situacao();
        situacao.setId(1L);

        /*         List<TipoServico> servicos = tipoServicoRepository.findAll();

        for (TipoServico tipoServico : servicos) {
            ItemComanda item = new ItemComanda();
            item.setComanda(comanda);
            item.setData(LocalDate.now());
            item.setTipoServico(tipoServico);
            item.setTipo("S");
            itemComandaRepository.save(item);
        } */

        List<TipoPagamento> pagamentos = tipoPagamentoRepository.findAll();

        for (TipoPagamento tipoPagamento : pagamentos) {
            if (tipoPagamento.getDescricao().indexOf("INATIVO") <= -1) {
                ItemComanda item = new ItemComanda();
                item.setComanda(comanda);
                item.setData(LocalDate.now());
                item.setTipoPagamento(tipoPagamento);
                item.setTipo("P");
                itemComandaRepository.save(item);
            }
        }
    }

    @Override
    public ComandaDTO update(ComandaDTO comandaDTO) {
        log.debug("Request to update Comanda : {}", comandaDTO);
        Comanda comanda = comandaMapper.toEntity(comandaDTO);
        comanda = comandaRepository.save(comanda);
        this.updateItensComandas(comanda);
        return comandaMapper.toDto(comanda);
    }

    @Override
    public ComandaDTO updateDigitacao(ComandaDTO comandaDTO) {
        log.debug("Request to update Comanda : {}", comandaDTO);
        Comanda comanda = comandaMapper.toEntity(comandaDTO);
        comanda = comandaRepository.save(comanda);
        this.updateItensComandasDigitacao(comanda);
        return comandaMapper.toDto(comanda);
    }

    private void updateItensComandasDigitacao(Comanda comanda) {
        List<ItemComanda> itens = itemComandaRepository.findByComandaId(comanda.getId());
        if (!itens.isEmpty()) {
            for (ItemComanda item : itens) {
                if (item.getTipoPagamento().getId().equals(1L)) {
                    var valor = comanda.getCartao() != null ? comanda.getCartao() : new BigDecimal(0L);
                    item.setValor(valor);
                    itemComandaRepository.save(item);
                }

                if (item.getTipoPagamento().getId().equals(2L)) {
                    var valor = comanda.getPix() != null ? comanda.getPix() : new BigDecimal(0L);
                    item.setValor(valor);
                    itemComandaRepository.save(item);
                }

                if (item.getTipoPagamento().getId().equals(3L)) {
                    var valor = comanda.getDinheiro() != null ? comanda.getDinheiro() : new BigDecimal(0L);
                    item.setValor(valor);
                    itemComandaRepository.save(item);
                }
                if (item.getTipoPagamento().getId().equals(19L)) {
                    var valor = comanda.getTransferido() != null ? comanda.getTransferido() : new BigDecimal(0L);
                    item.setValor(valor);
                    itemComandaRepository.save(item);
                }
            }
        }
    }

    private void updateItensComandas(Comanda comanda) {
        Situacao situacao = new Situacao();
        situacao.setId(1L);

        /*    List<TipoServico> servicos = tipoServicoRepository.findAll();

        for (TipoServico tipo : servicos) {
            List<ItemComanda> itens = itemComandaRepository.findByComandaIdAndTipoServicoIdAndTipo(comanda.getId(), tipo.getId(), "S");
            if (itens.isEmpty()) {
                ItemComanda item = new ItemComanda();
                item.setComanda(comanda);
                item.setData(LocalDate.now());
                item.setTipoServico(tipo);
                item.setTipo("S");
                itemComandaRepository.save(item);
            } else {
                for (ItemComanda item : itens) {
                    item.setData(LocalDate.now());
                    item.setTipo("S");
                    itemComandaRepository.save(item);
                }
            }
        } */

        List<TipoPagamento> pagamentos = tipoPagamentoRepository.findAll();

        for (TipoPagamento tipo : pagamentos) {
            List<ItemComanda> itens = itemComandaRepository.findByComandaIdAndTipoPagamentoIdAndTipo(comanda.getId(), tipo.getId(), "P");
            if (itens.isEmpty()) {
                if (tipo.getDescricao().indexOf("INATIVO") <= -1) {
                    ItemComanda item = new ItemComanda();
                    item.setComanda(comanda);
                    item.setData(LocalDate.now());
                    item.setTipoPagamento(tipo);
                    item.setTipo("P");
                    itemComandaRepository.save(item);
                }
            } else {
                for (ItemComanda item : itens) {
                    if (item.getTipoPagamento().getDescricao().indexOf("INATIVO") >= 0) {
                        if (item.getValor() == null) {
                            itemComandaRepository.deleteById(item.getId());
                        }
                    } else {
                        item.setData(LocalDate.now());
                        item.setTipo("P");
                        itemComandaRepository.save(item);
                    }
                }
            }
        }
    }

    @Override
    public Optional<ComandaDTO> partialUpdate(ComandaDTO comandaDTO) {
        log.debug("Request to partially update Comanda : {}", comandaDTO);

        return comandaRepository
            .findById(comandaDTO.getId())
            .map(existingComanda -> {
                comandaMapper.partialUpdate(existingComanda, comandaDTO);

                return existingComanda;
            })
            .map(comandaRepository::save)
            .map(comandaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ComandaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Comandas");
        return comandaRepository.findAll(pageable).map(comandaMapper::toDto);
    }

    public Page<ComandaDTO> findAllWithEagerRelationships(Pageable pageable) {
        return comandaRepository.findAllWithEagerRelationships(pageable).map(comandaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ComandaDTO> findOne(Long id) {
        log.debug("Request to get Comanda : {}", id);
        return comandaRepository.findOneWithEagerRelationships(id).map(comandaMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Comanda : {}", id);
        comandaRepository.deleteById(id);
    }
}
