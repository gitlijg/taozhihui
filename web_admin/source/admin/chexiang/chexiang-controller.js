function ChexiangController(
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

    vm.bindInfo = {}

    list.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.list = response.content

        vm.queryParams = _.clone($stateParams)
        vm.totalItems = response.totalElements
        vm.totalPages = response.totalPages
    })

    vm.search = function() { $state.go($state.current, vm.queryParams) }
    vm.reset = function() { vm.queryParams = {}; vm.search() }

    vm.unbind = function (userId) {
        ConfirmModal.open($scope, { title: '确定解除绑定吗？' })
            .then(function(result) {
                return Chexiang.unbind({userId: userId})
            })
            .then(function(response) { $state.reload() })
    }

    vm.bindAccount = function(){
        if(!vm.bindInfo.userInfo){
            vm.bind_error_msg = '请选择本系统账号';
            return;
        }else if(!vm.bindInfo.chexiangAccount){
            vm.bind_error_msg = '请输入车享家账号';
            return;
        }else if(!vm.bindInfo.chexiangPsw){
            vm.bind_error_msg = '请输入密码';
            return;
        }

        vm.bind_error_msg = '';
        vm.bindInfo.id = vm.bindInfo.userInfo.id;
        delete vm.bindInfo.userInfo;
        delete vm.bindInfo.chexiangPswRepeat;
        Chexiang.bindAccount(vm.bindInfo,function(result){
            if(result.code && result.code != 10000){
                vm.bind_error_msg = '';
                vm.bindInfo.id =  result.msg;
                return;
            }
            vm.bindInfo = {};
            vm.aside.hide();
            $state.reload();
        })
    }

    vm.showBind = function () {
        vm.aside = $aside({
            scope: $scope,
            html: true,
            title: '绑定车享家',
            contentTemplate: 'admin/chexiang/bind.html'
        })
    }

    vm.searchUsers = function(value) {
        if(!value) return;
        User.search({ loginName: value, aliasName: value }).$promise
            .then(function(response) {
                vm.candidates = response.content
            })
    }

}
