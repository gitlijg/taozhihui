function GrouplogController(
    Grouplog,
    $state,
    $stateParams,
    $scope,
    initialList
) {
    var vm = this;
    vm.queryParams=$stateParams;

    initialList.$promise.then(function(response) {
        vm.grouplog = _.map(response,
            function(stream) { return new Grouplog(stream) });

        vm.queryParams = _.clone($stateParams);
    });

    $scope.$watchCollection('vm.grouplog', function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    });


    vm.search = function() { $state.go($state.current, vm.queryParams) }
}
