function SystemThemesController(
    theme,
    System,
    Upload,
    API,
    $scope,
    $state,
    $stateParams
) {
    var vm = this

    vm.theme = theme

    var _flagMapping = {
        'A': 'maxLoginBgUrl',
        'B': 'maxWebBgUrl',
        'C': 'maxLogoUrl',
        'D': 'maxMobileLoginBgUrl',
        'E': 'maxMobileLoginBg4SUrl',
        'F': 'maxMobileLoadingBgUrl',
        'G': 'maxMobileLoadingBg4SUrl'
    }

    vm.upload = function(files, flag) {
        if (files && files.length) {
            vm.files = files
            vm.uploading = true

            _.forEach(files, function(file) {
                Upload.upload({
                    url: API + '/console/2.0/bg/uploadDiyBgImg',
                    file: file,
                    fields: { flag: flag }
                })
                .progress(function(event) {
                    // TODO: maybe to implement a progress bar?
                    vm.progress = parseInt(100.0 * event.loaded / event.total)
                    console && console.info('进度：' + vm.progress + '%')
                })
                .success(function(response) {
                    vm.uploading = false
                    vm.theme[_flagMapping[flag]] = response.filePath
                })
                .error(function() {
                    vm.uploading = false
                    vm.files = undefined
                })
            })
        }
    }
}
