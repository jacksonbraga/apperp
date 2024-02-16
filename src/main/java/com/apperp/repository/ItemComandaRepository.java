package com.apperp.repository;

import com.apperp.domain.ItemComanda;
import com.apperp.service.dto.IRelatorio;
import com.apperp.service.dto.IRelatorioCaixa;
import com.apperp.service.dto.IRelatorioComanda;
import com.apperp.service.dto.IRelatorioConferenciaExtrato;
import com.apperp.service.dto.IRelatorioConferenciaExtratoAcumulado;
import com.apperp.service.dto.IRelatorioControle;
import com.apperp.service.dto.IRelatorioControle4;
import com.apperp.service.dto.IRelatorioControleValoresRecebidos;
import com.apperp.service.dto.IRelatorioControleValoresRecebidosResumo;
import com.apperp.service.dto.IRelatorioDespesa;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ItemComanda entity.
 */
@Repository
public interface ItemComandaRepository extends JpaRepository<ItemComanda, Long>, JpaSpecificationExecutor<ItemComanda> {
    default Optional<ItemComanda> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<ItemComanda> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<ItemComanda> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select itemComanda from ItemComanda itemComanda left join fetch itemComanda.tipoPagamento left join fetch itemComanda.tipoServico left join fetch itemComanda.comanda",
        countQuery = "select count(itemComanda) from ItemComanda itemComanda"
    )
    Page<ItemComanda> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select itemComanda from ItemComanda itemComanda left join fetch itemComanda.tipoPagamento left join fetch itemComanda.tipoServico left join fetch itemComanda.comanda"
    )
    List<ItemComanda> findAllWithToOneRelationships();

    @Query(
        "select itemComanda from ItemComanda itemComanda left join fetch itemComanda.tipoPagamento left join fetch itemComanda.tipoServico left join fetch itemComanda.comanda where itemComanda.id =:id"
    )
    Optional<ItemComanda> findOneWithToOneRelationships(@Param("id") Long id);

    List<ItemComanda> findByComandaIdAndTipoServicoId(Long id, Long id2);

    List<ItemComanda> findByComandaIdAndTipoPagamentoId(Long id, Long id2);

    List<ItemComanda> findByComandaIdAndTipoServicoIdAndTipo(Long id, Long id2, String string);

    List<ItemComanda> findByComandaIdAndTipoPagamentoIdAndTipo(Long id, Long id2, String string);

    @Query(
        value = "select\r\n" + //
        "\t\"(A) Vendas\" as grupoContabil,\r\n" + //
        "\tgs.descricao as grupo,\r\n" + //
        "\tCASE\r\n" + //
        "    WHEN gs.tipo_coluna = 'D' THEN \"Débito\"\r\n" + //
        "    WHEN gs.tipo_coluna = 'C' THEN \"Crédito\"\r\n" + //
        "    WHEN gs.tipo_coluna = 'O' THEN \"Outros\"\r\n" + //
        "    WHEN gs.tipo_coluna = 'T' THEN \"Ticket\"\r\n" + //
        "    ELSE \"Não definido\"\r\n" + //
        "    END as tipoColuna,\r\n" + //
        "\tts.descricao as tipo,\r\n" + //
        "\tday(ic.data) as dia,\r\n" + //
        "\tmonth(ic.data) as mes,\r\n" + //
        "\tyear(ic.data) as ano,\r\n" + //
        "\tsum(ic.valor) as valor\r\n" + //
        "from\r\n" + //
        "\titem_comanda ic\r\n" + //
        "inner join tipo_pagamento ts on\r\n" + //
        "\tic.tipo_pagamento_id = ts.id\r\n" + //
        "inner join grupo_pagamento gs on\r\n" + //
        "\tts.grupo_pagamento_id = gs.id\r\n" + //
        "where ic.data between :dataInicio and :dataFim\t\r\n" + //
        "group by\r\n" + //
        "\tgs.descricao,\r\n" + //
        "\tts.descricao,\r\n" + //
        "\tgs.tipo_coluna,\r\n" + //
        "\tday(ic.data),\r\n" + //
        "\tmonth(ic.data),\r\n" + //
        "\tyear(ic.data) \r\n" + //
        "having\r\n" + //
        "\tsum(ic.valor) > 0\r\n" + //
        "union all \r\n" + //
        "select\r\n" + //
        "\t\"(B) Despesas\" as grupoContabil,\r\n" + //
        "\tgd.descricao as grupo,\r\n" + //
        "\t\t'' as tipoColuna,\r\n" + //
        "\ttd.descricao as tipo,\r\n" + //
        "\r\n" + //
        "\tday(de.data) as dia,\r\n" + //
        "\tmonth(de.data) as mes,\r\n" + //
        "\tyear(de.data) as ano,\r\n" + //
        "\tsum(de.valor * -1) as valor\r\n" + //
        "from\r\n" + //
        "\tdespesa de\r\n" + //
        "inner join tipo_despesa td on\r\n" + //
        "\tde.tipo_despesa_id = td.id\r\n" + //
        "inner join grupo_despesa gd on\r\n" + //
        "\ttd.grupo_despesa_id = gd.id\r\n" + //
        "where de.data between :dataInicio and :dataFim\t\r\n" + //
        "group by\r\n" + //
        "\tgd.descricao,\r\n" + //
        "\ttd.descricao,\r\n" + //
        "\tday(de.data),\r\n" + //
        "\tmonth(de.data),\r\n" + //
        "\tyear(de.data) \r\n" + //
        "having\r\n" + //
        "\tsum(de.valor) > 0",
        nativeQuery = true
    )
    List<IRelatorio> listaRelatorioPorDia(@Param("dataInicio") String dataInicio, @Param("dataFim") String dataFim);

    @Query(
        value = "select concat(cor.descricao,cor.valor) as turno,\r\n" + //
        "       min(cc.faixa_inicio) as inicio,\r\n" + //
        "       max(cc.faixa_fim) as fim,\r\n" + //
        "       sum(IF(s.id = 1, 1, 0)) as 'abertas',\r\n" + //
        "       sum(IF(s.id = 2, 1, 0)) as 'fechadas',\r\n" + //
        "       sum(IF(s.id = 3, 1, 0)) as 'desviadas',\r\n" + //
        "       sum(IF(s.id = 4, 1, 0)) as 'lancadas',\r\n" + //
        "       sum(IF(s.id = 6, 1, 0)) as 'naoUsadas',\r\n" + //
        "       sum(IF(s.id = 7, 1, 0)) as 'emAnalise',\r\n" + //
        "       sum(c.valor) as valor\r\n" + //
        " from comanda c \r\n" + //
        " inner join controle_comanda cc on cc.id = c.controle_comanda_id \r\n" + //
        " inner join cor\tcor on cor.id = cc.cor_id \r\n" + //
        " inner join situacao s on s.id = c.situacao_id \r\n" + //
        " where cc.data between :dataInicio and :dataFim\t\r\n" + //
        " group by cor.descricao, cor.valor",
        nativeQuery = true
    )
    List<IRelatorioComanda> listaRelatorioComandaPorDia(@Param("dataInicio") String dataInicio, @Param("dataFim") String dataFim);

    @Query(
        value = " select gor.descricao as origem , tor.descricao as equipamento, tc.descricao as tipo, sum(c.valor) as valor \r\n" + //
        "   from caixa c \r\n" + //
        "   inner join tipo_origem tor on tor.id = c.tipo_origem_id  \r\n" + //
        "   inner join tipo_caixa tc on tc.id = c.tipo_caixa_id     \r\n" + //
        "   inner join grupo_origem gor on gor.id = tor.grupo_origem_id \r\n" + //
        "where c.data between :dataInicio and :dataFim\r\n" + //
        "group by gor.descricao, tor.descricao, tc.descricao",
        nativeQuery = true
    )
    List<IRelatorioControleValoresRecebidos> listaRelatorioControleValoresRecebidosPorDia(
        @Param("dataInicio") String dataInicio,
        @Param("dataFim") String dataFim
    );

    @Query(
        value = "select\r\n" + //
        "\ttipo,\r\n" + //
        "\tif(sum(D01) <> sum(D01L), sum(D01) * -1, sum(D01)) as D01,\r\n" + //
        "\tif(sum(D01) <> sum(D01L), sum(D01L) * -1,sum(D01L)) as D01L,\r\n" + //
        "\tif(sum(D02) <> sum(D02L), sum(D02) * -1, sum(D02)) as D02,\r\n" + //
        "\tif(sum(D02) <> sum(D02L), sum(D02L) * -1, sum(D02L)) as D02L,\r\n" + //
        "\tif(sum(D03) <> sum(D03L), sum(D03) * -1, sum(D03)) as D03,\r\n" + //
        "\tif(sum(D03) <> sum(D03L), sum(D03L) * -1, sum(D03L)) as D03L,\r\n" + //
        "\tif(sum(D04) <> sum(D04L), sum(D04) * -1, sum(D04)) as D04,\r\n" + //
        "\tif(sum(D04) <> sum(D04L), sum(D04L) * -1, sum(D04L)) as D04L,\r\n" + //
        "\tif(sum(D05) <> sum(D05L), sum(D05) * -1, sum(D05)) as D05,\r\n" + //
        "\tif(sum(D05) <> sum(D05L), sum(D05L) * -1, sum(D05L)) as D05L,\r\n" + //
        "\tif(sum(D06) <> sum(D06L), sum(D06) * -1, sum(D06)) as D06,\r\n" + //
        "\tif(sum(D06) <> sum(D06L), sum(D06L) * -1, sum(D06L)) as D06L,\r\n" + //
        "\tif(sum(D07) <> sum(D07L), sum(D07) * -1, sum(D07)) as D07,\r\n" + //
        "\tif(sum(D07) <> sum(D07L), sum(D07L) * -1, sum(D07L)) as D07L,\r\n" + //
        "\tif(sum(D08) <> sum(D08L), sum(D08) * -1, sum(D08)) as D08,\r\n" + //
        "\tif(sum(D08) <> sum(D08L), sum(D08L) * -1, sum(D08L)) as D08L,\r\n" + //
        "\tif(sum(D09) <> sum(D09L), sum(D09) * -1, sum(D09)) as D09,\r\n" + //
        "\tif(sum(D09) <> sum(D09L), sum(D09L) * -1, sum(D09L)) as D09L,\r\n" + //
        "\tif(sum(D10) <> sum(D10L), sum(D10) * -1, sum(D10)) as D10,\r\n" + //
        "\tif(sum(D10) <> sum(D10L), sum(D10L) * -1, sum(D10L)) as D10L,\r\n" + //
        "\tif(sum(D11) <> sum(D11L), sum(D11) * -1, sum(D11)) as D11,\r\n" + //
        "\tif(sum(D11) <> sum(D11L), sum(D11L) * -1, sum(D11L)) as D11L,\r\n" + //
        "\tif(sum(D12) <> sum(D12L), sum(D12) * -1, sum(D12)) as D12,\r\n" + //
        "\tif(sum(D12) <> sum(D12L), sum(D12L) * -1, sum(D12L)) as D12L,\r\n" + //
        "\tif(sum(D13) <> sum(D13L), sum(D13) * -1, sum(D13)) as D13,\r\n" + //
        "\tif(sum(D13) <> sum(D13L), sum(D13L) * -1, sum(D13L)) as D13L,\r\n" + //
        "\tif(sum(D14) <> sum(D14L), sum(D14) * -1, sum(D14)) as D14,\r\n" + //
        "\tif(sum(D14) <> sum(D14L), sum(D14L) * -1, sum(D14L)) as D14L,\r\n" + //
        "\tif(sum(D15) <> sum(D15L), sum(D15) * -1, sum(D15)) as D15,\r\n" + //
        "\tif(sum(D15) <> sum(D15L), sum(D15L) * -1, sum(D15L)) as D15L,\r\n" + //
        "\tif(sum(D16) <> sum(D16L), sum(D16) * -1, sum(D16)) as D16,\r\n" + //
        "\tif(sum(D16) <> sum(D16L), sum(D16L) * -1, sum(D16L)) as D16L,\r\n" + //
        "\tif(sum(D17) <> sum(D17L), sum(D17) * -1, sum(D17)) as D17,\r\n" + //
        "\tif(sum(D17) <> sum(D17L), sum(D17L) * -1, sum(D17L)) as D17L,\r\n" + //
        "\tif(sum(D18) <> sum(D18L), sum(D18) * -1, sum(D18)) as D18,\r\n" + //
        "\tif(sum(D18) <> sum(D18L), sum(D18L) * -1, sum(D18L)) as D18L,\r\n" + //
        "\tif(sum(D19) <> sum(D19L), sum(D19) * -1, sum(D19)) as D19,\r\n" + //
        "\tif(sum(D19) <> sum(D19L), sum(D19L) * -1, sum(D19L)) as D19L,\r\n" + //
        "\tif(sum(D20) <> sum(D20L), sum(D20) * -1, sum(D20)) as D20,\r\n" + //
        "\tif(sum(D20) <> sum(D20L), sum(D20L) * -1, sum(D20L)) as D20L,\r\n" + //
        "\tif(sum(D21) <> sum(D21L), sum(D21) * -1, sum(D21)) as D21,\r\n" + //
        "\tif(sum(D21) <> sum(D21L), sum(D21L) * -1, sum(D21L)) as D21L,\r\n" + //
        "\tif(sum(D22) <> sum(D22L), sum(D22) * -1, sum(D22)) as D22,\r\n" + //
        "\tif(sum(D22) <> sum(D22L), sum(D22L) * -1, sum(D22L)) as D22L,\r\n" + //
        "\tif(sum(D23) <> sum(D23L), sum(D23) * -1, sum(D23)) as D23,\r\n" + //
        "\tif(sum(D23) <> sum(D23L), sum(D23L) * -1, sum(D23L)) as D23L,\r\n" + //
        "\tif(sum(D24) <> sum(D24L), sum(D24) * -1, sum(D24)) as D24,\r\n" + //
        "\tif(sum(D24) <> sum(D24L), sum(D24L) * -1, sum(D24L)) as D24L,\r\n" + //
        "\tif(sum(D25) <> sum(D25L), sum(D25) * -1, sum(D25)) as D25,\r\n" + //
        "\tif(sum(D25) <> sum(D25L), sum(D25L) * -1, sum(D25L)) as D25L,\r\n" + //
        "\tif(sum(D26) <> sum(D26L), sum(D26) * -1, sum(D26)) as D26,\r\n" + //
        "\tif(sum(D26) <> sum(D26L), sum(D26L) * -1, sum(D26L)) as D26L,\r\n" + //
        "\tif(sum(D27) <> sum(D27L), sum(D27) * -1, sum(D27)) as D27,\r\n" + //
        "\tif(sum(D27) <> sum(D27L), sum(D27L) * -1, sum(D27L)) as D27L,\r\n" + //
        "\tif(sum(D28) <> sum(D28L), sum(D28) * -1, sum(D28)) as D28,\r\n" + //
        "\tif(sum(D28) <> sum(D28L), sum(D28L) * -1, sum(D28L)) as D28L,\r\n" + //
        "\tif(sum(D29) <> sum(D29L), sum(D29) * -1, sum(D29)) as D29,\r\n" + //
        "\tif(sum(D29) <> sum(D29L), sum(D29L) * -1, sum(D29L)) as D29L,\r\n" + //
        "\tif(sum(D30) <> sum(D30L), sum(D30) * -1, sum(D30)) as D30,\r\n" + //
        "\tif(sum(D30) <> sum(D30L), sum(D30L) * -1, sum(D30L)) as D30L,\r\n" + //
        "\tif(sum(D31) <> sum(D31L), sum(D31) * -1, sum(D31)) as D31,\r\n" + //
        "\tif(sum(D31) <> sum(D31L), sum(D31L) * -1, sum(D31L)) as D31L\r\n" + //
        "from\r\n" + //
        "\t conferencia\r\n" + //
        "\twhere data between :dataInicio and :dataFim \r\n" + //
        "\tgroup by tipo \r\n" + //
        "\t\r\n" + //
        "",
        nativeQuery = true
    )
    List<IRelatorioControleValoresRecebidosResumo> listaRelatorioControleValoresRecebidosResumoPorDia(
        @Param("dataInicio") String dataInicio,
        @Param("dataFim") String dataFim
    );

    @Query(
        value = "select\r\n" + //
        "\ttipo,\r\n" + //
        "\tIFNULL(sum(coalesce(D01))  / sum(coalesce(C01)),0)  as D01,\r\n" + //
        "\tIFNULL(sum(coalesce(D02))  / sum(coalesce(C02)),0)  as D02,\r\n" + //
        "\tIFNULL(sum(coalesce(D03))  / sum(coalesce(C03)),0)  as D03,\r\n" + //
        "\tIFNULL(sum(coalesce(D04))  / sum(coalesce(C04)),0)  as D04,\r\n" + //
        "\tIFNULL(sum(coalesce(D05))  / sum(coalesce(C05)),0)  as D05,\r\n" + //
        "\tIFNULL(sum(coalesce(D06))  / sum(coalesce(C06)),0)  as D06,\r\n" + //
        "\tIFNULL(sum(coalesce(D07))  / sum(coalesce(C07)),0)  as D07,\r\n" + //
        "\tIFNULL(sum(coalesce(D08))  / sum(coalesce(C08)),0)  as D08,\r\n" + //
        "\tIFNULL(sum(coalesce(D09))  / sum(coalesce(C09)),0)  as D09,\r\n" + //
        "\tIFNULL(sum(coalesce(D10))  / sum(coalesce(C10)),0)  as D10,\r\n" + //
        "\tIFNULL(sum(coalesce(D11))  / sum(coalesce(C11)),0)  as D11,\r\n" + //
        "\tIFNULL(sum(coalesce(D12))  / sum(coalesce(C12)),0)  as D12,\r\n" + //
        "\tIFNULL(sum(coalesce(D13))  / sum(coalesce(C13)),0)  as D13,\r\n" + //
        "\tIFNULL(sum(coalesce(D14))  / sum(coalesce(C14)),0)  as D14,\r\n" + //
        "\tIFNULL(sum(coalesce(D15))  / sum(coalesce(C15)),0)  as D15,\r\n" + //
        "\tIFNULL(sum(coalesce(D16))  / sum(coalesce(C16)),0)  as D16,\r\n" + //
        "\tIFNULL(sum(coalesce(D17))  / sum(coalesce(C17)),0)  as D17,\r\n" + //
        "\tIFNULL(sum(coalesce(D18))  / sum(coalesce(C18)),0)  as D18,\r\n" + //
        "\tIFNULL(sum(coalesce(D19))  / sum(coalesce(C19)),0)  as D19,\r\n" + //
        "\tIFNULL(sum(coalesce(D20))  / sum(coalesce(C20)),0)  as D20,\r\n" + //
        "\tIFNULL(sum(coalesce(D21))  / sum(coalesce(C21)),0)  as D21,\r\n" + //
        "\tIFNULL(sum(coalesce(D22))  / sum(coalesce(C22)),0)  as D22,\r\n" + //
        "\tIFNULL(sum(coalesce(D23))  / sum(coalesce(C23)),0)  as D23,\r\n" + //
        "\tIFNULL(sum(coalesce(D24))  / sum(coalesce(C24)),0)  as D24,\r\n" + //
        "\tIFNULL(sum(coalesce(D25))  / sum(coalesce(C25)),0)  as D25,\r\n" + //
        "\tIFNULL(sum(coalesce(D26))  / sum(coalesce(C26)),0)  as D26,\r\n" + //
        "\r\n" + //
        "\tIFNULL(sum(coalesce(D27))  / sum(coalesce(C27)),0)  as D27,\r\n" + //
        "\tIFNULL(sum(coalesce(D28))  / sum(coalesce(C28)),0)  as D28,\r\n" + //
        "\tIFNULL(sum(coalesce(D29))  / sum(coalesce(C29)),0)  as D29,\r\n" + //
        "\tIFNULL(sum(coalesce(D30))  / sum(coalesce(C30)),0)  as D30,\r\n" + //
        "\tIFNULL(sum(coalesce(D31))  / sum(coalesce(C31)),0)  as D31\r\n" + //
        "\r\n" + //
        "from\r\n" + //
        "\t conferencia\r\n" + //
        "\twhere data between :dataInicio and :dataFim \r\n" + //
        "\tgroup by tipo \r\n" + //
        "\t",
        nativeQuery = true
    )
    List<IRelatorioControleValoresRecebidosResumo> listaRelatorioTicketMedioPorDia(
        @Param("dataInicio") String dataInicio,
        @Param("dataFim") String dataFim
    );

    @Query(
        value = " select gd.descricao as grupo,\r\n" + //
        "        td.descricao as tipo,\r\n" + //
        "        d.descricao  as descricao, \r\n" + //
        "        IFNULL(sum(d.valor_pagto), 0) as valorPagamento,\r\n" + //
        "        IFNULL(sum(d.valor),0)  as valorVencimento\r\n" + //
        " from despesa d \r\n" + //
        "   inner join tipo_despesa td on d.tipo_despesa_id = td.id \r\n" + //
        "   inner join grupo_despesa gd on td.grupo_despesa_id = gd.id \r\n" + //
        "where d.data_vencimento  between :dataInicio and :dataFim\r\n" + //
        "group by gd.descricao, td.descricao, d.descricao",
        nativeQuery = true
    )
    List<IRelatorioDespesa> listaRelatorioDespesas(@Param("dataInicio") String dataInicio, @Param("dataFim") String dataFim);

    @Query(
        value = "select\r\n" + //
        "\t\"Comandas\" as grupoComanda,\r\n" + //
        "\tgp.descricao as grupo,\r\n" + //
        "\tcc.id as id,\r\n" + //
        "\tcor.descricao as turno,\r\n" + //
        "\ttp.descricao  as tipo,\r\n" + //
        "\tday(cc.data) as dia,\r\n" + //
        "\tmonth(cc.data) as mes,\r\n" + //
        "\tyear(cc.data) as ano,\r\n" + //
        "\tsum(ic.valor) as valor,\r\n" + //
        "\tcount(distinct c.id) as qtde,\r\n" + //
        "\t0 as valorCaixa,\r\n" + //
        "\t0 as taxaCobrada,\r\n" + //
        "\t0 as valorCobrado\r\n" + //
        "from\r\n" + //
        "\tcomanda c\r\n" + //
        "inner join controle_comanda cc on\r\n" + //
        "\tcc.id = c.controle_comanda_id\r\n" + //
        "\r\n" + //
        "inner join item_comanda ic on\r\n" + //
        "\tic.comanda_id = c.id\t\r\n" + //
        "inner join tipo_pagamento tp on \r\n" + //
        "    ic.tipo_pagamento_id = tp.id \r\n" + //
        "inner join grupo_pagamento gp on \r\n" + //
        "   tp.grupo_pagamento_id = gp.id\r\n" + //
        "    \r\n" + //
        "\t\r\n" + //
        "inner join cor cor on\r\n" + //
        "\tcor.id = cc.cor_id\r\n" + //
        "inner join situacao s on\r\n" + //
        "\ts.id = c.situacao_id\r\n" + //
        "where\r\n" + //
        "\tcc.data between :dataInicio and :dataFim\r\n" + //
        "group by\r\n" + //
        "\tcc.id,\r\n" + //
        "\tgp.descricao,\r\n" + //
        "\tcor.descricao,\r\n" + //
        "\ttp.descricao,\r\n" + //
        "\tday(cc.data),\r\n" + //
        "\tmonth(cc.data),\r\n" + //
        "\tyear(cc.data) order by 4,2 asc",
        nativeQuery = true
    )
    List<IRelatorioCaixa> listaRelatorioCaixaPorDia(@Param("dataInicio") String dataInicio, @Param("dataFim") String dataFim);

    @Query(
        value = " select gp.descricao as grupo, \r\n" + //
        "        sum(c.valor) as valorRecebido,\r\n" + //
        "        ( select sum(ic.valor) as valorInformado\r\n" + //
        "   from item_comanda ic  \r\n" + //
        "   inner join tipo_pagamento tp on tp.id = ic.tipo_pagamento_id \r\n" + //
        "   inner join grupo_pagamento grupo on grupo.id = tp.grupo_pagamento_id  \r\n" + //
        "where ic.data between :dataInicio and :dataFim and grupo.id = gp.id \r\n" + //
        "group by gp.descricao) as valorInformado\r\n" + //
        "   from caixa c \r\n" + //
        "   inner join tipo_caixa tc      on tc.id = c.tipo_caixa_id     \r\n" + //
        "   inner join grupo_pagamento gp on gp.id = tc.grupo_pagamento_id \r\n" + //
        "where c.data between :dataInicio and :dataFim\r\n" + //
        "group by gp.descricao",
        nativeQuery = true
    )
    List<IRelatorioControle4> listaRelatorioControle4PorDia(@Param("dataInicio") String dataInicio, @Param("dataFim") String dataFim);

    @Query(
        value = " select tor.descricao as equipamento, \r\n" + //
        "        tc.descricao as tipo, \r\n" + //
        "        IFNULL(sum(c.valor_estimado_extrato), 0) as valorPrevisto,\r\n" + //
        "        IFNULL(sum(c.valor_lancado_extrato),0)  as valorConfirmado,\r\n" + //
        "        IFNULL(sum(c.valor_taxa),0)  as valorTaxa \r\n" + //
        " from caixa c \r\n" + //
        "   inner join tipo_origem tor on tor.id = c.tipo_origem_id  \r\n" + //
        "   inner join tipo_caixa tc on tc.id = c.tipo_caixa_id     \r\n" + //
        "   inner join grupo_origem gor on gor.id = tor.grupo_origem_id \r\n" + //
        "where c.data between :dataInicio and :dataFim\r\n" + //
        "group by tor.descricao, tc.descricao",
        nativeQuery = true
    )
    List<IRelatorioConferenciaExtrato> listaRelatorioConferenciaExtratoPorDia(
        @Param("dataInicio") String dataInicio,
        @Param("dataFim") String dataFim
    );

    @Query(
        value = " select equipamento,\r\n" + //
        "        tipo,\r\n" + //
        "        data_estimada_extrato,\r\n" + //
        "        if(day(data_estimada_extrato) = 1, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D01,\r\n" + //
        "        if(day(data_estimada_extrato) = 2, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D02,\r\n" + //
        "        if(day(data_estimada_extrato) = 3, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D03,\r\n" + //
        "        if(day(data_estimada_extrato) = 4, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D04,\r\n" + //
        "        if(day(data_estimada_extrato) = 5, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D05,\r\n" + //
        "        if(day(data_estimada_extrato) = 6, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D06,\r\n" + //
        "        if(day(data_estimada_extrato) = 7, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D07,\r\n" + //
        "        if(day(data_estimada_extrato) = 8, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D08,\r\n" + //
        "        if(day(data_estimada_extrato) = 9, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D09,\r\n" + //
        "        if(day(data_estimada_extrato) = 10, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D10,\r\n" + //
        "        if(day(data_estimada_extrato) = 11, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D11,\r\n" + //
        "        if(day(data_estimada_extrato) = 12, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D12,\r\n" + //
        "        if(day(data_estimada_extrato) = 13, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D13,\r\n" + //
        "        if(day(data_estimada_extrato) = 14, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D14,\r\n" + //
        "        if(day(data_estimada_extrato) = 15, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D15,\r\n" + //
        "        if(day(data_estimada_extrato) = 16, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D16,\r\n" + //
        "        if(day(data_estimada_extrato) = 17, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D17,\r\n" + //
        "        if(day(data_estimada_extrato) = 18, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D18,\r\n" + //
        "        if(day(data_estimada_extrato) = 19, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D19,\r\n" + //
        "        if(day(data_estimada_extrato) = 20, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D20,\r\n" + //
        "        if(day(data_estimada_extrato) = 21, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D21,\r\n" + //
        "        if(day(data_estimada_extrato) = 22, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D22,\r\n" + //
        "        if(day(data_estimada_extrato) = 23, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D23,\r\n" + //
        "        if(day(data_estimada_extrato) = 24, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D24,\r\n" + //
        "        if(day(data_estimada_extrato) = 25, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D25,\r\n" + //
        "        if(day(data_estimada_extrato) = 26, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D26,\r\n" + //
        "        if(day(data_estimada_extrato) = 27, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D27,\r\n" + //
        "        if(day(data_estimada_extrato) = 28, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D28,\r\n" + //
        "        if(day(data_estimada_extrato) = 29, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D29,\r\n" + //
        "        if(day(data_estimada_extrato) = 30, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D30,\r\n" + //
        "        if(day(data_estimada_extrato) = 31, if(sum(diferenca) <> 0, sum(valorPrevisto) * -1, sum(valorPrevisto)), 0) as D31\r\n" + //
        " from conferencia_extrato\r\n" + //
        " where data_estimada_extrato between :dataInicio and :dataFim\r\n" + //
        "group by equipamento , tipo,  data_estimada_extrato",
        nativeQuery = true
    )
    List<IRelatorioConferenciaExtratoAcumulado> listaRelatorioConferenciaExtratoAcumuladoPorDia(
        @Param("dataInicio") String dataInicio,
        @Param("dataFim") String dataFim
    );

    List<ItemComanda> findAllByComandaId(Long id);

    List<ItemComanda> findByComandaId(Long id);

    void deleteByComandaControleId(Long id);

    void deleteByComandaControleComandaId(Long id);
}
