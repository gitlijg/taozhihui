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
    //��Ϊ��Ϣ�����û�
    vm.setBindTeam = function(id){
        Sina.setBindTeam({id:id},function(){

        })
    };
    //ȡ����Ϣ�����û�
    vm.cancelBindTeam = function(id){
        Sina.cancelBindTeam({id:id},function(){

        })
    }
}
