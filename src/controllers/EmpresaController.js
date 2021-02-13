const Empresa = require('../models/Empresa.js');

module.exports =  {

    async index(req, res) {

        const empresas = await Empresa.findAll();

        if(empresas == '' || empresas == null) {
            return res.status(200).send({message: "Nenhuma empresa cadastrada"});
        }

        return res.status(200).send({empresas});
    },

    async store(req, res) {

        const { nome, razao, cnpj, ie, telefone, email, estado, cidade } = req.body;

        const empresa = await Empresa.create({ nome, razao, cnpj, ie, telefone, email, estado, cidade });

        return res.status(200).send({
            
            status: 1,
            message: 'Empresa cadastrada com sucesso!',
            empresa
        
        })
    },

    async update(req, res) {

        const { nome, razao, cnpj, ie, telefone, email, estado, cidade } = req.body;
        const { idemp } = req.params;
        
        await Empresa.update({ nome, razao, cnpj, ie, telefone, email, estado, cidade 
        }, {
            where: {
                id: idemp
            }
        });
        return res.status(200).send({
            status: 1,
            message: 'Empresa atualizada com sucesso!',
        })
    },

    async delete(req, res) {

        const { idemp } = req.params;

        await Empresa.destroy({
                where: {
                    id: idemp
                }
                
        });
        return res.status(200).send({
            status: 1,
            message: 'Deletado com sucesso!'
    })
    }
}