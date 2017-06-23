angular.module('chexiang', [])

.config(function ChexiangRoutes($stateProvider) {
    $stateProvider

    .state('chexiang', {
        parent: 'admin',
        url: '/chexiang?{page:int}&{size:int}&chexiangAccount',
        params: {
            page: { value: 1, squash: true },
            size: { value: 10, squash: true }
        },
        views: {
            'main': {
                templateUrl: 'admin/chexiang/list.html',
                controller: 'ChexiangController as vm',
                resolve: {
                    list: function(Chexiang, $stateParams) {
                        var param = {
                            chexiangAccount: $stateParams.chexiangAccount,
                            pageInfo: {
                                pageNumber: $stateParams.page,
                                pageSize: $stateParams.size
                            }
                        }
                        return Chexiang.search(param)
                    }
                }
            }
        }
    })

    .state('chexiangShop', {
        parent: 'admin',
        url: '/chexiang/shop?{page:int}&{size:int}&storeName&storeTel&email',
        params: {
            page: { value: 1, squash: true },
            size: { value: 10, squash: true }
        },
        views: {
            'main': {
                templateUrl: 'admin/chexiang/shop/list.html',
                controller: 'ChexiangShopController as vm',
                resolve: {
                    list: function(Chexiang, $stateParams) {
                        var param = {
                            storeName: $stateParams.storeName,
                            storeTel: $stateParams.storeTel,
                            email: $stateParams.email,
                            pageInfo: {
                                pageNumber: $stateParams.page,
                                pageSize: $stateParams.size
                            }
                        }
                        return Chexiang.shop(param)
                    }
                }
            }
        }
    })
})

.service('Chexiang', ChexiangModel)

.controller('ChexiangController', ChexiangController)

.controller('ChexiangShopController', ChexiangShopController)
