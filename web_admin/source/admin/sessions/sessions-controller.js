function SessionsController(Sessions) {
    var vm = this


    init();



    function init(){
        Sessions.sessions()
            .$promise.then(function(response) {
                vm.list = response
            })
            .catch(console.error.bind(console))
    }
}
