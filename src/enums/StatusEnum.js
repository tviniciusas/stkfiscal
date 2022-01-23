class StatusEnum {
    static DIGITACAO = new StatusEnum("DIGITACAO", "DIGITAÇÃO");
    static SOLICITADO = new StatusEnum("SOLICITADO", "SOLICITADO");
    static ATENDIDO = new StatusEnum("ATENDIDO", "ATENDIDO");
    static FINALIZADO = new StatusEnum("FINALIZADO", "FINALIZADO");

    constructor(codigo, descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }
}

module.exports = StatusEnum;