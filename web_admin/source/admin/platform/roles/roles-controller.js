function RolesController(
    roles,
    Role,
    Sorter,
    AdminInfo,
    $scope,
    $state,
    $stateParams,
    AsidePanel,
    ConfirmModal
) {
    var vm = this

    roles.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.roles = _.map(response.content,
                         function(item) { return new Role(item) })

        vm.sorter = Sorter.init({
            order: response.sort.property,
            reverse: !response.sort.ascending
        })

        vm.queryParams = _.clone($stateParams)
        vm.totalItems = response.totalElements
        vm.totalPages = response.totalPages
    })

    $scope.$watch('vm.roles', function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.permissions = AdminInfo.permissions

    vm.createRole = function() {
        vm.formMode = 'create'
        vm.role = new Role({ type: 'C' })

        AsidePanel.open($scope,{
            title: '添加角色',
            contentTemplate: 'admin/platform/roles/form.html'
        })
        .then(function(result) {
            vm.role.permissions = _composePermissionsFrom(vm.rawPermissions)
            return {
                aside: result.aside,
                response: vm.role.$save()
            }
        })
        .then(function(result) { result.aside.hide(); $state.reload($state.current.name) })
        .catch(console.error)
    }

    function _composePermissionsFrom(permissions) {
        var result = []
        _.forOwn(permissions, function(value, key) {
            value && result.push(key)
        })
        return result.join(',')
    }

    vm.updateRole = function(role) {
        vm.formMode = 'update'
        vm.role = new Role(
            _.pick(role, [ 'id', 'name', 'roleDesc', 'type', 'permissions' ])
        )
        vm.rawPermissions = _extractPermissionsFrom(vm.role.permissions)

        AsidePanel.open($scope,{
            title: '编辑角色',
            contentTemplate: 'admin/platform/roles/form.html'
        })
        .then(function(result) {
            vm.role.permissions = _composePermissionsFrom(vm.rawPermissions)
            return {
                aside: result.aside,
                response: vm.role.$save()
            }
        })
        .then(function(result) { result.aside.hide(); $state.reload($state.current.name) })
        .catch(console.error)
    }

    function _extractPermissionsFrom(permissions) {
        var result = {}
        _.forEach(permissions.split(','), function(key) {
            result[key] = true
        })
        return result
    }

    vm.deleteRole = function(role) {
        ConfirmModal.showConfirmModal({
            title: '确认删除该角色吗？'
        }, $scope)
        .then(function(result) { return Role.delete({id: role.id}).$promise })
        .then(function(response) { $state.reload($state.current.name) })
        .catch(console.error)
    }
}
