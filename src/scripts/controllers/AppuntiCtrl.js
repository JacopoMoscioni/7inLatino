/**
 * Created by TheAnonymous on 06/05/16.
 */

app.controller('AppuntiCtrl', function ($scope,$mdDialog, commonObjectService) {
    $scope.listaAppunti = commonObjectService.listaAppuntiVeloci;
    $scope.open = function(obj){
        var indice = obj.index || 0;
        var event = obj.event;
        var itemObj = obj.itemObj || {};

            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .clickOutsideToClose(true)
                    .title(itemObj.titolo)
                    .textContent(itemObj.contenuto)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('CHIUDI')
                    .targetEvent(event)
            );
        };
});