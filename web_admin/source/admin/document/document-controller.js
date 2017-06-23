function DocumentController(Document,$state,$scope,AsidePanel) {
    var vm = this;

    init();

    /****************************************************************/

    //查询系统文档
    function init(){
        Document.folderList()
            .$promise.then(function(response) {
                vm.folderList = response
            })
            .catch(console.error.bind(console))
    }

    //修改文档名
    vm.action = function(options) {

        if (options.type === 'update') {
            var initialParams = _.pick(options.data, [
                'id', 'folderName','remark'
            ])
        }

        vm.document = new Document(initialParams);

        AsidePanel.open($scope, {
            title: options.text,
            contentTemplate: 'admin/document/form.html'
        })
            .then(function(result) {
                result.aside.hide();
                return Document.updateFolder({
                    folderName: result.data.item.folderName,
                    id:result.data.item.id,
                    remark:result.data.item.remark
                })
            })
            .then(function(response) { $state.reload($state.current) })
            .catch(console.error.bind(console))
    }

    //相册下的相片内容
    vm.photos = function(item){
        $state.go('document-file',{folderId:item.id});
    }
}
