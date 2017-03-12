/**
 * Created by TheAnonymous on 25/04/16.
 */
app.service('commonObjectService', function($filter,$mdDialog,dataService) {
    this.listaAutori = [];
    this.listaLibri = [];
    this.listaVocaboli = []; //forse non più usata perché utilizzata la tecnica dell'infinite scrolling e quindi non vengono più indicizzati all'avvio
    this.listaAppuntiVeloci = [];
    this.versioneSelezionata = {italiano:'',latino:'',titolo:'',autore:''}; //to be shared with the dialog controller
    this.approfondimentoSelezionato = {titolo:'', contenuto: ''} //to be shared with the dialog controller
    this.vocaboloSelezionato = {}; //to be shared with the dialog controller

    //this.esercizioSelezionato = {id:'',titolo:'',dettaglio:''};

    this.retrieveAuthorName = function(authorID){
        var filter = $filter('filter')(this.listaAutori, {id :authorID});
        if (filter != undefined)
            return $filter('filter')(this.listaAutori, {id :authorID})[0]['nome'];
        else
            return "Autore sconosciuto";
    }

    this.errorFn = function(response){
        console.log("error");
        $mdDialog.show(
            $mdDialog.alert()
                .title('Ops.')
                .content("Si è verificato un problema di configurazione")
                .ok('OK!')
        )
    }
});