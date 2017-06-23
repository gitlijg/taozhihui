angular.module('notices', [])

.config(function NoticesRoutes($stateProvider) {
    $stateProvider.state('notices', {
        parent: 'admin',
        url: '/notices?{query:string}&{type:string}&{page:int}&{size:int}',
        params: {
            query: null,
            type: null,
            page: { value: 1, squash: true },
            size: { value: 10, squash: true }
        },
        views: {
            'main': {
                templateUrl: 'admin/notices/list.html',
                controller: 'NoticesController as vm',
                resolve: {
                    notices: function(Notice, $stateParams) {
                        return Notice.search({
                            noticeTitle: $stateParams.query,
                            noticeType: $stateParams.type,
                            pageInfo: {
                                pageSize: $stateParams.size,
                                pageNumber: $stateParams.page
                            }
                        })
                    },
                    types: function(Notice) {
                        return Notice.types().$promise.then(function(response) {
                            return _.map(
                                _.groupBy(response, function(value) {
                                    if (_.isString(value)) return 'content'
                                })['content'],
                                function(value, index) { return { id: index + 1, text: value } }
                            )
                        })
                    }
                }
            }
        }
    })
})

.service('Notice', NoticeModel)

.controller('NoticesController', NoticesController)
