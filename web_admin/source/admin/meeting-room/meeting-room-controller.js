function MeetingRoomController(
    initialRequest,
    MeetingRoom,
    AsidePanel,
    $scope,
    $state,
    API,
    $stateParams,
    User,
    $filter
) {
    var vm = this

    vm.deviceList = [
        {id: 1,value: '投影仪'},
        {id: 2,value: '电视'},
        {id: 3,value: '电话'},
        {id: 4,value: '麦克风'},
        {id: 5,value: '视频会议系统'}
    ]

    initialRequest.locations.$promise.then(function(response) {
        vm.locations = response
        vm.queryParams = _.clone($stateParams)
    })

    if (_.isUndefined(initialRequest.rooms)) {
        vm.isEmpty = true
    } else {
        initialRequest.rooms.$promise.then(function(response) {
            vm.isEmpty = false
            vm.rooms = response
        })
    }

    vm.search = function(id) {
        vm.queryParams.id = id
        $state.go($state.current, vm.queryParams)
    }

    vm.saveLocation = function(location,$event) {
        if($event && _.isFunction($event.stopPropagation)){
            $event.stopPropagation();
        }
        if (_.isUndefined(location)) vm.location = {}
        else vm.location = location

        AsidePanel.open($scope, {
            title: '添加地点',
            contentTemplate: 'admin/meeting-room/add-location.html'
        })
        .then(function(result) {
            return MeetingRoom.saveLocation(vm.location)
        })
        .then(function(result) { $state.reload() })
        .catch(console.error.bind(console))
    }

    vm.saveRoom = function(room) {
        if (_.isUndefined(room)) vm.room = {}
        else vm.room = room

        if(vm.room.device){
            _.each(vm.room.device.split(','), function (item,index) {
                vm.deviceList[index].has = item === '1';
            })
        }
        vm.searchUsers(vm.room.managerName)

        AsidePanel.open($scope, {
            title: '添加会议室',
            contentTemplate: 'admin/meeting-room/add-room.html'
        })
        .then(function(result) {
                vm.room.device = _.map(vm.deviceList, function (item) {
                    return item.has ? 1 : 0;
                }).join(',')
                return MeetingRoom.saveRoom(_.pick(vm.room,['device','disabled','id','managerId','peopleNumber','placeId','room']))
            })
        .then(function(result) { $state.reload() })
        .catch(console.error.bind(console))
    }

    vm.exportBooking = function(){
        if(!vm.bookingEndDate) vm.bookingEndDate = $filter('date')(new Date(),'yyyy-MM-dd');
        window.location.href = API + '/console/2.0/meetingRoom/export/booklist/'+ vm.queryParams.id +'/'+ vm.bookingBeginDate +'/' + vm.bookingEndDate;
    }

    vm.searchUsers = function(value) {
        if(!value) return;
        User.search({ loginName: value, aliasName: value }).$promise
            .then(function(response) {
                vm.candidates = response.content
            })
    }
}
