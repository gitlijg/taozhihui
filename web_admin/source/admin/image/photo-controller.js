function PhotosController($scope,Image,$state,ConfirmModal,$stateParams,Upload,API) {
    var vm = this;

    init();

    /****************************************************************/

    //查询相册下的相片
    function init(){
        Image.imagesByFolder({folderId:$stateParams.folderId})
            .$promise.then(function(response) {
                vm.imageList = response
            })
            .catch(console.error.bind(console))
    }


    //上传相片
    vm.upload = function(files) {
        if (files && files.length) {
            vm.files = files

            _.forEach(files, function(file) {
                Upload.upload({ url: API + '/upload', file: file })
                    .progress(function(event) {
                        // TODO: maybe to implement a progress bar?
                        vm.progress = parseInt(100.0 * event.loaded / event.total)
                        console && console.info('进度：' + vm.progress + '%')
                    })
                    .success(function(response) {
                        vm.imageId = response[0].id
                        return Image.addImage({folderId:$stateParams.folderId,imageId:vm.imageId})
                            .then(function(response) { $state.reload($state.current) })
                    })
                    .error(function() {
                        vm.files = undefined
                    })
            })
        }
    }
}
