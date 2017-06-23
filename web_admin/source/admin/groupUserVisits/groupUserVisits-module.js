angular.module('groupUserVisits', [])

.config(function GroupUserVisitsRoutes($stateProvider) {
    $stateProvider.state('groupUserVisits', {
        parent: 'admin',
        url: '/groupUserVisits?{createDate}&{endDate}',
        views: {
            'main@admin': {
                templateUrl: 'admin/groupUserVisits/list.html',
                controller: 'GroupUserVisitsController as vm'
            }
        }
    })
})

.service('GroupUserVisits', GroupUserVisitsModel)

.controller('GroupUserVisitsController', GroupUserVisitsController)
