/**
 * Created by TheAnonymous on 05/03/17.
 */
angular
    .module('starterApp', ['ngMaterial', 'SetteInLatinoModule']).config(['$mdThemingProvider',function($mdThemingProvider) {

    $mdThemingProvider.theme('default')
        .primaryPalette('brown')
        .accentPalette('red');

    $mdThemingProvider.theme('yellow').backgroundPalette('yellow').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
}]);