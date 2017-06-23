function StatsOnlineController(
    Stats
) {
    var vm = this

    init()



    function init(){
        Stats.sessions(function (result) {
            vm.over = true;
            vm.onlineList = result;
        })
    }
}
