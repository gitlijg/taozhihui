angular.module('appStat', [])

.config(function AppStatRoutes($stateProvider) {
    $stateProvider.state('appStat', {
        parent: 'admin',
        url: '/appStat?{pageNumber:int}&{pageSize:int}',
        params:{
            pageNumber:{ value: 1, squash: true },
            pageSize:{ value: 10, squash: true }
        },
        views: {
            'main@admin': {
                templateUrl: 'admin/appStat/list.html',
                controller: 'AppStatController as vm',
                resolve: {
                    initialList: function(AppStat, $stateParams) {
                        return AppStat.stat({
                            pageInfo: {
                                pageSize: $stateParams.pageSize,
                                pageNumber: $stateParams.pageNumber
                            }
                        })
                    }
                }
            }
        }
    })
})

.service('AppStat', AppStatModel)

.controller('AppStatController', AppStatController)
