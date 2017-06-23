angular.module('teams', [])

.config(function TeamsRoute($stateProvider) {
    $stateProvider

    .state('teams', {
        parent: 'admin',
        url: '/teams?{query:string}&{page:int}&{size:int}',
        params: {
            query: null,
            page: { value: 1, squash: true },
            size: { value: 10, squash: true }
        },
        views: {
            'main': {
                templateUrl: 'admin/teams/list.html',
                controller: 'TeamsController as vm',
                resolve: {
                    teams: function(Team, $stateParams) {
                        return Team.search({
                            teamName: $stateParams.query,
                            firstLetter: $stateParams.query,
                            pageInfo: {
                                pageSize: $stateParams.size,
                                pageNumber: $stateParams.page
                            }
                        })
                    }
                }
            }
        }
    })

    .state('teams.show', {
        url: '^/teams/:id',
        views: {
            'main@admin': {
                templateUrl: 'admin/teams/show.html',
                controller: 'TeamController as vm',
                resolve: {
                    team: function(Team, $stateParams) {
                        return Team.get({id: $stateParams.id})
                    }
                }
            }
        }
    })
})

.service('Team', TeamModel)

.controller('TeamsController', TeamsController)
.controller('TeamController', TeamController)
