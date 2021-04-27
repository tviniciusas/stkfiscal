const puppeteer = require('puppeteer')
const Empresa = require('../models/Empresa.js')
const User = require('../models/User.js')

module.exports = {

    async registerCompany(req, res, next) {
    
        const companyCnpj = req.body.cadpcnpj
    
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 100
        })
        const page = await browser.newPage()
        await page.goto('http://www.sefaz.ba.gov.br/Sintegra/sintegra.asp?estado=BA')
        await page.$eval('input[name=txt_CNPJ]', (el, value) => el.value = value, companyCnpj)
        await page.click('input[name=Submit]')
    
        // Captura os elementos do site
        const nome = await page.evaluate(() => document.querySelector("body > form > table:nth-child(3) > tbody > tr > td:nth-child(2) > font ").innerHTML.slice(0, 100).replace('amp;','').replace(/\s{2,}/g, ' ').trim().trim().trim().trim().trim().trim().trim().trim().trim().trim().trim().trim().trim().trim().trim().trim())
        const ie = await page.evaluate(() => document.querySelector("body > form > table:nth-child(2) > tbody > tr > td:nth-child(4) > font ").innerHTML.replace('&nbsp', '').replace(';', '').replace('.', '').replace('.', '').replace('.', '').trim().trim().trim().trim())
        const uf = await page.evaluate(() => document.querySelector("body > form > table:nth-child(2) > tbody > tr > td:nth-child(6) > font").innerHTML)
        const municipio = await page.evaluate(() => document.querySelector("body > form > table:nth-child(8) > tbody > tr > td:nth-child(4) > font").innerHTML.substring(0, 25).trim().trim().trim().trim().replace(/\s{2,}/g, ' '))
        const email = await page.evaluate(() => document.querySelector("body > form > table:nth-child(9) > tbody > tr > td:nth-child(2) > font").innerHTML.substring(0, 40).trimEnd().trim().trim().trim().trim().trim().trim().trim())
        const telefone = await page.evaluate(() => document.querySelector("body > form > table:nth-child(9) > tbody > tr > td:nth-child(4) > font").innerHTML.replace('&nbsp;', '').replace('(', '').replace(')', '').trimEnd().trim().trim().replace(/\s{2,}/g, ''))
       
        // const endereco = await page.evaluate(() => document.querySelector("body > form > table:nth-child(6) > tbody > tr > td:nth-child(2) > font").innerHTML.replace('&nbsp', '').replace(';', '').replace(/\s{2,}/g, ' ').trim().trim().trim().trim().trim().trim())
        // const numero = await page.evaluate(() => document.querySelector("body > form > table:nth-child(7) > tbody > tr > td:nth-child(2) > font").innerHTML.replace('&nbsp;', '').replace(/\s{2,}/g, ' ').trim().trim().trim().trim().trim())
        // const bairro = await page.evaluate(() => document.querySelector("body > form > table:nth-child(7) > tbody > tr > td:nth-child(6) > font").innerHTML.substring(179).trimEnd().replace(' &nbsp;', '').replace(/\s{2,}/g, ' '))
        // const cep = await page.evaluate(() => document.querySelector("body > form > table:nth-child(8) > tbody > tr > td:nth-child(6) > font").innerHTML.replace('&nbsp;', '').trim().trim().trim())
       
        await browser.close()


        const users = await User.findOne({where: {empresas_id: req.body.empresas_id}});

        const empresa_id = users.empresa_id
      
        const dadosCapturados = []
        dadosCapturados.push(nome, companyCnpj, ie, telefone, email, uf, municipio)
        console.log(dadosCapturados)
        const empresa = await Empresa.update({
                    razao: nome,
                    cnpj: companyCnpj,
                    ie,
                    telefone,
                    email,
                    estado: uf,
                    cidade: municipio
        }).then(() => {
            req.flash("success_msg", 'Empresa cadastrada')
            next()
            res.redirect('/empresa')
        }).catch(e => {
            req.flash("error_msg", 'Erro ao cadastrar empresa ' + e)
        })
    j}
}
