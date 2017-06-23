function SystemWechatController(
    initialRequest,
    Team,
    System,
    $scope,
    $state,
    $stateParams
) {
    var vm = this

    initialRequest.$promise.then(function(response) {
        vm.wechatList = response
        vm.formMode = '绑定新的微信账号'
    })

    vm.searchTeam = function(value) {
        return Team.search({ teamName: value }).$promise
        .then(function(response) { vm.teams = response.content })
        .catch(console.error.bind(console))
    }

    vm.bind = function() {
        System.wechatBind(vm.wechat).$promise
        .then(function(response) { $state.reload() })
        .catch(console.error.bind(console))
    }

    vm.unbind = function(wechat) {
        System.wechatUnbind({ id: wechat.id }).$promise
        .then(function(response) { $state.reload() })
        .catch(console.error.bind(console))
    }
}
