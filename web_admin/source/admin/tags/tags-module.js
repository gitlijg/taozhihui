angular.module('tags', [])

.config(function TagsRoutes($stateProvider) {
    $stateProvider.state('tags', {
        parent: 'admin',
        url: '/tags?{query:string}&{type:string}&{page:int}&{size:int}',
        params: {
            query: null,
            type: null,
            page: { value: 1, squash: true },
            size: { value: 10, squash: true }
        },
        views: {
            'main': {
                templateUrl: 'admin/tags/list.html',
                controller: 'TagsController as vm',
                resolve: {
                    tags: function(Tag, $stateParams) {
                        return Tag.search({
                            tagName: $stateParams.query,
                            tagDesc: $stateParams.query,
                            tagType: $stateParams.type,
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

.service('Tag', TagModel)

.controller('TagsController', TagsController)
