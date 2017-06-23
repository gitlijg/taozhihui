function FileController($scope,Document,$state,ConfirmModal,$stateParams,Upload,API) {
    var vm = this;

    init();

    /****************************************************************/

    //查询文档下的附件
    function init(){
        Document.fileList({id:$stateParams.folderId})
            .$promise.then(function(response) {
                vm.fileList = response
            })
            .catch(console.error.bind(console))
    }


    //上传文档
    //vm.upload = function(files) {
    //    if (files && files.length) {
    //        vm.files = files
    //
    //        _.forEach(files, function(file) {
    //            Upload.upload({ url: API + '/upload', file: file })
    //                .progress(function(event) {
    //                    // TODO: maybe to implement a progress bar?
    //                    vm.progress = parseInt(100.0 * event.loaded / event.total)
    //                    console && console.info('进度：' + vm.progress + '%')
    //                })
    //                .success(function(response) {
    //                    vm.fileId = response[0].id
    //                    return Document.addFileToFolder({folderId:$stateParams.folderId,fileId:vm.fileId})
    //                        .then(function(response) { $state.reload($state.current) })
    //                })
    //                .error(function() {
    //                    vm.files = undefined
    //                })
    //        })
    //    }
    //}

}
