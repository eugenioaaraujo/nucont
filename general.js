function limparInfo(){
     document.getElementById("retorno").innerHTML = "";
     document.getElementById("string").value = null;
}

function  level1() {
    var string =  document.getElementById("string").value; //pegando a string do campo
    var new_str = '';

    for(l in string){ //percorrer toda string caractere por caractere 
        var i = parseInt(l)
        if (i === string.length || i === 0 ){
            new_str += string[i];
        }
        /* Verifico de se o cactere atual é espaço, se o anterior e o proximo são letras
        */
        if(string[i] == ' ' && (parseInt(string[i-1]) >= 0 || parseInt(string[i+1]) >= 0) ) {
            new_str += '|';
        }
        new_str += string[i];
    }

    var dadosLimpos = new_str.split('|');
    
    this.montaObjArr(dadosLimpos);
   
}

function  level2() {
    var string =  document.getElementById("string").value.trim(); //pegando a string do campo
    var new_str = '';
    string = string.replace(/\s+/g, " "); //removenndo tabulação/espaço multiplo com expressão regular
    
    for(l in string){ //percorrer toda string caractere por caractere 
        var i = parseInt(l)
        if (i === string.length || i === 0 ){
            new_str += string[i];
        }
        /* Verifico de se o cactere atual é espaço, se o anterior e o proximo são letras
        */
        if((string[i] == '	' || string[i] == ' ') && (parseInt(string[i-1]) >= 0 || parseInt(string[i+1]) >= 0) ) {
            new_str += '|';
        }
        new_str += string[i];
    }

    var dadosLimpos = new_str.split('|');
    
    this.montaObjArr(dadosLimpos);
}

function  level3() {
    var string =  document.getElementById("string").value.trim(); //pegando a string do campo
    var new_str = '';
    string = string.replace(/\s+/g, " "); //removenndo tabulação/espaço multiplo com expressão regular
    
    for(l in string){ //percorrer toda string caractere por caractere 
        var i = parseInt(l)
        if (i === string.length || i === 0 ){
            new_str += string[i];
        }
        /* Verifico de se o cactere atual é espaço, se o anterior e o proximo são letras
        */
        if((string[i] == '	' || string[i] == ' ') && (parseInt(string[i-1]) >= 0 || parseInt(string[i+1]) >= 0) ) {
            new_str += '|';
        }
        new_str += string[i];
    }

    var dadosLimpos = new_str.split('|');
    dadosLimpos = dadosLimpos.slice([dadosLimpos.indexOf(' 31/01/2018; Estabelecimento(s): Todos; Centro(s) de Resultados: Todos Conta Descrição Saldo Anterior Débitos Créditos Saldo Atual')+1], [dadosLimpos.length-1]);
   
   this.montaObjArr(dadosLimpos);
}

function  level4() {
    var string =  document.getElementById("string").value.trim(); //pegando a string do campo
    var new_str = '';
    var corte = [];
    var new_dadosLimpos_aux = [];
    var new_dadosLimpos = [];
    
    string = string.replace(/\s+/g, " "); //removenndo tabulação/espaço multiplo com expressão regular
    
    for(l in string){ //percorrer toda string caractere por caractere 
        var i = parseInt(l)
        if (i === string.length || i === 0 ){
            new_str += string[i];
        }
        /* Verifico de se o cactere atual é espaço, se o anterior e o proximo são letras
        */
        if((string[i] == '	' || string[i] == ' ') && (parseInt(string[i-1]) >= 0 || parseInt(string[i+1]) >= 0) ) {
            new_str += '|';
        }
        new_str += string[i];
    }

    var dadosLimpos = new_str.split('|');
    
    dadosLimpos.forEach(function(dado, index){ //buscando posições onde à linha do Cabeçario 
    	if(dado.indexOf('---') > 0){
    		corte.push(index);
    	}
    });
    
    corte = corte.slice([1], [corte.length]);
    
    var contador = 0;
    for(contador; contador < corte.length; contador = contador+2){
        var i = corte[contador]+1;
        var f = corte[contador+1]-3 || corte[corte.length-1]
        new_dadosLimpos_aux.push(dadosLimpos.slice([i],[f]));
        
    }
   new_dadosLimpos_aux.forEach(function(new_dado, index, new_dadosLimpos_aux){
       if(index < new_dadosLimpos_aux.length -2)
        new_dadosLimpos = new_dadosLimpos_aux[index].concat(new_dadosLimpos_aux[index+1]);
   });
   
   this.montaObjArr(new_dadosLimpos);
   
}

function montaObjArr(dadosLimpos){
     var obj = [];
    
    var contador = 0;
    for(contador; contador < dadosLimpos.length; contador = contador+6){
        var ini = contador;
        var fim = contador + 5;
        var dadoLimpo = dadosLimpos.slice([ini],[fim]); // pego o intervalo d valores to array principal para montar o array de objetos
        
        var dado = {
            classifier: dadoLimpo[0],      // string
            description: dadoLimpo[1], // string
            openingBalance: dadoLimpo[2], // number
            debit: dadoLimpo[3],           // number
            credit: dadoLimpo[4],          // number
            finalBalance: dadoLimpo[5],   // number
            parent: null          // null or string of the parent classifier
        };
        obj.push(dado); // concatena objeto com array de retorno
    }
    
    console.log(obj);
    document.getElementById("retorno").innerHTML = JSON.stringify(obj);
}