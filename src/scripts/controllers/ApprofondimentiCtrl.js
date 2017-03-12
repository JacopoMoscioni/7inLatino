/**
 * Created by TheAnonymous on 06/05/16.
 */

app.controller('ApprofondimentiCtrl', function ($scope, $mdDialog, $filter, commonObjectService,dataService) {

    //$scope.listaDownloaded = commonObjectService.listaAppuntiVeloci;
    dataService.downloadApprofondimenti()
        .then(
        //SUCCESS
        function successCallback(response) {
            $scope.listaDownloaded =  response.data;
            angular.extend($scope.listaDownloaded,commonObjectService.listaAppuntiVeloci);
           // $scope.listaDownloaded = $filter('orderBy')($scope.listaDownloaded,'titolo');
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


    $scope.open = function(obj){
        var indice = obj.indice || 0;
        var event = obj.event;
        var itemObj = obj.itemObj || {};
        commonObjectService.approfondimentoSelezionato.titolo = itemObj.titolo;
        commonObjectService.approfondimentoSelezionato.contenuto = itemObj.contenuto;

        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'src/views/approfondimentiDialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true

    })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            }
        );
    };

    function DialogController($scope, $mdDialog,commonObjectService) {
        $scope.titolo =  commonObjectService.approfondimentoSelezionato.titolo;
        $scope.contenuto =  commonObjectService.approfondimentoSelezionato.contenuto;

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