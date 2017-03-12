/**
 * Created by TheAnonymous on 03/05/16.
 */

app.controller('DizionarioCtrl', function ($scope, $filter, $mdDialog, dataService, commonObjectService) {
    $scope.dettaglio = function(obj){
        var id = obj.id || "";
        var event = obj.event;
        var nome = obj.nome || "";

        var filtroResult = $filter('filter')($scope.listaVocaboli.items, {id :id});

        if (filtroResult[0] != null && !filtroResult[0].dettaglio) {
            console.log(id);
            dataService.downloadVocaboloInfo({id:id})
                .then(
                //SUCCESS
                function successCallback(response) {
                    //var filtroResult = $filter('filter')($scope.listaVocaboli.items, {id :obj.id});
                    //filtroResult[0].dettaglio = response.data;
                    commonObjectService.vocaboloSelezionato =  angular.copy(response.data);
                    commonObjectService.vocaboloSelezionato.lemma.nome  = nome;

                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: '../..//views/dizionarioDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: event
                    })
                        .then(function(answer) {
                            $scope.status = 'You said the information was "' + answer + '".';
                        }, function() {
                            $scope.status = 'You cancelled the dialog.';
                        });



                },
                //ERROR
                commonObjectService.errorFn
            );
        }
    };




    $scope.cerca = function(){
        $scope.listaVocaboli.numLoaded_ = 0;
        $scope.listaVocaboli.toLoad_ = 0;
        $scope.listaVocaboli.items.length = 0;
        $scope.listaVocaboli.stop = false;
        dataService.infiniteScrollDizionario({word:$scope.parola,num:$scope.listaVocaboli.toLoad_})
            .then(
            //SUCCESS
            function successCallback(response) {
                if (response.data.length > 0) {
                    $scope.listaVocaboli.items = $scope.listaVocaboli.items.concat(response.data);
                    $scope.listaVocaboli.numLoaded_ += response.data.length;
                }
                else{
                    $scope.listaVocaboli.stop = true;
                }
            },
            commonObjectService.errorFn
        );
    };

    $scope.listaVocaboli = {
        numLoaded_: 0,
        toLoad_: 0,
        items: [],
        stop: false,
        getItemAtIndex: __getItemAtIndex,
        getLength: __getLength,
        fetchMoreItems_: __fetchMoreItems
    };

    function __fetchMoreItems(index) {
        if ($scope.listaVocaboli.toLoad_ < index && !$scope.listaVocaboli.stop) {
            dataService.infiniteScrollDizionario({word:$scope.parola,num:$scope.listaVocaboli.toLoad_})
                .then(
                //SUCCESS
                function successCallback(response) {
                    if (response.data.length > 0) {
                        $scope.listaVocaboli.items = $scope.listaVocaboli.items.concat(response.data);
                        $scope.listaVocaboli.numLoaded_ += response.data.length;
                    }
                    else{
                        $scope.listaVocaboli.stop = true;
                    }
                },
                //ERROR
                commonObjectService.errorFn
                );
                $scope.listaVocaboli.toLoad_ += 5;
        }
    }

    function __getLength() {
        return $scope.listaVocaboli.numLoaded_ + 5;
    }

    function __getItemAtIndex(index) {
        if (index > $scope.listaVocaboli.numLoaded_) {
            $scope.listaVocaboli.fetchMoreItems_(index);
            return null;
        }
        return $scope.listaVocaboli.items[index];
    }


    function DialogController($scope, $mdDialog,commonObjectService) {
        $scope.vocabolo = commonObjectService.vocaboloSelezionato;

        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }
});