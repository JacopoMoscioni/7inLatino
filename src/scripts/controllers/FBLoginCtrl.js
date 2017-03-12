/**
 * Created by TheAnonymous on 14/05/16.
 */

app.controller('FBLoginCtrl', function ($scope) {
   $scope.name= "Login please";
    $scope.FBLogin = function(){
        FB.login(function(response) {
            console.log(response);
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                    console.log('Good to see you, ' + response.name + '.');
                    $scope.name = "Ciao "+response.name;
                    var accessToken = FB.getAuthResponse().accessToken;
                    console.log(accessToken);
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    };
});

