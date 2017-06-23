function ChexiangShopController(
    $scope,
    list,
    $state,
    $stateParams,
    Chexiang,
    ConfirmModal,
    AsidePanel,
    $q,
    $aside,
    User
) {
    var vm = this

    list.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.list = response.content

        vm.queryParams = _.clone($stateParams)
        vm.totalItems = response.totalElements
        vm.totalPages = response.totalPages
    })

    vm.search = function() { $state.go($state.current, vm.queryParams) }
    vm.reset = function() { vm.queryParams = {}; vm.search() }

    vm.detail = function(shopId) {
        Chexiang.shopDetail({id: shopId},function(response) {
            vm.shop = response;
            AsidePanel.open($scope, {
                title: '门店详情',
                contentTemplate: 'admin/chexiang/shop/detail.html'
            })
        })
    }
}
