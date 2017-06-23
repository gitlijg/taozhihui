angular.module('football', [])

.config(function FootballRoutes($stateProvider) {
    $stateProvider.state('football', {
        parent: 'admin',
        url: '/football?{leagueType:int}&{publishStatus:int}',
        params:{
            leagueType:{ value: 1, squash: true },
            publishStatus:{ value: -1, squash: true }
        },
        views: {
            'main@admin': {
                templateUrl: 'admin/football/list.html',
                controller: 'FootballController as vm',
                resolve: {
                    FootballList: function(Football, $stateParams) {
                        return Football.fixture({
                            leagueType:$stateParams.leagueType,
                            publishStatus:$stateParams.publishStatus
                        })
                    }
                }
            }
        }
    })
})

.service('Football', FootballModel)

.controller('FootballController', FootballController);
