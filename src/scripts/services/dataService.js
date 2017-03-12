/**
 * Created by TheAnonymous on 25/04/16.
 */

app.service('dataService', function($http, ENDPOINTS) {

    this.indicizzaAppuntiVeloci = function(){
        return $http({
            method: 'GET'
            ,url: ENDPOINTS.BASE_EP + ENDPOINTS.API_VERSION_LOCATION + ENDPOINTS.PAGE_AP_LISTA_VELOCI
        })
    };

    this.indicizzaTipologieApprofondimenti = function(){
        return $http({
            method: 'GET'
            ,url: ENDPOINTS.BASE_EP + ENDPOINTS.API_VERSION_LOCATION + ENDPOINTS.PAGE_AP_LISTA_TIPOLOGIE
        })
    };

    this.downloadApprofondimenti = function(){
        return $http({
            method: 'GET'
            ,url: ENDPOINTS.BASE_EP + ENDPOINTS.API_VERSION_LOCATION + ENDPOINTS.PAGE_AP_LISTA_AVANZATI
        })
    }

    /**
     * non prende input e fa una call che restituisce la lista dei lemmi del vocabolario (per cache dizionario)
     */
    //this.indicizzaDizionario = function(){
    //    return $http({
    //       method: 'GET',
    //        url: 'http://7inlatino.semproxlab.it/api/v0.1/DZ-lista-lemmi.php'
    //    });
    //};

    this.infiniteScrollDizionario = function(obj){
        var num = obj.num || 0;
        var word = obj.word || "";
        return $http({
            method: 'GET'
            ,url: ENDPOINTS.BASE_EP + ENDPOINTS.API_VERSION_LOCATION + ENDPOINTS.PAGE_DZ_LISTA_LEMMI
            ,params:{num:num,word:word}
        });
    };

    this.downloadVocaboloInfo = function(obj){
        var id = obj.id || "";
        return $http({
            method: 'GET'
            ,url: ENDPOINTS.BASE_EP + ENDPOINTS.API_VERSION_LOCATION + ENDPOINTS.PAGE_DZ_DETTAGLIO_LEMMA
            ,params:{lemma:id}
        });
    };

    /**
     * Non prende input e fa una call che restituisce la lista degli autori (per cache versioni)
     */
    this.indicizzaAutori = function(){
        return $http({
            method: 'GET'
            ,url: ENDPOINTS.BASE_EP + ENDPOINTS.API_VERSION_LOCATION + ENDPOINTS.PAGE_VS_LISTA_AUTORI
        });
    };

    /**
     * prende in input le parole cercate dall'utente e ritorna un promise con la lista delle versioni che matchano la query
     */
    this.cercaVersioni= function (obj){
        obj  = obj || {};
        var paroleRicerca = obj.paroleRicerca || "";
        var hash = obj.hash || "";
        return $http({
            method: 'GET'
            ,url: ENDPOINTS.BASE_EP + ENDPOINTS.API_VERSION_LOCATION + ENDPOINTS.PAGE_VS_LISTA_VERSIONI
            ,params:{words:paroleRicerca,hash:hash}
        });
    };

    /**
     * Non prende input e fa una call che restituisce la lista dei libri (per cache esercizi)
     */
    this.indicizzaLibri = function(){
        return $http({
            method: 'GET'
            ,url: ENDPOINTS.BASE_EP + ENDPOINTS.API_VERSION_LOCATION + ENDPOINTS.PAGE_ES_LISTA_LIBRI
        });
    };

    /**
     * prende in input l'id di un libri e fa una call che ritorna la lista degli esercizi di quel libro indicato
     */
    this.listaEsercizi = function(obj){
        var libroID = obj.libroID || "";
        return $http({
            method: 'GET'
            ,url: ENDPOINTS.BASE_EP + ENDPOINTS.API_VERSION_LOCATION + ENDPOINTS.PAGE_ES_LISTA_ESERCIZI
            ,params:{book:libroID}
        })
    };

    /**
     * prende in input l'hashID di un esercizio e fa una call che restituisce il dettaglio dell'esercizio indicato
     */
    this.downloadEsercizio = function(obj){
        var esercizioID = obj.esercizioID || "";
        return $http({
            method: 'GET'
            ,url: ENDPOINTS.BASE_EP + ENDPOINTS.API_VERSION_LOCATION + ENDPOINTS.PAGE_ES_DETTAGLIO_ESERCIZIO
            ,params:{exercise:esercizioID}
        })
    };

});