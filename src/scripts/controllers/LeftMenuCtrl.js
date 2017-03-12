/**
 * Created by TheAnonymous on 24/04/16.
 */
app.controller('LeftMenuCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('leftMenu').close()
            .then(function () {
                $log.debug("close left is done");
            });
    };

    //var imagePath = 'img/list/60.jpeg';
    var imagePath="";

    $scope.menuList = [
        {
            img : imagePath
            ,title: 'Versioni'
            ,anchor: '#/versioni'
            ,notes: "Cerca la traduzione tra le 13.000 già pronte!"
        }
        ,{
            img : imagePath
            ,title: 'Esercizi'
            ,anchor: '#/esercizi'
            ,notes: "Trova quelli del tuo libro, tra i 9.000 già svolti"
        }
        ,{
            img : imagePath
            ,title: 'Dizionario'
            ,anchor:'#/dizionario'
            ,notes: "Consulta le definizioni di oltre 50.000 lemmi latini"
        }
        /*
        ,{
            img : imagePath
            ,title: 'Appunti'
            ,anchor: '#/appunti'
            ,notes: "Ripassa i concetti base prima dell'interrogazione!"
        }
        */
        ,{
            img : imagePath
            ,title: 'Approfondimenti'
            ,anchor: '#/approfondimenti'
            //,notes: "Studia velocemente e fissa i contenuti!"
            ,notes: "Studia velocemente prima dell'interrogazione!"
        }
        /*
        ,{
            img : imagePath
            ,title: 'Coniugazioni'
            ,anchor: '#/coniugazioni'
            ,notes: "Visiona le coniugazioni dei verbi latini...."
        }
        ,{
            img : imagePath
            ,title: 'Declinazioni'
            ,anchor: '#/declinazioni'
            ,notes: "... o le declinazioni dei nomi!"
        }
        */
    ];
});


