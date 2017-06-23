angular.module('reports', [])

.config(function ReportsRoute($stateProvider) {
    $stateProvider

    .state('reports', {
        parent: 'admin',
        url: '/reports?{type:string}&{page:int}&{size:int}',
        params: {
            type: {value: 'B',squash: true },
            page: { value: 1, squash: true },
            size: { value: 10, squash: true }
        },
        views: {
            'main': {
                templateUrl: 'admin/report/list.html',
                controller: 'ReportsController as vm',
                resolve: {
                    reports: function(Report, $stateParams) {
                        return Report.search({
                            type: $stateParams.type,
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

    .state('reports.show', {
        url: '^/reports/:reportRefId/:reportRefType',
        views: {
            'main@admin': {
                templateUrl: 'admin/report/show.html',
                controller: 'ReportController as vm',
                resolve: {
                    reportInfoList: function(Report, $stateParams) {
                        return Report.info({
                            reportRefId: $stateParams.reportRefId,
                            reportRefType: $stateParams.reportRefType
                        })
                    }
                }
            }
        }
    })
})

.service('Report', ReportModel)

.controller('ReportsController', ReportsController)
.controller('ReportController', ReportController)
