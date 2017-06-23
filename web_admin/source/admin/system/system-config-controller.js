function SystemConfigController(initialRequest, System) {
    var vm = this

    initialRequest.$promise.then(function(response) {
        vm.config = response
    })

    vm.update = function() {
        System.update(vm.config)
    }
}
