function AppStatController(AppStat,$stateParams,$state,initialList) {
    var vm = this;

    initialList.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.list = _.map(response.content,
            function(stream) { return new AppStat(stream) });

        vm.queryParams = _.clone($stateParams);
        vm.totalItems = response.totalElements;
        vm.totalPages = response.totalPages
    });

    vm.search = function() { $state.go($state.current, vm.queryParams) }

}
