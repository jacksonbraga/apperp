package com.apperp.repository;

import com.apperp.domain.ItemComanda;
import com.apperp.service.dto.IRelatorio;
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
        "\tts.descricao as tipo,\r\n" + //
        "\tday(ic.data) as dia,\r\n" + //
        "\tmonth(ic.data) as mes,\r\n" + //
        "\tyear(ic.data) as ano,\r\n" + //
        "\tsum(ic.valor) as valor\r\n" + //
        "from\r\n" + //
        "\titem_comanda ic\r\n" + //
        "inner join tipo_servico ts on\r\n" + //
        "\tic.tipo_servico_id = ts.id\r\n" + //
        "inner join grupo_servico gs on\r\n" + //
        "\tts.grupo_servico_id = gs.id\r\n" + //
        "where ic.data between :dataInicio and :dataFim\t\r\n" + //
        "group by\r\n" + //
        "\tgs.descricao,\r\n" + //
        "\tts.descricao,\r\n" + //
        "\tday(ic.data),\r\n" + //
        "\tmonth(ic.data),\r\n" + //
        "\tyear(ic.data) \r\n" + //
        "having\r\n" + //
        "\tsum(ic.valor) > 0\r\n" + //
        "union all \r\n" + //
        "select\r\n" + //
        "\t\"(B) Despesas\" as grupoContabil,\r\n" + //
        "\tgd.descricao as grupo,\r\n" + //
        "\ttd.descricao as tipo,\r\n" + //
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
}
