package com.apperp.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

@SuppressWarnings("common-java:DuplicatedBlocks")
public class PreviaFechamentoDTO implements Serializable {

    private String descricao;

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
