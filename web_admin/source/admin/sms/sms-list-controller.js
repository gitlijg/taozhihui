function SMSListController(
    smsList,
    SMS,
    Sorter,
    $scope,
    $state,
    $stateParams
) {
    var vm = this

    smsList.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.smsList = _.map(response.content,
                           function(item) { return new SMS(item) })

        vm.sorter = Sorter.init({
            order: response.sort.property,
            reverse: !response.sort.ascending
        })

        vm.queryParams = _.clone($stateParams)
        vm.totalItems = response.totalElements
        vm.totalPages = response.totalPages
    })

    $scope.$watchCollection('vm.smsList', function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.search = function() { $state.go($state.current, vm.queryParams) }
}
