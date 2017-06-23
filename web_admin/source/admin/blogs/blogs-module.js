angular.module('blogs', [])

.config(function BlogsRoutes($stateProvider) {
    $stateProvider.state('blogs', {
        parent: 'admin',
        url: '/blogs?{query:string}&{page:int}&{size:int}&{isSignup:int}',
        params: {
            isSignup: 0,
            page: { value: 1, squash: true },
            size: { value: 60, squash: true }
        },
        views: {
            'main': {
                templateUrl: 'admin/blogs/list.html',
                controller: 'BlogsController as vm',
                resolve: {
                    blogs: function(Blog, $stateParams) {
                        return Blog.search({
                            titleName: $stateParams.query,
                            isSignup: $stateParams.isSignup,
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

.service('Blog', BlogModel)

.controller('BlogsController', BlogsController)
