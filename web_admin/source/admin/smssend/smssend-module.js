angular.module('smssend', [])

.config(function SmssendRoutes($stateProvider) {
    $stateProvider.state('smssend', {
        parent: 'admin',
        url: '/smssend?{content:string}&{page:int}&{size:int}',
        params: {
            page: { value: 1, squash: true },
            size: { value: 10, squash: true }
        },
        views: {
            'main@admin': {
                templateUrl: 'admin/smssend/list.html',
                controller: 'SmssendController as vm',
                resolve: {
                    initialList: function(Smssend, $stateParams) {
                        return Smssend.search({
                            content: $stateParams.content,
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

.service('Smssend', SmssendModel)

.controller('SmssendController', SmssendController)
