function StatsSystemController(
    records,
    Stats,
    $scope,
    $state,
    $stateParams
) {
    var vm = this

    records.$promise.then(function(response) {
        vm.records = _.map(response.content,
                           function(item) { return new Stats(item) })

        vm.queryParams = _.clone($stateParams)
        vm.totalItems = response.totalElements
        vm.totalPages = response.totalPages
    })

    $scope.$watchCollection('vm.actions', function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.search = function() { $state.go($state.current, vm.queryParams) }
    vm.reset = function() { vm.queryParams = {}; vm.search() }

    vm.delete = function(isAdmin) {
        if (isAdmin) {
            var request = Stats.deleteAllSystemLogs()
        } else {
            var request = Stats.deleteSystemLogs()
        }

        request.$promise
        .then(function(response) { $state.reload() })
        .catch(console.error.bind(console))
    }
}
