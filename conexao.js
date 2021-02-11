const mysql = require('mysql')
const urlAtual = "localhost.com:3000"

class conexaoMySql{

    constructor(){
        this.conexao = mysql.createPool({
            host: 'localhost',
            user: 'stkfiscal',
            password: 'stkfiscal',
            database: 'stkfiscal'
        })
    }

    cadastroEmpresa(req, res) {

        this.conexao.query("insert into empresa values(?,?,?,?,?,?,?,?,?,?,?,?)",
        [req.body.razao,req.body.cnpj,req.body.socioa,req.body.email,req.body.telefone,fiscali
        ,req.body.nome,req.body.telefone_fiscal,req.body.email_fiscal,req.body.contador
        ,req.body.loginsefaz,req.body.senha_sefaz,req.body.certificado_digital])

    }




}

module.exports=conexaoMySql

