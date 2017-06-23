function GroupUserVisitsController(GroupUserVisits,$state,$stateParams,$scope) {
    var vm = this

    init();

    /**********************************************************/

    function init(){
        if(!$stateParams.createDate&&!$stateParams.endDate){
            $stateParams.createDate = '1980-01-01'
            //获取今天的日期
            $stateParams.endDate = new Date().toLocaleDateString().split('/').join('-');
        }

        GroupUserVisits.groupUserVisitsHours(
            {
                "createDate":$stateParams.createDate,
                "endDate":$stateParams.endDate
            })
            .$promise.then(function(response) {
                vm.list = response
            })
            .catch(console.error.bind(console))
    }

    $scope.$watchCollection('vm.list', function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.search = function() { $state.go($state.current, vm.queryParams) }
}
