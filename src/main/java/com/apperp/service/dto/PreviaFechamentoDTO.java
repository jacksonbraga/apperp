package com.apperp.service.dto;

import java.io.Serializable;

@SuppressWarnings("common-java:DuplicatedBlocks")
public class PreviaFechamentoDTO implements Serializable {

    private String tipo;

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getValor() {
        return valor;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    private String descricao;
    private String valor;

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
