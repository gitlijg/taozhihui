function RedpackController(redpack, Upload, $window, $scope, $state, $stateParams,API) {
    var vm = this

    vm.redpack = redpack

    vm.editorOptions = {
        toolbarCanCollapse: true,
        toolbarStartupExpanded: true
    }

    // 富文本编辑器里的上传回调
    vm.uploadEmbedImage = function(files) {
        if (files && files.length) {
            _.forEach(files, function(file) {
                Upload.upload({ url: API + '/upload', file: file })
                .progress(function(event) {
                    // TODO: maybe to implement a progress bar?
                    vm.progress = parseInt(100.0 * event.loaded / event.total)
                    console && console.info('进度：' + vm.progress + '%')
                })
                .success(function(response) {
                    vm.uploading = false

                    var pathList = response.map(function(result) { return API + result.img })
                    $scope.$broadcast('vnRichEditor.insertImages', pathList)
                })
                .error(function() {
                    debugger
                    vm.uploading = vm.form.$invalid = false
                })
            })
        }
    }

    vm.create = function() {
        vm.redpack.$create()
        .then(function(response) { $state.reload() })
        .catch(console.error.bind(console))
    }
}
