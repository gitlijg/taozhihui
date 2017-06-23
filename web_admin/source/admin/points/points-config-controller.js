function PointsConfigController(
    pointsList,
    Sorter,
    $scope,
    $state,
    $stateParams
) {
    var vm = this

    pointsList.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.pointsList = response

        vm.sorter = Sorter.init({
            order: response.sort.property,
            reverse: !response.sort.ascending
        })
    })

    $scope.$watchCollection('vm.pointsList', function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.query = $stateParams.query

    vm.update = function(point) {
        point.$update().then(function(response) {  })
    }
}
