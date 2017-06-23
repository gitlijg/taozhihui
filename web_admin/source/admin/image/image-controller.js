function ImageController($scope,Image,$state,AsidePanel,ConfirmModal) {
    var vm = this;

    init();

    /****************************************************************/

    //查询系统相册
    function init(){
        Image.queryfolder({folderType:'1'})
            .$promise.then(function(response) {
                vm.imageList = response.content
            })
            .catch(console.error.bind(console))
    }

    //创建相册 修改相册
    vm.action = function(options) {

        if (options.type === 'update') {
            var initialParams = _.pick(options.data, [
                'id', 'folderName'
            ])
        }

        vm.image = new Image(initialParams);

        AsidePanel.open($scope, {
            title: options.text,
            contentTemplate: 'admin/image/form.html'
        })
            .then(function(result) {
                result.aside.hide();
                if(result.data.type == 'save'){
                    return Image.addImageFolder({
                        folderName: vm.image.folderName
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
    vm.delete = function(image) {
        ConfirmModal.open($scope, { title: '确定删除吗？' })
            .then(function(result) { return Image.delete({id:image.id}) })
            .then(function(response) { $state.reload($state.current) })
            .catch(console.error.bind(console))
    }

    //相册下的相片内容
    vm.photos = function(item){
        $state.go('image-photos',{folderId:item.id});
    }
}
