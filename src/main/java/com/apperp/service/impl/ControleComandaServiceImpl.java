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
import com.apperp.service.dto.PreviaFechamentoDTO;
import com.apperp.service.mapper.ControleComandaMapper;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.stream.Collectors;
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

        //List<TipoServico> servicos = tipoServicoRepository.findAll();
        List<TipoServico> servicos = new ArrayList<>();

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
                if (tipo.getDescricao().indexOf("INATIVO") <= -1) {
                    ItemComanda item = new ItemComanda();
                    item.setComanda(comanda);
                    item.setData(LocalDate.now());
                    item.setTipoPagamento(tipo);
                    item.setTipo("P");
                    itemComandaRepository.save(item);
                }
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
        // List<TipoServico> servicos = tipoServicoRepository.findAll();
        List<TipoServico> servicos = new ArrayList<>();
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
                    if (tipo.getDescricao().indexOf("INATIVO") <= -1) {
                        ItemComanda item = new ItemComanda();
                        item.setComanda(comanda);
                        item.setData(LocalDate.now());
                        item.setTipoPagamento(tipo);
                        item.setTipo("P");
                        itemComandaRepository.save(item);
                    }
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
                                    itemComandaRepository.save(item);
                                }
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

    @Override
    public List<PreviaFechamentoDTO> previaFechamento(Long id) {
        String formato = "#,##0.00";
        DecimalFormat d = new DecimalFormat(formato);
        log.info("123 REST request to get PreviaFechamento : {}", id);
        List<PreviaFechamentoDTO> lista = new ArrayList<>();
        log.info("1 REST request to get PreviaFechamento : {}", id);
        List<Comanda> listaComandas = this.comandaRepository.findAllByControleComandaId(id);
        log.info("2 REST request to get PreviaFechamento : {}", id);
        for (Comanda comanda : listaComandas) {
            List<ItemComanda> itens = this.itemComandaRepository.findAllByComandaId(comanda.getId());
            for (ItemComanda item : itens) {
                if (item.getTipoPagamento().getId().equals(19L) && item.getValor() != null) {
                    if (comanda.getControle() == null) {
                        PreviaFechamentoDTO previaFechamentoDTO = new PreviaFechamentoDTO();
                        previaFechamentoDTO.setDescricao(
                            "A COMANDA " +
                            comanda.getDescricao() +
                            " POSSUI O VALOR: " +
                            d.format(item.getValor() != null ? item.getValor() : 0) +
                            " PARA SER RECEBIDO EM OUTRA COMANDA, PORÉM NÃO FOI INFORMADA A COMANDA PAGADORA."
                        );
                        previaFechamentoDTO.setValor(d.format(item.getValor() != null ? item.getValor() : 0));
                        previaFechamentoDTO.setTipo("ERRO");
                        lista.add(previaFechamentoDTO);
                    }
                }
            }
        }
        log.info("3 REST request to get PreviaFechamento : {}", id);
        listaComandas
            .stream()
            .filter(x -> x.getValor() != null && x.getControle() != null)
            .collect(
                Collectors.groupingBy(
                    comanda -> comanda.getControle(),
                    Collectors.reducing(
                        BigDecimal.ZERO,
                        comanda -> comanda.getValor() != null ? comanda.getValor() : BigDecimal.ZERO,
                        BigDecimal::add
                    )
                )
            )
            .forEach((comandaAssociada, total) -> {
                if (!comandaAssociada.getValor().equals(total)) {
                    PreviaFechamentoDTO previaFechamentoDTO = new PreviaFechamentoDTO();
                    previaFechamentoDTO.setDescricao(
                        "O VALOR DA COMANDA " +
                        comandaAssociada.getDescricao() +
                        ": " +
                        d.format(comandaAssociada.getValor()) +
                        " NÃO REFLETE A SOMA DAS COMANDAS ASSOCIADAS: " +
                        d.format(total)
                    );
                    previaFechamentoDTO.setValor(d.format(comandaAssociada.getValor() != null ? comandaAssociada.getValor() : 0));
                    previaFechamentoDTO.setTipo("ERRO");
                    lista.add(previaFechamentoDTO);
                }
            });
        log.info("4 REST request to get PreviaFechamento : {}", id);
        Long maiorLancada = listaComandas
            .stream()
            .filter(comanda -> comanda.getSituacao().getId().equals(4L))
            .mapToLong(Comanda::getId)
            .max()
            .orElse(0L);

        Long menorAberta = listaComandas
            .stream()
            .filter(comanda -> comanda.getSituacao().getId().equals(1L))
            .mapToLong(Comanda::getId)
            .min()
            .orElse(0L);
        log.info("5 REST request to get PreviaFechamento : {}", id);
        if (menorAberta != 0L && menorAberta < maiorLancada) {
            PreviaFechamentoDTO previaFechamentoDTO = new PreviaFechamentoDTO();
            previaFechamentoDTO.setDescricao("EXISTEM COMANDAS NÃO LANÇADAS");
            previaFechamentoDTO.setValor(String.valueOf(menorAberta));
            previaFechamentoDTO.setTipo("ERRO");
            lista.add(previaFechamentoDTO);
        }
        log.info("6 REST request to get PreviaFechamento : {}", id);
        BigDecimal valorTotal = listaComandas
            .stream()
            .filter(x -> x.getValor() != null)
            .map(Comanda::getValor)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        log.info("7 REST request to get PreviaFechamento : {}", id);
        if (valorTotal != null) {
            PreviaFechamentoDTO previaFechamentoDTO = new PreviaFechamentoDTO();
            previaFechamentoDTO.setDescricao("VALOR TOTAL");
            previaFechamentoDTO.setValor(d.format(valorTotal));
            previaFechamentoDTO.setTipo("INFO");
            lista.add(previaFechamentoDTO);
        }

        listaComandas
            .stream()
            .collect(Collectors.groupingBy(comanda -> comanda.getSituacao(), Collectors.counting()))
            .forEach((situacao, count) -> {
                PreviaFechamentoDTO previaFechamentoDTO = new PreviaFechamentoDTO();
                previaFechamentoDTO.setDescricao(situacao.getDescricao());
                previaFechamentoDTO.setValor(String.valueOf(count));
                previaFechamentoDTO.setTipo("INFO");
                lista.add(previaFechamentoDTO);
            });
        log.info("8 REST request to get PreviaFechamento : {}", id);
        listaComandas
            .stream()
            .collect(Collectors.groupingBy(comanda -> comanda.getSituacao(), Collectors.counting()))
            .forEach((situacao, count) -> {
                if (situacao.getId().equals(1L)) {
                    PreviaFechamentoDTO previaFechamentoDTO = new PreviaFechamentoDTO();
                    previaFechamentoDTO.setDescricao(String.valueOf(count) + " COMANDAS SERÃO CONSIDERADAS NÃO UTILIZADAS");
                    previaFechamentoDTO.setValor(String.valueOf(count));
                    previaFechamentoDTO.setTipo("ALERTA");
                    lista.add(previaFechamentoDTO);
                }
            });
        log.info("9 REST request to get PreviaFechamento : {}", id);
        return lista;
    }

    @Override
    public void atualizaPreviaFechamento(Long id) {
        List<Comanda> listaComandas = this.comandaRepository.findAllByControleComandaId(id);

        Long maiorLancada = listaComandas
            .stream()
            .filter(comanda -> comanda.getSituacao().getId().equals(4L))
            .mapToLong(comanda -> comanda.getId())
            .max()
            .orElse(0L);

        for (Comanda comanda : listaComandas) {
            Situacao situacao = new Situacao();
            if (comanda.getSituacao().getId() == 1L && comanda.getId() < maiorLancada) {
                situacao.setId(7L);
                comanda.setSituacao(situacao);
            } else if (comanda.getSituacao().getId() == 1L && comanda.getId() >= maiorLancada) {
                situacao.setId(6L);
                comanda.setSituacao(situacao);
            } else if (comanda.getSituacao().getId() == 4L) {
                situacao.setId(2L);
                comanda.setSituacao(situacao);
            }

            this.comandaRepository.save(comanda);
        }
    }
}
