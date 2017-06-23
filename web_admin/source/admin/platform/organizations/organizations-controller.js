function OrganizationsController(
    organizations,
    Organization,
    Sorter,
    $state,
    $stateParams,
    $scope,
    $aside,
    $modal
) {
    var vm = this

    // 加载状态
    vm.isLoaded = false

    // 获取公司列表
    organizations.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.organizations = _.map(response.content,
                                 function(item) { return new Organization(item) })

        vm.sorter = Sorter.init({
            order: response.sort.property,
            reverse: !response.sort.ascending
        })

        vm.queryParams = _.clone($stateParams)
        vm.totalItems = response.totalElements
        vm.totalPages = response.totalPages
    })

    // 检查列表是否为空
    $scope.$watchCollection('vm.organizations', function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.search = function() { $state.go($state.current, vm.queryParams) }
    vm.reset = function(parameter) { vm.queryParams = {}; vm.search() }

    // 创建公司
    var newAside = $aside({
        show: false,
        scope: $scope,
        title: '创建公司',
        contentTemplate: 'admin/platform/organizations/form.html'
    })

    vm.new = function() {
        vm.mode = 'create'
        vm.organization = new Organization()
        newAside.$promise.then(newAside.show)
    }

    vm.create = function() {
        vm.organization.$create()
        .then(function(response) { vm.cancel(); $state.reload($state.current.name) })
        .catch(console.error)
    }

    // 编辑公司
    var editAside = $aside({
        show: false,
        scope: $scope,
        title: '编辑公司',
        contentTemplate: 'admin/platform/organizations/form.html'
    })

    vm.edit = function(organization) {
        vm.mode = 'update'
        vm.organization = new Organization(
            _.pick(organization, [ 'id', 'fullName', 'shortName', 'domain' ])
        )
        editAside.$promise.then(editAside.show)
    }

    vm.update = function() {
        vm.organization.$update()
        .then(function(response) { vm.cancel(); $state.reload($state.current.name) })
        .catch(console.error)
    }

    // 删除公司
    var confirm = $modal({
        show: false,
        scope: $scope,
        title: '确认删除？',
        templateUrl: 'components/angular-strap/confirm.html',
        contentTemplate: 'components/angular-strap/confirm-delete.html'
    })

    vm.confirm = function(organization) {
        vm.organization = new Organization(organization)
        confirm.$promise.then(confirm.show)
    }

    vm.delete = function() {
        Organization.delete({id: vm.organization.id}).$promise
        .then(function(response) { vm.cancel(); $state.reload($state.current.name) })
        .catch(console.error)
    }

    // 取消各种操作
    vm.cancel = function() {
        newAside.hide()
        editAside.hide()
        confirm.hide()

        vm.organization = null
        vm.serverError = null
    }
}
