app.controller('setteInLatinoCtrl', function ($scope, $timeout, $mdSidenav, $mdDialog, $log,dataService,commonObjectService,GENERICHE) {
    $scope.onSwipeRight = buildDelayedToggler('leftMenu');
    $scope.$on('$routeChangeStart', function(next, current) {
        $mdSidenav('leftMenu').close()
            .then(function () {
                $log.debug("chiuso menu");
            });
    });

    var exercises= JSON.parse(window.localStorage[GENERICHE.ESERCIZI] || "[]") || [];
    if (exercises.length > 0) {
        commonObjectService.listaLibri = exercises;
    }
    else {
        dataService.indicizzaLibri()
            .then(
            //SUCCESS
            function successCallback(response) {
                console.log(angular.toJson(response.data));
                commonObjectService.listaLibri = angular.copy(response.data);
                window.localStorage[GENERICHE.ESERCIZI] = JSON.stringify(response.data);
            },
            //ERROR
            commonObjectService.errorFn
        );
    }

    var authors= JSON.parse(window.localStorage[GENERICHE.AUTORI] || "[]") || [];
    if (authors.length > 0) {
        commonObjectService.listaAutori = authors;
    }
    else {
        dataService.indicizzaAutori()
            .then(
            //SUCCESS
            function successCallback(response) {
                console.log(angular.toJson(response.data));
                commonObjectService.listaAutori = angular.copy(response.data);
                window.localStorage[GENERICHE.AUTORI] = JSON.stringify(response.data);
            },
            //ERROR
            commonObjectService.errorFn
        );
    }
    var quickNotes = JSON.parse(window.localStorage[GENERICHE.APPUNTI_VELOCI] || "[]") || [];
    if (quickNotes.length > 0){
        commonObjectService.listaAppuntiVeloci = quickNotes;
    }
    else {
        dataService.indicizzaAppuntiVeloci()
            .then(
            //SUCCESS
            function successCallback(response) {
                console.log(angular.toJson(response.data));
                commonObjectService.listaAppuntiVeloci = angular.copy(response.data);
                window.localStorage[GENERICHE.APPUNTI_VELOCI] = JSON.stringify(response.data);
            },
            //ERROR
            commonObjectService.errorFn
        );
    }


/*
    var vocabolous= JSON.parse(window.localStorage['vocabolous'] || "[]") || [];
    if (vocabolous.length > 0) {
        commonObjectService.listaVocaboli = vocabolous;
    }
    else {

        dataService.indicizzaDizionario()
            .then(
            //SUCCESS
            function successCallback(response) {
                console.log(angular.toJson(response.data));
                commonObjectService.listaVocaboli = angular.copy(response.data);
                window.localStorage['vocabolous'] = JSON.stringify(response.data);
            },
            //ERROR
            function errorCallback(response) {
                console.log("error");
                $mdDialog.show(
                    $mdDialog.alert()
                        .title('Ops. Si è verificato un problema!')
                        .content("C'è stato un problema con l'indicizzazione dei libri")
                        .ok('OK!')
                )
            });
    }
*/
    $scope.isOpenLeftMenu = function(){
        return $mdSidenav('leftMenu').isOpen();
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
        var timer;
        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
        return debounce(buildToggler(navID), 200);
    }
    function buildToggler(navID) {
        return function() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }
    }
});