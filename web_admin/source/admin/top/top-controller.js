function TopController(
    topList,
    Top,
    ConfirmModal,
    $scope
) {
    var vm = this

    topList.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.topList = response
    })

    vm.cancelTop = function (item,index) {
        ConfirmModal.open($scope, { title: '确定取消吗？' })
            .then(function(result) {
                return Top.cancle({id: item.id})
            })
            .then(function(response) { vm.topList.splice(index,1); })
            .catch(console.error.bind(console))
    }

}
