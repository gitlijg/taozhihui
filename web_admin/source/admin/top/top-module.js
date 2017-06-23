angular.module('top', [])

.config(function TopRoutes($stateProvider) {
    $stateProvider.state('tops', {
        parent: 'admin',
        url: '/top',
        views: {
            'main': {
                templateUrl: 'admin/top/list.html',
                controller: 'TopController as vm',
                resolve: {
                    topList: function(Top, $stateParams) {
                        return Top.search()
                    }
                }
            }
        }
    })
})

.service('Top', TopModel)

.controller('TopController', TopController)
