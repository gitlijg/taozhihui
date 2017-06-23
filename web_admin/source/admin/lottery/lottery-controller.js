function LotteryController(lottery, API, Upload, $window, $scope, $state, $stateParams) {
    var vm = this

    vm.lottery = lottery

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

    // 替换抽奖背景图的上传回调
    vm.uploadBackgroundImage = function(files) {
        if (files && files.length) {
            vm.form.$invalid = vm.uploading = true

            _.forEach(files, function(file) {
                Upload.upload({ url: API + '/upload', file: file })
                .progress(function(event) {
                    // TODO: maybe to implement a progress bar?
                    vm.progress = parseInt(100.0 * event.loaded / event.total)
                    console && console.info('进度：' + vm.progress + '%')
                })
                .success(function(response) {
                    vm.form.$invalid = vm.uploading = false
                    vm.lottery.lottery.imageUrl = response[0].img.replace('/downloadFile/', '')
                })
                .error(function() {
                    vm.form.$invalid = vm.uploading = false
                    debugger
                })
            })
        }
    }

    // 投票选项配图的上传回调
    vm.uploadOptionImage = function(files, index) {
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

                    var currentOption = vm.lottery.lottery.lotteryOptionList[index]
                    currentOption.imageUrl = response[0].img.replace('/downloadFile/', '')
                })
                .error(function() {
                    vm.uploading = vm.form.$invalid = false
                    debugger
                })
            })
        }
    }

    vm.activeOption = 0

    vm.addOption = function() {
        var optionList = vm.lottery.lottery.lotteryOptionList

        if (optionList.length === vm.maxOptions) { return }

        optionList.push({ orderId: optionList.length + 1 })
        vm.activeOption = optionList.length - 1
    }

    vm.removeOption = function(index) {
        vm.lottery.lottery.lotteryOptionList.splice(index, 1)
        vm.activeOption = index - 1
    }

    vm.create = function() {
        vm.lottery.$create()
        .then(function(response) { $state.reload() })
        .catch(console.error.bind(console))
    }
}
