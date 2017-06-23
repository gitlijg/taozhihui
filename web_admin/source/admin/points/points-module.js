angular.module('points', [])

.config(function PointsRoutes($stateProvider) {
    $stateProvider.state('points', {
        abstract: true,
        parent: 'admin',
        url: '/points',
        resolve: {
            pointsList: function(Point) { return Point.getList() }
        }
    })

    .state('points.record', {
        url: '/record?{receiver:int}&{sender:int}&{source:string}&{type:string}&{page:int}&{size:int}',
        params: {
            receiver: null,
            sender: null,
            source: null,
            type: null,
            page: { value: 1, squash: true },
            size: { value: 10, squash: true }
        },
        views: {
            'main@admin': {
                templateUrl: 'admin/points/record.html',
                controller: 'PointsRecordController as vm',
                resolve: {
                    records: function(Point, $stateParams) {
                        return Point.search({
                            receiver: $stateParams.receiver,
                            sender: $stateParams.sender,
                            integralSource: $stateParams.source,
                            integralType: $stateParams.type,
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

    .state('points.config', {
        url: '/config',
        views: {
            'main@admin': {
                templateUrl: 'admin/points/config.html',
                controller: 'PointsConfigController as vm'
            }
        }
    })
})

.service('Point', PointModel)

.controller('PointsRecordController', PointsRecordController)
.controller('PointsConfigController', PointsConfigController)
