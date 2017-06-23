function CustomspaceController(Customspace,$state,AsidePanel,$scope,$stateParams) {
    var vm = this

    init();

    /**********************************************************/

    vm.queryParams = $stateParams

    function init(){
        Customspace.list({type:$stateParams.type})
            .$promise.then(function(response) {
                vm.list = response
            })
            .catch(console.error.bind(console))
    }

    $scope.$watchCollection('vm.list', function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.search = function() { $state.go($state.current, vm.queryParams) }

    //创建问卷调查 修改问卷调查
    vm.action = function(options) {

        if(admin.isReadOnly){
            return;
        }

        if (options.type === 'update') {
            var initialParams = _.pick(options.data, [
                'id', 'tableName','tableDesc','optionLimit'
            ])
        }

        vm.custom = new Customspace(initialParams);

        AsidePanel.open($scope, {
            title: options.text,
            contentTemplate: 'admin/customspace/form.html'
        })
            .then(function(result) {
                result.aside.hide();
                if(result.data.type == 'save'){
                    return Customspace.create(vm.custom)
                }else if(result.data.type == 'update'){
                    return Customspace.update(result.data.item)
                }
            })
            .then(function(response) { $state.reload($state.current) })
            .catch(console.error.bind(console))
    }


    //发布
    vm.pulish = function(item){
        Customspace.publish({id:item.id})
            .then(function(response) { $state.reload($state.current) })
            .catch(console.error.bind(console))
    }

    //关闭
    vm.close = function(item){
        Customspace.close({id:item.id})
            .then(function(response) { $state.reload($state.current) })
            .catch(console.error.bind(console))
    }
}
