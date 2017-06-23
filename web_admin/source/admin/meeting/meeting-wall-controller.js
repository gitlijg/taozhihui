function MeetingWallController(config, Meeting, $state) {
    var vm = this

    config.$promise.then(function(response) {
        vm.config = response
        if(window.location.hostname.indexOf('tzh.anji.com') != -1){
            vm.config.url = '/tzh-app/huiyi/index.html'
        }else{
            vm.config.url = '/sloth-app/huiyi/index.html'
        }
    })

    vm.saveConfig = function() {
        Meeting.saveWallLoop({ wallLoopTime: vm.config.wallLoopTime }).$promise
        .then(function(response) { $state.reload() })
        .catch(console.error.bind(console))
    }
}
