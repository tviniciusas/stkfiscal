class StatusEnum {
    static DIGITACAO = new StatusEnum("DIGITACAO", "DIGITAÇÃO");
    static SOLICITADO = new StatusEnum("SOLICITADO", "SOLICITADO");
    static ATENDIDO = new StatusEnum("ATENDIDO", "ATENDIDO");
    static FINALIZADO = new StatusEnum("FINALIZADO", "FINALIZADO");

    constructor(codigo, descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }

    static getByDescription(description) {
        const statusList = [
            StatusEnum.DIGITACAO, StatusEnum.SOLICITADO, 
            StatusEnum.ATENDIDO, StatusEnum.FINALIZADO
        ];

        var statusEnum;

        statusList.forEach(status => {
            if (status.descricao === description) {
                statusEnum = status;
            }
        });

        return statusEnum;
    }

}

module.exports = StatusEnum;