function DepartmentUserController(
    $q,
    Department,
    requests,
    $state,
    $scope,
    $aside,
    $modal
) {
    var vm = this

    // 加载状态
    vm.isLoaded = false

    // 获取部门详情和成员列表
    $q.all(requests).then(function(response) {
        vm.isLoaded = true
        vm.department = new Department(response.department)
        vm.users = response.users

        // 排序属性
        vm.order = response.users.sort.property
        vm.reverse = response.users.sort.ascending
    })

    // 排序方法
    vm.sort = function(field) {
        if (_.isEqual(vm.order, field)) {
            vm.reverse = !vm.reverse
        } else {
            vm.order = field
            vm.reverse = false
        }
    }

    // 检查列表是否为空
    $scope.$watchCollection('vm.users.content', function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    // 添加成员
    function _prefetchIdleUser() {
        return Department.idleUsers().$promise
        .then(function(response) { vm.idleUsers = response })
    }

    var newAside = $aside({
        show: false,
        scope: $scope,
        title: '添加成员',
        templateUrl: 'admin/platform/departments/add-user.html'
    })

    vm.showIdleUsers = function() {
        vm.idleUsersIsLoaded = false
        newAside.$promise.then(newAside.show)
        _prefetchIdleUser().then(function() { vm.idleUsersIsLoaded = true })
    }

    vm.addUser = function(user) {
        vm.department.$addUser({ deptId: vm.department.id, userId: user.id })
        .then(function(response) {
            vm.idleUsersIsLoaded = false
            _prefetchIdleUser().then(function() { vm.idleUsersIsLoaded = true })
        })
        .catch(console.error)
    }

    vm.closeAddUser = function() {
        newAside.hide()
        $state.reload($state.current.name)
    }

    // 移除成员
    var confirm = $modal({
        show: false,
        scope: $scope,
        title: '确认移除？',
        templateUrl: 'components/angular-strap/confirm.html',
        contentTemplate: 'components/angular-strap/confirm-delete.html'
    })

    vm.confirm = function(user) {
        vm.user = user
        confirm.$promise.then(confirm.show)
    }

    vm.delete = function() {
        vm.department.$removeUser({ deptId: vm.department.id, userId: vm.user.id })
        .then(function(response) { vm.cancel(); $state.reload($state.current.name) })
        .catch(console.error)
    }

    // 取消各种操作
    vm.cancel = function() {
        newAside.hide()
        confirm.hide()

        vm.user = null
        vm.serverError = null
    }
}
