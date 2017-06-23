angular.module('broadcast', [])

.config(function BroadcastRoutes($stateProvider) {
    $stateProvider.state('broadcast', {
        parent: 'admin',
        url: '/broadcast?{contentText}&{refId}',
        views: {
            'main': {
                templateUrl: 'admin/broadcast/form.html',
                controller: 'BroadcastController as vm'
            }
        }
    })
})

.service('Broadcast', BroadcastModel)

.controller('BroadcastController', BroadcastController)
