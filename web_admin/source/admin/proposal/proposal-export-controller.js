function ProposalExportController(
    $scope,
    API,
    Department
) {
    var vm = this

    vm.export = exportFn;

    init();

    function init(){
        Department.search({pageInfo: {pageNumber: 1,pageSize: 100000}},function(result){
            vm.departmentList = result.content;
        })
    }

    function exportFn(){
        window.location.href = API + '/console/2.0/suggestion/export?beginDate='
            + vm.beginDate + '&endDate=' + vm.endDate
            + (vm.departmentId ? '&departmentId=' + vm.departmentId : '');
    }
}
