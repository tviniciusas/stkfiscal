const puppeteer = require('puppeteer');
const UtilService = require('./UtilService');
const ApiService = require('./ApiService');

async function getCompanyData(numCnpj) {
    try {
        var estado = [];
        var cidade = [];
    
        numCnpj = UtilService.onlyNumbers(numCnpj);
        
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 100
        })
    
        const page = await browser.newPage()
        await page.goto('http://www.sefaz.ba.gov.br/Sintegra/sintegra.asp?estado=BA')
        await page.$eval('input[name=txt_CNPJ]', (el, value) => el.value = value, numCnpj)
        await page.click('input[name=Submit]')

        const url = await page.url();
        const errorMsgIndexOf = await url.indexOf('mensagem');
        if (errorMsgIndexOf >= 0) {
            await browser.close();
            throw 'CNPJ não localizado.';
        }
    
        var nomeCpf = await page.evaluate(() => document.querySelector("body > form > table:nth-child(3) > tbody > tr > td:nth-child(2) > font ").innerHTML.slice(0, 100).replace('amp;','').replace(/\s{2,}/g, ' ').trim().trim().trim().trim().trim().trim().trim().trim().trim().trim().trim().trim().trim().trim().trim().trim())
        var numIe = await page.evaluate(() => document.querySelector("body > form > table:nth-child(2) > tbody > tr > td:nth-child(4) > font ").innerHTML.replace('&nbsp', '').replace(';', '').replace('.', '').replace('.', '').replace('.', '').trim().trim().trim().trim())
        const uf = await page.evaluate(() => document.querySelector("body > form > table:nth-child(2) > tbody > tr > td:nth-child(6) > font").innerHTML)
        const municipio = await page.evaluate(() => document.querySelector("body > form > table:nth-child(8) > tbody > tr > td:nth-child(4) > font").innerHTML.substring(0, 25).trim().trim().trim().trim().replace(/\s{2,}/g, ' '))
        const email = await page.evaluate(() => document.querySelector("body > form > table:nth-child(9) > tbody > tr > td:nth-child(2) > font").innerHTML.substring(0, 40).trimEnd().trim().trim().trim().trim().trim().trim().trim())
        var numTelefone = await page.evaluate(() => document.querySelector("body > form > table:nth-child(9) > tbody > tr > td:nth-child(4) > font").innerHTML.replace('&nbsp;', '').replace('(', '').replace(')', '').trimEnd().trim().trim().replace(/\s{2,}/g, ''))
    
        await browser.close()

        // Removendo o cpf que está vindo junto com o nome
        //Isso nem sempre acontece
        //nomeCpf = nomeCpf.substring(0, nomeCpf.length-12)
        const nome = UtilService.titleize(nomeCpf);

        const cnpj = UtilService.cnpjMask(numCnpj);
        const ie = UtilService.ieMask(numIe);
        const telefone = UtilService.telMask(numTelefone);

        estado = await ApiService.getEstadoByUf(uf);
        cidade = await ApiService.getMunicipioByName(estado.id, municipio);
    
        return { nome, cnpj, ie, estado, cidade, email, telefone };
        
    } catch (error) {
        console.log(error);
        return {"error_msg": error};
    }
    
}

module.exports = {
    getCompanyData
};
