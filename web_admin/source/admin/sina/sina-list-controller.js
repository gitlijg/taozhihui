function SinaListController(
    Sina
) {
    var vm = this
    init();
    function init(){
        Sina.search(function(response){
            vm.sinaList = response;
            if(vm.sinaList.length<=0){
                vm.isEmpty=true;
            }
        })
    }
    //设为信息流入用户
    vm.setBindTeam = function(id){
        Sina.setBindTeam({id:id},function(){

        })
    };
    //取消信息流入用户
    vm.cancelBindTeam = function(id){
        Sina.cancelBindTeam({id:id},function(){

        })
    }
}
