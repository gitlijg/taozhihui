function ReportController(
    reportInfoList,
    $scope,
    $state,
    $stateParams
) {
    var vm = this

    vm.reportInfoList = reportInfoList;

    reportInfoList.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.infoList = response
    })
}
