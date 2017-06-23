angular.module('stats', [])

.config(function StatsRoutes($stateProvider) {
    $stateProvider

    .state('stats', { abstract: true, parent: 'admin', url: '/stats' })

    .state('stats.actions', {
        url: '/actions?{id:int}&{name:string}&{start:string}&{end:string}&{time:int}&{page:int}&{size:int}',
        params: {
            id:    null,
            name:  null,
            start: { value: moment().subtract(1, 'days').format('YYYY-MM-DD'), squash: true },
            end: { value: null, squash: true },
            time: null,
            url:   { value: '/', squash: true },
            page:  { value: 1, squash: true },
            size:  { value: 10, squash: true }
        },
        views: {
            'main@admin': {
                templateUrl: 'admin/stats/actions.html',
                controller: 'StatsActionController as vm',
                resolve: {
                    actions: function(Stats, $stateParams) {
                        return Stats.userActions({
                            userId: $stateParams.id,
                            userName: $stateParams.name,
                            createDate: $stateParams.start,
                            endDate: $stateParams.end,
                            consumeTime: $stateParams.time,
                            url: $stateParams.url,
                            pagination: {
                                currentPage: $stateParams.page,
                                pageSize: $stateParams.size
                            }
                        })
                    }
                }
            }
        }
    })

    .state('stats.system', {
        url: '/system?{message:string}&{name:string}&{start:string}&{page:int}&{size:int}',
        params: {
            message: null,
            name: null,
            start: { value: moment().subtract(1, 'days').format('YYYY-MM-DD'), squash: true },
            url:   { value: '/', squash: true },
            page:  { value: 1, squash: true },
            size:  { value: 10, squash: true }
        },
        views: {
            'main@admin': {
                templateUrl: 'admin/stats/system.html',
                controller: 'StatsSystemController as vm',
                resolve: {
                    records: function(Stats, $stateParams) {
                        return Stats.system({
                            createDate: $stateParams.start,
                            url: $stateParams.url,
                            userName: $stateParams.name,
                            errorMessage: $stateParams.message,
                            pagination: {
                                currentPage: $stateParams.page,
                                pageSize: $stateParams.size
                            }
                        })
                    }
                }
            }
        }
    })

        .state('stats.online', {
            url: '/online',
            views: {
                'main@admin': {
                    templateUrl: 'admin/stats/online.html',
                    controller: 'StatsOnlineController as vm'
                }
            }
        })

    .state('stats.vphs', {
        url: '/vphs?{date:string}&{page:int}&{size:int}',
        params: {
            date: { value: moment().format('YYYY-MM-DD'), squash: true },
            page: { value: 1, squash: true },
            size: { value: 24, squash: true }
        },
        views: {
            'main@admin': {
                templateUrl: 'admin/stats/vphs.html',
                controller: 'StatsVPHsController as vm'
            }
        }
    })

    .state('stats.bm', {
        url: '/bm?{start:string}&{end:string}',
        params: {
            start: { value: moment().subtract(1, 'days').format('YYYY-MM-DD'), squash: true },
            end: { value: moment().format('YYYY-MM-DD'), squash: true }
        },
        views: {
            'main@admin': {
                templateUrl: 'admin/stats/bm.html',
                controller: 'StatsBMController as vm'
            }
        }
    })
})

.service('Stats', StatsModel)

.controller('StatsActionController', StatsActionController)
.controller('StatsOnlineController', StatsOnlineController)
.controller('StatsSystemController', StatsSystemController)
.controller('StatsVPHsController', StatsVPHsController)
.controller('StatsBMController', StatsBMController)
