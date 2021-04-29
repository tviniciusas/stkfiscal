const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const transporter = require('../config/emailSend')

module.exports =  {

    async index(req, res) {

        const users = await User.findAll();
        if(users == '' || users == null) {
            return res.status(200).send({message: "Nenhum usuário cadastrado"});
        }
        return res.status(200).send({users});
    },

    async store(req, res) {
        
        try {
            const users = await ({nome,razao})

            if(users) {
                res.status(400).send({status: false, msg: "Já existe um usuário cadastrado com esse e-mail"});     
            }
            
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const password = hashedPassword;
            const email = req.body.email;
            const user = await User.create({password,email});

            res.redirect('/login')
        
        } catch (error) {                
            res.status(400).send({status: false, msg: error});     
        }
    },

    async storeUserMail(req, res, next) {
        try {
            const hashedPassword = await bcrypt.hash('mudarsenha', 10)
            const password = hashedPassword;
            const email = req.body.email;
            const user = await User.create({password,email})
            transporter.sendMail({
                from: "<istok@stokfiscal.com.br>", 
                to: email, 
                subject: "Finalize seu cadastro i-store.duckdns.org ", 
                text: "Obrigado por se cadastrar em nossa plataforma", 
                html: "<h1><b>Click no link abaixo para completar seu cadastro</b></h1><br><a href='http://i-store.duckdns.org/login'><button>Finalizar Cadastro</button></a>", 
              }).then(info => {
                  req.flash('success_msg','Cliente cadastrado')
                  res.redirect('admin/usuarios')
              }).catch(e => {
                  console.log('erro ao enviar e-mail '+ e)
              })
        } catch (error) {                
            res.status(400).send({status: false, msg: error});     
        }
    },

    async update(req, res) {

        const {name, password, email} = req.body;
        const { user_id } = req.params;
        
        await User.update({name,password,email}, {where: {id: user_id}});
        return res.status(200).send({status: true, msg: "Dados Alterados com sucesso"});
    },

    async delete(req, res) {

        const { user_id } = req.params;
        await User.destroy({where: {id: user_id}});
        return res.status(200).send({status: true, msg: "Usuário deletado com sucesso"});
    }
}