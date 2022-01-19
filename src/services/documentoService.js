function filtrarDocumentos(documentos = [], solicitacaoDocumentos = []) {
    var retorno = [];

    documentos.forEach(doc => {
        var inserir = true;

        solicitacaoDocumentos.forEach(soli => {
            if(doc.id === soli.documento_id) {
                inserir = false;
            }
        });

        if(inserir) {
            retorno.push(doc);
        }
    });

    return retorno;
}

module.exports = {
    filtrarDocumentos
}