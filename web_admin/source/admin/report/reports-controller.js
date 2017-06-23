function ReportsController(
    reports,
    Report,
    $scope,
    $state,
    $stateParams
) {
    var vm = this

    vm.queryParams = $stateParams

    reports.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.reports = response.content

        vm.queryParams = _.clone($stateParams)
        vm.totalItems = response.totalElements
        vm.totalPages = response.totalPages
    })

    $scope.$watchCollection('vm.' + $state.current.name, function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.search = function() {
        $state.go($state.current, vm.queryParams,{reload: true})
    }
    vm.reset = function() { vm.queryParams = {}; vm.search() }

}
