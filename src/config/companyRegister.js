const puppeteer = require('puppeteer')
const Empresa = require('../models/Empresa.js');



module.exports = {

    async registerCompany (req , res, next)  {

        try{

            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.goto('http://www.sefaz.ba.gov.br/Sintegra/sintegra.asp?estado=BA')
            const companyCnpj = req.params.id   
            await page.$eval('input[name=txt_CNPJ]', (el, value) => el.value = value, companyCnpj)
            await page.click('input[name=Submit]')

            const nome = await page.evaluate( () => document.querySelector("body > form > table:nth-child(3) > tbody > tr > td:nth-child(2) > font ").innerHTML.slice(0,30).replace(/\s{2,}/g, ' '))
            const ie = await page.evaluate( () => document.querySelector("body > form > table:nth-child(2) > tbody > tr > td:nth-child(4) > font ").innerHTML.replace('&nbsp', '').replace(';','').replace('.','').replace('.','').replace('.',''))
            const uf = await page.evaluate( () => document.querySelector("body > form > table:nth-child(2) > tbody > tr > td:nth-child(6) > font").innerHTML)
            const endereco = await page.evaluate( () => document.querySelector("body > form > table:nth-child(6) > tbody > tr > td:nth-child(2) > font").innerHTML.replace('&nbsp', '').replace(';','').replace(/\s{2,}/g, ' '))
            const numero = await page.evaluate( () => document.querySelector("body > form > table:nth-child(7) > tbody > tr > td:nth-child(2) > font").innerHTML.replace('&nbsp;','').replace(/\s{2,}/g, ' '))
            const bairro = await page.evaluate( () => document.querySelector("body > form > table:nth-child(7) > tbody > tr > td:nth-child(6) > font").innerHTML.substring(179).trimEnd().replace(' &nbsp;','').replace(/\s{2,}/g, ' '))
            const municipio = await page.evaluate( () => document.querySelector("body > form > table:nth-child(8) > tbody > tr > td:nth-child(4) > font").innerHTML.substring(0,25).replace(/\s{2,}/g, ' '))
            const cep = await page.evaluate( () => document.querySelector("body > form > table:nth-child(8) > tbody > tr > td:nth-child(6) > font").innerHTML.replace('&nbsp;',''))
            const email = await page.evaluate( () => document.querySelector("body > form > table:nth-child(9) > tbody > tr > td:nth-child(2) > font").innerHTML.substring(0,40).trimEnd())
            const telefone = await page.evaluate( () => document.querySelector("body > form > table:nth-child(9) > tbody > tr > td:nth-child(4) > font").innerHTML.replace('&nbsp;','').replace('(','').replace(')','').trimEnd().replace(/\s{2,}/g, ''))
            await browser.close()

            const empresas = []

            empresas.push(nome,ie,uf,endereco,numero,bairro,municipio,cep,email,telefone)

            console.log(empresas)

        }
        catch(e) {
            console.log(e)
        }
        
        next()

        res.redirect('/empresa')
      }
}
