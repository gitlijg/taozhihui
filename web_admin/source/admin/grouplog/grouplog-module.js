angular.module('grouplog', [])

.config(function GrouplogRoutes($stateProvider) {
    $stateProvider
    .state('grouplog', {
            url: '/grouplog-list?{userId:int}&{userName:string}&{createDate:string}&{endDate:string}&{consumeTime:int}&{url:string}',
            parent: 'admin',
            params:{
                    url:{ value: '/', squash: true }
            },
            views: {
                'main@admin': {
                    templateUrl: 'admin/grouplog/list.html',
                    controller: 'GrouplogController as vm',
                    resolve: {
                        initialList: function(Grouplog, $stateParams) {
                            return Grouplog.search({
                                userId: $stateParams.userId,
                                userName: $stateParams.userName,
                                createDate: $stateParams.createDate,
                                endDate: $stateParams.endDate,
                                consumeTime: $stateParams.consumeTime,
                                url: $stateParams.url
                            })
                        }
                    }
                }
            }
        })
})

.service('Grouplog', GrouplogModel)

.controller('GrouplogController', GrouplogController);
