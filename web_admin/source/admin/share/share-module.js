angular.module('share', [])

.config(function ShareRoutes($stateProvider) {
    $stateProvider.state('share', {
        parent: 'admin',
        url: '/share?{query:string}&{page:int}&{size:int}',
        params: {
            page: { value: 1, squash: true },
            size: { value: 60, squash: true }
        },
        views: {
            'main': {
                templateUrl: 'admin/share/list.html',
                controller: 'ShareController as vm',
                resolve: {
                    blogs: function(Share, $stateParams) {
                        return Share.search({
                            titleName: $stateParams.query,
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
})
.service('Share', ShareModel)
.controller('ShareController', ShareController)
