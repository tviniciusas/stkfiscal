const UtilService = require('./UtilService');
const axios = require('axios');
const baseUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades';
const orderByName = '?orderBy=nome'

async function getEstados() {
    try {
      var estados = await axios.get(baseUrl + '/estados' + orderByName);
      
      if (estados) {
        estados = estados.data;
      }

      return estados;
    } catch (error) {
      console.log(error);
      req.flash("error_msg", 'Erro ao carregar estados');
    }
}

async function getEstadoByUf(uf) {
  try {
    var allStates = [];

    allStates = await getEstados();

    if (allStates.length > 0) {
      return allStates.find(state => state.sigla === uf);
    }
  } catch (error) {
    console.log(error);
    req.flash("error_msg", 'Erro ao carregar estados');
  }
  
}

async function getMunicipiosByEstado(nomeEstado) {
  try {
    var allStates = await getEstados();
    var municipios = [];

    if (allStates.length > 0) {
      const state = allStates.find(state => state.nome === nomeEstado);
      
      if (state) {
        municipios = await getMunicipiosByEstadoId(state.id);
      }
    }

    return municipios;
  } catch (error) {
    console.log(error);
    req.flash("error_msg", 'Erro ao carregar cidades');
  }
}

async function getMunicipiosByEstadoId(id) {
    try {
      var municipios = [];

      municipios = await axios.get(baseUrl + `/estados/${id}/municipios` + orderByName);

      if (municipios) {
        municipios = municipios.data;
      }

      return municipios;
    } catch (error) {
      console.log(error);
      req.flash("error_msg", 'Erro ao carregar cidades');
    }
}

async function getMunicipioByName(estadoId, nomeCidade) {
  try {
    var allCounty = [];
    var returnedCounty = [];

    nomeCidade = UtilService.titleize(nomeCidade);
    allCounty = await getMunicipiosByEstadoId(estadoId);

    if (allCounty.length > 0) {
      allCounty.forEach(county => {
        var tempCounty = UtilService.removeAccents(county.nome);

        if (tempCounty === nomeCidade) {
          return returnedCounty = county;
        }
      });
    }

    return returnedCounty;
  } catch (error) {
    console.log(error);
    req.flash("error_msg", 'Erro ao carregar cidades');
  }
  
}

module.exports = {
    getEstados,
    getEstadoByUf,
    getMunicipiosByEstado,
    getMunicipioByName
}