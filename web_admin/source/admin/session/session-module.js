angular.module('session', [])

.config(function SessionRoute($stateProvider) {
    $stateProvider

    .state('session', {
        abstract: true,
        template: '<main ui-view></main>'
    })

    .state('session.signin', {
        url: '/signin?{referer:string}',
        params: { value: '%2F', squash: true },
        templateUrl: 'admin/session/signin.html',
        controller: 'SigninController as vm'
    })
})

.controller('SigninController', SigninController)
