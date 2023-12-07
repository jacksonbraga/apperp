package com.apperp.service.impl;

import com.apperp.domain.Comanda;
import com.apperp.domain.ControleComanda;
import com.apperp.domain.ItemComanda;
import com.apperp.domain.Situacao;
import com.apperp.domain.TipoPagamento;
import com.apperp.domain.TipoServico;
import com.apperp.repository.ComandaRepository;
import com.apperp.repository.ControleComandaRepository;
import com.apperp.repository.ItemComandaRepository;
import com.apperp.repository.TipoPagamentoRepository;
import com.apperp.repository.TipoServicoRepository;
import com.apperp.service.ControleComandaService;
import com.apperp.service.dto.ControleComandaDTO;
import com.apperp.service.mapper.ControleComandaMapper;
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
 * Service Implementation for managing {@link com.apperp.domain.ControleComanda}.
 */
@Service
@Transactional
public class ControleComandaServiceImpl implements ControleComandaService {

    private final Logger log = LoggerFactory.getLogger(ControleComandaServiceImpl.class);

    private final ControleComandaRepository controleComandaRepository;

    private final ComandaRepository comandaRepository;

    private final ItemComandaRepository itemComandaRepository;

    private final TipoServicoRepository tipoServicoRepository;

    private final TipoPagamentoRepository tipoPagamentoRepository;

    private final ControleComandaMapper controleComandaMapper;

    public ControleComandaServiceImpl(
        ItemComandaRepository itemComandaRepository,
        TipoServicoRepository tipoServicoRepository,
        TipoPagamentoRepository tipoPagamentoRepository,
        ComandaRepository comandaRepository,
        ControleComandaRepository controleComandaRepository,
        ControleComandaMapper controleComandaMapper
    ) {
        this.controleComandaRepository = controleComandaRepository;
        this.tipoServicoRepository = tipoServicoRepository;
        this.tipoPagamentoRepository = tipoPagamentoRepository;
        this.itemComandaRepository = itemComandaRepository;
        this.comandaRepository = comandaRepository;
        this.controleComandaMapper = controleComandaMapper;
    }

    @Override
    public ControleComandaDTO save(ControleComandaDTO controleComandaDTO) {
        log.debug("Request to save ControleComanda : {}", controleComandaDTO);
        ControleComanda controleComanda = controleComandaMapper.toEntity(controleComandaDTO);
        controleComanda = controleComandaRepository.save(controleComanda);
        this.saveComandas(controleComanda);
        return controleComandaMapper.toDto(controleComanda);
    }

    private void saveComandas(ControleComanda controleComanda) {
        Situacao situacao = new Situacao();
        situacao.setId(1L);

        List<TipoServico> servicos = tipoServicoRepository.findAll();
        List<TipoPagamento> pagamentos = tipoPagamentoRepository.findAll();

        for (Long i = controleComanda.getFaixaInicio(); i <= controleComanda.getFaixaFim(); i++) {
            Comanda comanda = new Comanda();
            comanda.setControleComanda(controleComanda);
            comanda.setData(LocalDate.now());
            comanda.setDescricao("Comanda " + i);
            comanda.setNumero(i.intValue());
            comanda.setSituacao(situacao);
            comanda = comandaRepository.save(comanda);
            for (TipoServico tipo : servicos) {
                ItemComanda item = new ItemComanda();
                item.setComanda(comanda);
                item.setData(LocalDate.now());
                item.setTipoServico(tipo);
                item.setTipo("S");
                itemComandaRepository.save(item);
            }
            for (TipoPagamento tipo : pagamentos) {
                ItemComanda item = new ItemComanda();
                item.setComanda(comanda);
                item.setData(LocalDate.now());
                item.setTipoPagamento(tipo);
                item.setTipo("P");
                itemComandaRepository.save(item);
            }
        }
    }

