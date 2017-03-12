(function(){

    angular
        .module('7inLatino')
        .controller('qrController', [
            '$mdSidenav', '$mdBottomSheet', '$log', '$q',"$scope","$http","$mdDialog",
            qrController
        ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */


    function qrController( $mdSidenav, $mdBottomSheet, $log, $q,$scope,$http,$mdDialog) {
        $scope.models= {};
        $scope.models.cod= "";
        $scope.qr_code = "http://qrickit.com/api/qr?txtcolor=442EFF&fgdcolor=76103C&bgdcolor=C0F912&logotext=SOApass&qrsize=640&t=p&e=m";
        $scope.azione= function (id){
            var metodo = null;
            var url = null;
            var parametri = {}
            switch(id){
                case 'login':
                    url = 'http://www.soa.semproxlab.it/EXTERNAL/login.php';
                    parametri = {username:$scope.models.username,password:$scope.models.password};

                    $http({
                        method:'GET',
                        url:url,
                        params:parametri
                    }).then(
                        //SUCCESS
                        function successCallback(response) {
                            //console.log(angular.toJson(response));
                            if (response.data.hasOwnProperty('token') && response.data['token'] != "" ){
                                $scope.models['token'] = response.data['token'];
                                console.log(response.data.token);
                                $scope.azione('photo');
                            }
                        },
                        //ERROR
                        function errorCallback(response) {
                            console.log(angular.toJson(response));
                            //TODO:alert

                        });


                    break;
                case 'photo':
                    url = 'http://www.soa.semproxlab.it/EXTERNAL/photo.php';
                    parametri={token:$scope.models.token};
                    $http({
                        method:'GET',
                        url:url,
                        params:parametri
                    }).then(
                        //SUCCESS
                        function successCallback(response) {
                            if (response.data.hasOwnProperty('photo') && response.data['photo'] != ""
                                && (response.data['photo'] == null || response.data['token'] == 'photo')){
                                $scope.models['photo'] = response.data['photo'];
                                console.log("asd"+$scope.models['photo']);
                                $scope.models['studente'] = response.data.hasOwnProperty('cn') ? response.data['cn'] : "noname";
                                console.log(response.data.cn);
                                $scope.azione('qr');

                            }


                        },
                        //ERROR
                        function errorCallback(response) {
                            console.log(angular.toJson(response));
                            //TODO:alert

                        });
                    break;
                case 'qr':
                    url = 'http://www.soa.semproxlab.it/EXTERNAL/access.php';
                    parametri={token:$scope.models.token};
                    $http({
                        method:'GET',
                        url:url,
                        params:parametri
                    }).then(
                        //SUCCESS
                        function successCallback(response) {
                            //console.log(angular.toJson(response));
                            if (response.data.hasOwnProperty('message') && response.data['message'] != ""
                            && (response.data['token'] == null || response.data['token'] == 'null')){
                                $scope.models.cod = response.data['message'];
                                console.log("asd"+$scope.models.cod);
                            }
                        },
                        //ERROR
                        function errorCallback(response) {
                            console.log(angular.toJson(response));
                            //TODO:alert

                        });
                    break;
            }

        };

    }

})();