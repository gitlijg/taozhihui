function MeetingsController(initialList,
                            ConfirmModal,
                            $scope,
                            $state,
                            $stateParams,
                            Meeting,
                            AsidePanel,
                            Upload,
                            API) {
    var vm = this

    initialList.$promise.then(function (response) {
        vm.isLoaded = response.$resolved
        vm.meetings = _.map(response.content,
            function (meeting) {
                return new Meeting(meeting)
            })

        vm.queryParams = _.clone($stateParams)
        vm.totalItems = response.totalElements
        vm.totalPages = response.totalPages
    })

    $scope.$watchCollection('vm.meetings', function (newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.showQRCode = function(id){
        Meeting.getRQCode({id: id}).$promise.then(function(result){
            AsidePanel.open($scope, {
                title: '会议二维码',
                html: true,
                content: '<form class="form-condensed" vn-auto-height listen-on="aside.show" parent><img src="'+ API + result.path +'"></form>'
            })
        })
    }

    vm.search = function () {
        $state.go($state.current, vm.queryParams)
    }

    vm.delete = function (meeting) {
        ConfirmModal.open($scope, {title: '确定删除吗？'})
            .then(function (response) {
                return meeting.$delete()
            })
            .then(function (response) {
                $state.reload($state.current)
            })
            .catch(console.error.bind(console))
    }

    vm.uploadImage = function (files, index) {
        Upload.upload({url: API + '/upload', file: files[0]})
            .progress(function (event) {
                // TODO: maybe to implement a progress bar?
                vm.progress = parseInt(100.0 * event.loaded / event.total)
                console && console.info('进度：' + vm.progress + '%')
            })
            .success(function (response) {
                vm.uploading = false

                vm.meetingDetail.imageId = response[0].id
                vm.meetingDetail.imageUri = response[0]['img-mid']
            })
            .error(function () {
                vm.uploading = vm.form.$invalid = false
            })
    }

    vm.addMeeting = function () {
        vm.meetingDetail = new Meeting({
            fieldList: [{}]
        })

        AsidePanel.open($scope, {
            title: '新增会议',
            contentTemplate: 'admin/meeting/meeting.html'
        })
            .then(function (result) {
                var updateParams = _.pick(vm.meetingDetail, [
                    'id', 'meetingName', 'meetingPlace', 'meetingTime',
                    'memberTotal', 'imageId', 'fieldList'
                ])

                updateParams.meetingTime = vm.meetingDetail.startDate + ' ' + vm.meetingDetail.startTime
                _.remove(vm.meetingDetail.fieldList,function(item){
                    return !item.fieldName;
                })
                if(vm.meetingDetail.fieldList.length <= 0){
                    delete vm.meetingDetail.fieldList;
                }

                Meeting.save(updateParams).$promise.then(function (result) {
                    $state.reload()
                }, function (error) {
                    alert(error.message);
                })
            })
    }

    vm.addMeetingField = function(){
        vm.meetingDetail.fieldList.push({});
    }

    vm.updateMeeting = function (meeting) {
        Meeting.get({id: meeting.id}).$promise.then(function (response) {
            vm.meetingDetail = new Meeting(response)

            if(!vm.meetingDetail.fieldList || vm.meetingDetail.fieldList.length <= 0){
                vm.meetingDetail.fieldList = [{}]
            }
            if(angular.isString(vm.meetingDetail.meetingTime) && vm.meetingDetail.meetingTime.length > 1){
                vm.meetingDetail.startDate = vm.meetingDetail.meetingTime.substr(0,10)
                vm.meetingDetail.startTime = vm.meetingDetail.meetingTime.substr(11)
            }

            return vm.meetingDetail
        })
            .then(function (meeting) {
                AsidePanel.open($scope, {
                    title: '修改会议',
                    contentTemplate: 'admin/meeting/meeting.html'
                })
                    .then(function (result) {
                        var updateParams = _.pick(meeting, [
                            'id', 'meetingName', 'meetingPlace', 'meetingTime',
                            'memberTotal', 'imageId', 'fieldList'
                        ])

                        updateParams.meetingTime = vm.meetingDetail.startDate + ' ' + vm.meetingDetail.startTime

                        return Meeting.save(updateParams)
                    })
                    .then(function (result) {
                        $state.reload()
                    })
                    .catch(console.error.bind(console))
            })
    }

}