    @Override
    public ControleComandaDTO update(ControleComandaDTO controleComandaDTO) {
        log.debug("Request to update ControleComanda : {}", controleComandaDTO);
        ControleComanda controleComanda = controleComandaMapper.toEntity(controleComandaDTO);
        controleComanda = controleComandaRepository.save(controleComanda);
        this.updateComandas(controleComanda);
        return controleComandaMapper.toDto(controleComanda);
    }

    private void updateComandas(ControleComanda controleComanda) {
        Situacao situacao = new Situacao();
        situacao.setId(1L);
        List<TipoServico> servicos = tipoServicoRepository.findAll();
        List<TipoPagamento> pagamentos = tipoPagamentoRepository.findAll();

        for (Long i = controleComanda.getFaixaInicio(); i <= controleComanda.getFaixaFim(); i++) {
            List<Comanda> listaComandas = comandaRepository.findByNumeroAndControleComandaId(i, controleComanda.getId());
            if (listaComandas.isEmpty()) {
                Comanda comanda = new Comanda();
                comanda.setControleComanda(controleComanda);
                comanda.setData(LocalDate.now());
                comanda.setDescricao("Comanda " + i);
                comanda.setNumero(i.intValue());
                comanda.setSituacao(situacao);
                comanda = comandaRepository.save(comanda);
                for (TipoServico tipo : servicos) {
                    ItemComanda item = new ItemComanda();
                    item.setComanda(comanda);
                    item.setData(LocalDate.now());
                    item.setTipoServico(tipo);
                    item.setTipo("S");
                    itemComandaRepository.save(item);
                }
                for (TipoPagamento tipo : pagamentos) {
                    ItemComanda item = new ItemComanda();
                    item.setComanda(comanda);
                    item.setData(LocalDate.now());
                    item.setTipoPagamento(tipo);
                    item.setTipo("P");
                    itemComandaRepository.save(item);
                }
            } else {
                for (Comanda comanda : listaComandas) {
                    comanda.setData(LocalDate.now());
                    if (comanda.getSituacao() == null) {
                        comanda.setSituacao(situacao);
                    }
                    comandaRepository.save(comanda);
                    for (TipoServico tipo : servicos) {
                        List<ItemComanda> itens = itemComandaRepository.findByComandaIdAndTipoServicoId(comanda.getId(), tipo.getId());
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
                                itemComandaRepository.save(item);
                            }
                        }
                    }
                    for (TipoPagamento tipo : pagamentos) {
                        List<ItemComanda> itens = itemComandaRepository.findByComandaIdAndTipoPagamentoId(comanda.getId(), tipo.getId());
                        if (itens.isEmpty()) {
                            ItemComanda item = new ItemComanda();
                            item.setComanda(comanda);
                            item.setData(LocalDate.now());
                            item.setTipoPagamento(tipo);
                            item.setTipo("P");
                            itemComandaRepository.save(item);
                        } else {
                            for (ItemComanda item : itens) {
                                item.setData(LocalDate.now());
                                itemComandaRepository.save(item);
                            }
                        }
                    }
                }
            }
        }
    }

    @Override
    public Optional<ControleComandaDTO> partialUpdate(ControleComandaDTO controleComandaDTO) {
        log.debug("Request to partially update ControleComanda : {}", controleComandaDTO);

        return controleComandaRepository
            .findById(controleComandaDTO.getId())
            .map(existingControleComanda -> {
                controleComandaMapper.partialUpdate(existingControleComanda, controleComandaDTO);

                return existingControleComanda;
            })
            .map(controleComandaRepository::save)
            .map(controleComandaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ControleComandaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ControleComandas");
        return controleComandaRepository.findAll(pageable).map(controleComandaMapper::toDto);
    }

    public Page<ControleComandaDTO> findAllWithEagerRelationships(Pageable pageable) {
        return controleComandaRepository.findAllWithEagerRelationships(pageable).map(controleComandaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ControleComandaDTO> findOne(Long id) {
        log.debug("Request to get ControleComanda : {}", id);
        return controleComandaRepository.findOneWithEagerRelationships(id).map(controleComandaMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ControleComanda : {}", id);
        controleComandaRepository.deleteById(id);
    }
}
