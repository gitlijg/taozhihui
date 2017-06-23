function DepartmentsController(
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

    // 获取所属公司及其部门列表
    $q.all(requests).then(function(response) {
        vm.isLoaded = true
        vm.organization = response.organization
        vm.departments = response.departments

        // 排序属性
        vm.order = response.departments.sort.property
        vm.reverse = response.departments.sort.ascending
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
    $scope.$watchCollection('vm.departments.content', function(newValue, oldValue) {
        if (_.isEqual(newValue, oldValue))
            return
        if (_.isEmpty(newValue))
            vm.isEmpty = true
    })

    function _createOrUpdate() {
        vm.department.$save()
        .then(function(response) { vm.cancel(); $state.reload($state.current.name) })
        .catch(console.error)
    }

    // 创建部门
    var newAside = $aside({
        show: false,
        scope: $scope,
        title: '创建部门',
        contentTemplate: 'admin/platform/departments/form.html'
    })

    vm.new = function() {
        vm.mode = 'create'
        vm.department = new Department()
        newAside.$promise.then(newAside.show)
    }

    vm.create = _createOrUpdate

    // 编辑部门
    var editAside = $aside({
        show: false,
        scope: $scope,
        title: '编辑部门',
        contentTemplate: 'admin/platform/departments/form.html'
    })

    vm.edit = function(department) {
        vm.mode = 'update'
        vm.department = new Department(
            _.pick(department, [ 'id', 'departmentName', 'serialNo','managerId' ])
        )
        editAside.$promise.then(editAside.show)
    }

    vm.update = _createOrUpdate

    //查询部门成员
    vm.searchUser = function(searchKey){
        return Department.users({
            pageInfo:{pageNumber: 1,pageSize: 10000},
            departmentId: vm.department.id,
            aliasName: searchKey
        }).$promise.then(function(result){
            vm.departmentUsers = result.content;
        });
    }

    // 删除部门
    var confirm = $modal({
        show: false,
        scope: $scope,
        title: '确认删除？',
        templateUrl: 'components/angular-strap/confirm.html',
        contentTemplate: 'components/angular-strap/confirm-delete.html'
    })

    vm.confirm = function(department) {
        vm.department = new Department(department)
        confirm.$promise.then(confirm.show)
    }

    vm.delete = function() {
        vm.department.$delete({id: vm.department.id})
        .then(function(response) { vm.cancel(); $state.reload($state.current.name) })
        .catch(console.error)
    }

    // 取消各种操作
    vm.cancel = function() {
        newAside.hide()
        editAside.hide()
        confirm.hide()

        vm.department = null
        vm.serverError = null
    }
}
