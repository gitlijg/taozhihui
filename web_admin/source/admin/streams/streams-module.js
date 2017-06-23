angular.module('streams', [])

.config(function StreamsRoutes($stateProvider) {
    $stateProvider.state('streams', {
        parent: 'admin',
        url: '/streams?{title:string}&{name:string}&{page:int}&{size:int}',
        params: {
            title: null,
            name: null,
            page: { value: 1, squash: true },
            size: { value: 10, squash: true }
        },
        views: {
            'main@admin': {
                templateUrl: 'admin/streams/list.html',
                controller: 'StreamsController as vm',
                resolve: {
                    initialList: function(Stream, $stateParams) {
                        return Stream.search({
                            titleName: $stateParams.title,
                            createByName: $stateParams.name,
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

.service('Stream', StreamModel)

.controller('StreamsController', StreamsController)
