function StatsActionController(
    actions,
    Stats,
    $scope,
    $state,
    $stateParams
) {
    var vm = this

    actions.$promise.then(function(response) {
        vm.actions = _.map(response.content,
                           function(item) { return new Stats(item) })

        vm.isLoaded = response.$resolved

        vm.queryParams = _.clone($stateParams)
        vm.totalItems = response.totalElements
        vm.totalPages = response.totalPages
    })

    $scope.$watchCollection('vm.actions', function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.search = function() { $state.go($state.current, vm.queryParams) }
    vm.reset = function() { vm.queryParams = {}; vm.search() }

    vm.export = function() {
        var params = {
            createDate: vm.queryParams.start,
            endDate: vm.queryParams.end,
            userId: vm.queryParams.id,
            userName: vm.queryParams.name
        }

        Stats.export(params).$promise
        .then(function(response) {})
        .catch(console.error.bind(console))
    }

    vm.delete = function(isAdmin) {
        if (isAdmin) {
            var request = Stats.deleteAllActions()
        } else {
            var request = Stats.deleteActions()
        }

        request.$promise
        .then(function(response) { $state.reload() })
        .catch(console.error.bind(console))
    }
}
