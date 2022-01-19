function onlyNumbers(str) {
    return str.replace(/\D/g,"");
};

function orderByName(array) {
    array.sort(function(a, b) {
        return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
    });

    return array;
}

function removeSpecialCharacters(text) {
    return text.replace(/[^a-zA-Zs]/g, "");
}

function removeAccents( newStringComAcento ) {
    var string = newStringComAcento;
      var mapaAcentosHex 	= {
          a : /[\xE0-\xE6]/g,
          A : /[\xC0-\xC5]/g,
          e : /[\xE8-\xEB]/g,
          E : /[\xC8-\xCA]/g,
          i : /[\xEC-\xEF]/g,
          I : /[\xCC-\xCE]/g,
          o : /[\xF2-\xF6]/g,
          O : /[\xD2-\xD6]/g,
          u : /[\xF9-\xFC]/g,
          U : /[\xD9-\xDC]/g,
          c : /\xE7/g,
          C : /\xC7/g,
          n : /\xF1/g,
          N : /\xD1/g
      };
  
      for ( var letra in mapaAcentosHex ) {
          var expressaoRegular = mapaAcentosHex[letra];
          string = string.replace( expressaoRegular, letra );
      }
  
      return string;
  }

// Retrona a primeira letra maiúscula e as demais minúsculas
function titleize(text) {
    try {
        var words = text.toLowerCase().split(" ");
        for (var a = 0; a < words.length; a++) {
            var w = words[a];

            if (w[0] != undefined) {
                words[a] = w[0].toUpperCase() + w.slice(1);
            }
        }
    
        return words.join(" ").trim();
    } catch (error) {
        console.log(error);
    }
}

function cnpjMask(cnpj) {
    if (cnpj) {
        cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }

    return cnpj;
}

function ieMask(ie) {
    if (ie) {
        ie = ie.replace(/^(\d{7})(\d{2})/, "$1-$2");
    }

    return ie;
}

function telMask(tel) {
    if (tel) {
        const size = tel.length
        var regExp = '';
    
        if (size > 10) {
            regExp = /^(\d{2})(\d{5})(\d{4})/
        }
        else {
            regExp = /^(\d{2})(\d{4})(\d{4})/
        }
    
        tel = tel.replace(regExp, "($1) $2-$3");
    }

    return tel;
}

function getMeses() {
    return [
        {id: 1, nome: 'Janeiro'},
        {id: 2, nome: 'Fevereiro'},
        {id: 3, nome: 'Março'},
        {id: 4, nome: 'Abril'},
        {id: 5, nome: 'Maio'},
        {id: 6, nome: 'Junho'},
        {id: 7, nome: 'Julho'},
        {id: 8, nome: 'Agosto'},
        {id: 9, nome: 'Setembro'},
        {id: 10, nome: 'Outubro'},
        {id: 11, nome: 'Novembro'},
        {id: 12, nome: 'Dezembro'},
    ]
}

function getAnos() {
    const anoAtual = new Date().getFullYear();
    var anos = [];

    anos.push(anoAtual);

    for(var i = 1; i <= 2; i++) {
        anos.push(anoAtual-i);
        anos.push(anoAtual+i);
    }

    anos.sort(function compare(a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    return anos;
}

//Recebe um parâmetro do tipo Date e retorna uma data no 
//formato string dd/mm/aaaa ou dd/mm/aaa hh:mm:ss
function dateFormat(date, showTime = false){
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    //var dateFormat = new Date(year, month, day, 0, 0, 0, 0);

    day = day < 10 ? "0"+day : day;
    month = month < 10 ? "0"+month : month;
    hour = hour < 10 ? "0"+hour : hour;
    minutes = minutes < 10 ? "0"+minutes : minutes;
    seconds = seconds < 10 ? "0"+seconds : seconds;

    if (showTime) {
        return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
    }
    else {
        return `${day}/${month}/${year}`;
    }
}

module.exports = {
    onlyNumbers,
    orderByName,
    removeSpecialCharacters,
    titleize,
    removeAccents,
    cnpjMask,
    ieMask,
    telMask, 
    getMeses,
    getAnos,
    dateFormat
};