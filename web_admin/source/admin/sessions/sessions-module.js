angular.module('sessions', [])

.config(function SessionsRoutes($stateProvider) {
    $stateProvider.state('sessions', {
        parent: 'admin',
        url: '/sessions',
        views: {
            'main@admin': {
                templateUrl: 'admin/sessions/list.html',
                controller: 'SessionsController as vm'
            }
        }
    })
})

.service('Sessions', SessionsModel)

.controller('SessionsController', SessionsController)
