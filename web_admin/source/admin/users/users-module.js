angular.module('users', [])

.config(function UsersRoutes($stateProvider) {
    $stateProvider

    .state('users', {
        parent: 'admin',
        url: '/users?{page:int}&{size:int}&{id:int}&name&lastLoginTime',
        params: {
            page: { value: 1, squash: true },
            size: { value: 10, squash: true }
        },
        views: {
            'main': {
                templateUrl: 'admin/users/list.html',
                controller: 'UsersController as vm',
                resolve: {
                    users: function(User, $stateParams) {
                        var param = {
                            lastLoginTime: $stateParams.lastLoginTime,
                            loginName: $stateParams.name,
                            pageInfo: {
                                pageNumber: $stateParams.page,
                                pageSize: $stateParams.size
                            }
                        }
                        if($stateParams.id){
                            param.id = $stateParams.id
                            delete $stateParams.id
                        }
                        return User.search(param)
                    },
                    roles: function(Role, $stateParams) {
                        return Role.search({
                            pageInfo: { pageSize: $stateParams.size }
                        }).$promise
                        .then(function(response) { return response.content })
                    }
                }
            }
        }
    })
})

.service('User', UserModel)

.controller('UsersController', UsersController)
