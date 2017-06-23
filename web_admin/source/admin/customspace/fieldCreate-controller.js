function FieldCreateController(Customspace,$state,AsidePanel,$scope,$stateParams,ConfirmModal) {
    var vm = this

    init();

    /**********************************************************/

    function init(){
        Customspace.fieldList({tableId:$stateParams.tableId})
            .$promise.then(function(response) {
                vm.list = response
            })
            .catch(console.error.bind(console))
    }

    $scope.$watchCollection('vm.list', function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    //创建问卷调查下的问题
    vm.action = function(options) {

        if (options.type === 'update') {
            var initialParams = _.pick(options.data, [
                'id', 'folderName'
            ])
        }

        vm.image = new Image(initialParams);

        AsidePanel.open($scope, {
            title: options.text,
            contentTemplate: 'admin/customspace/fieldForm.html'
        })
            .then(function(result) {
                result.aside.hide();
                if(result.data.type == 'save'){
                    return Customspace.fieldCreate({
                        name: vm.custom.name,
                        position: vm.custom.position,
                        defaultValue: vm.custom.defaultValue,
                        multiple: vm.custom.multiple,
                        association: vm.custom.association,
                        tableId: $stateParams.tableId
                    })
                }else if(result.data.type == 'update'){
                    return Image.updateImageFolder({
                        folderName: result.data.item.folderName,
                        id:result.data.item.id
                    })
                }
            })
            .then(function(response) { $state.reload($state.current) })
            .catch(console.error.bind(console))
    }

    //删除方法
    vm.delete = function(item) {
        ConfirmModal.open($scope, { title: '确定删除吗？' })
            .then(function(result) { return Customspace.fieldDelete({id:item.id}) })
            .then(function(response) { $state.reload($state.current) })
            .catch(console.error.bind(console))
    }
}
