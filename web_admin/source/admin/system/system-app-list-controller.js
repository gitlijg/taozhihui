function SystemAppListController(
    initialRequest,
    System,
    Sorter,
    AsidePanel,
    Upload,
    API,
    $scope,
    $state,
    $stateParams,
    $timeout
) {
    var vm = this

    initialRequest.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.records = _.map(response.content,
                           function(item) { return new System(item) })

        vm.sorter = Sorter.init({
            order: response.sort.property,
            reverse: !response.sort.ascending
        })

        vm.queryParams = _.clone($stateParams)
        vm.totalItems = response.totalElements
        vm.totalPages = response.totalPages
    })

    $scope.$watchCollection('vm.records', function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.search = function() { $state.go($state.current, vm.queryParams) }
    vm.reset = function() {
        vm.queryParams = {}
        $state.go($state.current, vm.queryParams, { inherit: false })
    }

    vm.publish = function() {
        vm.newApp = { clientType: 'ios' }

        AsidePanel.open($scope, {
            title: '发布新版本',
            contentTemplate: 'admin/system/app-publish.html'
        })
        .then(function(result) { return System.publish(vm.newApp) })
        .then(function(response) { $state.reload() })
        .catch(console.error.bind(console))
    }

    vm.upload = function(files) {
        if (files && files.length) {
            vm.files = files
            vm.form.$invalid = vm.uploading = true

            _.forEach(files, function(file) {
                vm.newApp.clientSize = file.size

                Upload.upload({ url: API + '/app-upload', file: file })
                .progress(function(event) {
                    // TODO: maybe to implement a progress bar?
                    vm.progress = parseInt(100.0 * event.loaded / event.total)
                })
                .success(function(response) {
                    vm.form.$invalid = vm.uploading = false
                    $timeout(function(){
                        vm.progress = 0;
                    },2000)
                })
                .error(function() {
                    vm.form.$invalid = vm.uploading = false
                    vm.files = undefined
                })
            })
        }
    }
}
