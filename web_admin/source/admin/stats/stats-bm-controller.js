function StatsBMController(Stats, $scope, $state, $stateParams,API) {
    var vm = this

    vm.queryParams = _.clone($stateParams)

    vm.export = function() {
        window.location.href = API + '/console/2.0/user/export/moderator/'+ vm.queryParams.start + '/' + vm.queryParams.end;
    }
}
