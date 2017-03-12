var app = angular.module('SetteInLatinoModule', [ 'ngMaterial','ng-mfb','ngRoute','ngSanitize','ds.clock']);
window.fbAsyncInit = function() {
    FB.init({
        appId      : '401259676751506',
        xfbml      : true,
        version    : 'v2.6'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
