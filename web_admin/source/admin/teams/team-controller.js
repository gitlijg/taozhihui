function TeamController(
    team,
    $scope,
    $state,
    $stateParams
) {
    var vm = this

    team.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.team = response
    })

    $scope.$watch('vm.team.userList', function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })
}
