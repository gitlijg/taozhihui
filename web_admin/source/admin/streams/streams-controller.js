function StreamsController(
    initialList,
    Stream,
    Sorter,
    User,
    ConfirmModal,
    $scope,
    $state,
    $stateParams
) {
    var vm = this

    initialList.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.streams = _.map(response.content,
                           function(stream) { return new Stream(stream) })

        vm.sorter = Sorter.init({
            order: response.sort.property,
            reverse: !response.sort.ascending
        })

        vm.queryParams = _.clone($stateParams)
        vm.totalItems = response.totalElements
        vm.totalPages = response.totalPages
    })

    $scope.$watchCollection('vm.' + $state.current.name, function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.search = function() { $state.go($state.current, vm.queryParams) }

    vm.getUsers = function(value) {
        User.search({ loginName: value, aliasName: value }).$promise
        .then(function(response) { vm.users = response.content })
    }

    vm.delete = function(stream) {
        ConfirmModal.open($scope, { title:  '确定删除吗？' })
        .then(function(response) { return stream.$delete() })
        .then(function(response) { $state.reload($state.current) })
        .catch(console.error.bind(console))
    }
}
