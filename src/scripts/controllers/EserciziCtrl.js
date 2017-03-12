/**
 * Created by TheAnonymous on 25/04/16.
 */

app.controller('EserciziCtrl', function ($scope, $log, $mdDialog, dataService, commonObjectService,GENERICHE) {

    $scope.listaLibri = commonObjectService.listaLibri;
    //$scope.libroSelezionato = null;
    $scope.models= {selectLibri:"",searchText:""};
    $scope.selezionaLibro = function(obj){
        //var indice = obj.index;
        var id = obj.id;
        //var libroSelezionato = obj.id;
      //  $scope.libroSelezionato = libroSelezionato || $scope.listaLibri[indice].id;
        $scope.svolgimento ="<p></p>";
        $scope.models.searchText = "";
        //dataService.listaEsercizi({libroID:$scope.libroSelezionato})
        dataService.listaEsercizi({libroID:id})
            .then(
            //SUCCESS
            function successCallback(response) {
                console.log(angular.toJson(response.data));
                $scope.jsonResponse =response.data;
            },
            //ERROR
            function errorCallback(response) {
                console.log("error");
                $mdDialog.show(
                    $mdDialog.alert()
                        .title('Ops. Si è verificato un problema!')
                        .content(angular.toJson(response))
                        .ok('OK!')
                )
            });
    };

    $scope.filtra   =  function(query) {
        return query ? $scope.jsonResponse.filter(createFilterFor(query)) : $scope.jsonResponse;
    };
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(exercise) {

            return angular.lowercase(exercise.dettaglio).replace(".","").replace(",","").indexOf(lowercaseQuery) >= 0
                ? true
                : angular.lowercase(exercise.titolo).replace(".","").replace(",","").indexOf(lowercaseQuery) >= 0;
        };
    }

    $scope.esercizioSelezionatoFn = function(item){
        if (item == undefined || item.id == undefined){
            console.log("item null");
        }
        else {
            dataService.downloadEsercizio({esercizioID: item.id})
                .then(
                //SUCCESS
                function successCallback(response) {
                    console.log(angular.toJson(response.data));
                    if (response.data != undefined)
                        $scope.svolgimento = response.data[GENERICHE.ESERCIZIO_SVOLGIMENTO].replace(/\n/g, '<br />');
                    else {
                        console.log("response null");
                    }
                },
                //ERROR
                function errorCallback(response) {
                    console.log("error");
                    $mdDialog.show(
                        $mdDialog.alert()
                            .title('Ops. Si è verificato un problema!')
                            .content(angular.toJson(response))
                            .ok('OK!')
                    )
                });
        }
    }

});