/**
 * Created by TheAnonymous on 25/04/16.
 */

app.controller('VersioniCtrl', function ($scope, $log, $mdDialog, $location, dataService,commonObjectService) {
    $scope.models= {paroleRicerca:""};
    $scope.jsonResponse = [];
    var hash = undefined;
    if ($location.search() != undefined) {
        hash = $location.search().hash;
        cerca($scope,$mdDialog,dataService,commonObjectService,DialogController,{hash:hash});
    }

    //esposto nello scope per accesso da html
    $scope.cerca = function(){
        cerca($scope,$mdDialog,dataService,commonObjectService,DialogController,{paroleRicerca:$scope.models.paroleRicerca});
    };
});

/* logics */

function DialogController($scope, $mdDialog,commonObjectService) {
    $scope.traduzione = commonObjectService.versioneSelezionata.italiano;
    $scope.originale = commonObjectService.versioneSelezionata.latino;
    $scope.titolo = commonObjectService.versioneSelezionata.titolo;
    $scope.autore = commonObjectService.versioneSelezionata.autore;
    $scope.profInArrivo = false;
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
    $scope.profInArrivoFn = function(){
        console.log("ciao");
        $scope.profInArrivo = true;
    }
}

var cerca = function($scope,$mdDialog,dataService,commonObjectService,DialogController,object){
    dataService.cercaVersioni(object)
        .then(
        //SUCCESS
        function successCallback(response) {
            console.log("answer:"+angular.toJson(response.data));
            $scope.models.paroleRicerca = response.data.query;
            $scope.jsonResponse =response.data.results;
        },
        //ERROR
        function errorCallback(response) {
            console.log("error");
            $mdDialog.show(
                $mdDialog.alert()
                    .title('Ops. Si è verificato un problema!')
                    .content("jdsfs")
                    .ok('OK!')
            )
        });

    $scope.showTabDialog = function(obj) {
        ev = obj.ev;
        index = obj.index || 0;

        commonObjectService.versioneSelezionata.italiano = $scope.jsonResponse[index].italiano;
        commonObjectService.versioneSelezionata.latino = $scope.jsonResponse[index].latino;
        commonObjectService.versioneSelezionata.titolo = $scope.jsonResponse[index].titolo;
        if($scope.jsonResponse[index] != undefined)
            commonObjectService.versioneSelezionata.autore = commonObjectService.retrieveAuthorName($scope.jsonResponse[index].autoreID);
        else
            commonObjectService.versioneSelezionata.autore = "Autore sconosciuto";
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'src/views/versioniDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };
};