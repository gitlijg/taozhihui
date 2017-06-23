function SmssendController(
    initialList,
    Smssend,
    Sorter,
    User,
    ConfirmModal,
    $scope,
    $state,
    $stateParams,
    AsidePanel
) {
    var vm = this

    initialList.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.streams = _.map(response.content,
                           function(smssend) { return new Smssend(smssend) })

        vm.sorter = Sorter.init({
            order: response.sort.property,
            reverse: !response.sort.ascending
        })

        vm.queryParams = _.clone($stateParams)
        vm.totalItems = response.totalElements
        vm.totalPages = response.totalPages

    })

    $scope.$watchCollection('vm.' + $state.current.name, function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.search = function() { $state.go($state.current, vm.queryParams) };

    //群发短信
    vm.action = function(options) {
        AsidePanel.open($scope, {
            title: options.text,
            contentTemplate: 'admin/smssend/form.html'
        })
            .then(function(result) {
                result.aside.hide();
                Smssend.send(vm.sms);
            })
            .then(function(response) { $state.reload($state.current) })
            .catch(console.error.bind(console))
    }

}
