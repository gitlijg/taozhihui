function PointsRecordController(
    records,
    pointsList,
    Point,
    User,
    AdminInfo,
    Sorter,
    $scope,
    $state,
    $stateParams
) {
    var vm = this

    records.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.records = _.map(response.content,
                           function(item) { return new Point(item) })

        vm.sorter = Sorter.init({
            order: response.sort.property,
            reverse: !response.sort.ascending
        })

        vm.queryParams = _.clone($stateParams)
        vm.totalItems = response.totalElements
        vm.totalPages = response.totalPages
    })

    $scope.$watchCollection('vm.records', function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.search = function() { $state.go($state.current, vm.queryParams) }
    vm.reset = function() {
        vm.queryParams = {}
        $state.go($state.current, vm.queryParams, { inherit: false })
    }

    vm.readableSource = function(sourceCode) {
        return _.find(vm.sourceList,
                      _.matchesProperty('systemCode', sourceCode))['systemName']
    }

    vm.sourceList = AdminInfo.dictionaries.INTEGRAL_SOURCE

    pointsList.$promise.then(function(response) {
        vm.pointsList = response
    })

    vm.getUsers = function(value) {
        if(!value) return;
        User.search({ loginName: value, aliasName: value }).$promise
        .then(function(response) {
                vm.users = response.content
                if(!response.lastPage){
                    vm.users.push({more: true,aliasName: '更多'})
                }
            })
    }
}
