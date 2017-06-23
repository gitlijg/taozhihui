function BroadcastController($stateParams,Broadcast,$state) {
    var vm = this;

    vm.broadcast = {};

    vm.broadcast.contentText = $stateParams.contentText;
    vm.broadcast.refId = $stateParams.refId;

    /****************************************************************/

    //新建push
    vm.create = function(){
        Broadcast.pushContent({contentText:vm.broadcast.contentText,refId:vm.broadcast.refId})
            .$promise.then(function(response) { $state.reload() })
            .catch(console.error.bind(console))
    }
}
