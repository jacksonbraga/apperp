package com.apperp.repository;

import com.apperp.domain.ItemComanda;
import com.apperp.service.dto.IRelatorio;
import com.apperp.service.dto.IRelatorioCaixa;
import com.apperp.service.dto.IRelatorioComanda;
import com.apperp.service.dto.IRelatorioControle;
import com.apperp.service.dto.IRelatorioControle2;
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
        value = "select cor.descricao as turno,\r\n" + //
        "       cc.faixa_inicio as inicio,\r\n" + //
        "       cc.faixa_fim as fim,\r\n" + //
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
        " group by cor.descricao,cc.faixa_inicio,cc.faixa_fim",
        nativeQuery = true
    )
    List<IRelatorioComanda> listaRelatorioComandaPorDia(@Param("dataInicio") String dataInicio, @Param("dataFim") String dataFim);

    @Query(
        value = "select\r\n" + //
        "\tcor.descricao as turno,\r\n" + //
        "\tcc.faixa_inicio as inicio,\r\n" + //
        "\tcc.Faixa_fIm as fim,\r\n" + //
        "\t(cc.faixa_fim - cc.faixa_inicio) + 1 as qtde,\r\n" + //
        "\tsum(c.valor) as valor\r\n" + //
        "from\r\n" + //
        "\tcomanda c\r\n" + //
        "inner join controle_comanda cc on\r\n" + //
        "\tcc.id = c.controle_comanda_id\r\n" + //
        "inner join cor cor on\r\n" + //
        "\tcor.id = cc.cor_id\r\n" + //
        "inner join situacao s on\r\n" + //
        "\ts.id = c.situacao_id\r\n" + //
        "where\r\n" + //
        "\tcc.data between :dataInicio and :dataFim\r\n" + //
        "group by\r\n" + //
        "\tcor.descricao,\r\n" + //
        "\tcc.faixa_inicio,\r\n" + //
        "\tcc.Faixa_fim\r\n" + //
        "\t order by 1,2",
        nativeQuery = true
    )
    List<IRelatorioControle2> listaRelatorioControlePorDia(@Param("dataInicio") String dataInicio, @Param("dataFim") String dataFim);

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

    List<ItemComanda> findAllByComandaId(Long id);

    List<ItemComanda> findByComandaId(Long id);
}
