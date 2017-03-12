/**
 * Created by TheAnonymous on 25/04/16.
 */

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/versioni', {
                templateUrl: 'src/views/versioni.html',
                controller: 'VersioniCtrl'
            }).
            when('/esercizi', {
                templateUrl: 'src/views/esercizi.html',
                controller: 'EserciziCtrl'
            }).
            when('/dizionario', {
                templateUrl: 'src/views/dizionario.html',
                controller: 'DizionarioCtrl'
            }).
        /*   when('/appunti', {
                templateUrl: 'src/views/appunti.html',
                controller: 'AppuntiCtrl'
            }).
         */
            when('/approfondimenti', {
                templateUrl: 'src/views/approfondimenti.html',
                controller: 'ApprofondimentiCtrl'
            }).
        /*
            when('/declinazioni', {
                templateUrl: 'src/views/declinazioni.html',
                controller: 'DeclinazioniCtrl'
            }).
            when('/coniugazioni', {
                templateUrl: 'src/views/coniugazioni.html',
                controller: 'ConiugazioniCtrl'
            }).
        */
            when('/login',{
                templateUrl:'src/views/fb_login.html',
                controller: 'FBLoginCtrl'
            }).
            when('/profInArrivo',{
                templateUrl:'src/views/profInArrivo.html',
                controller:'ProfInArrivoCtrl'
            }).
            otherwise({
                templateUrl: 'src/views/default.html'
            });
    }]);