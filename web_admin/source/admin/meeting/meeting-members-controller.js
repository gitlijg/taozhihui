function MeetingMembersController(initialList, AsidePanel, Meeting, $scope,User) {
    var vm = this

    vm.inviteMembers = []

    initialList.$promise.then(function (result) {
        vm.meeting = result
        vm.isLoaded = result.$resolved
    })

    vm.searchUsers = function(value) {
        if(!value || !value.trim()) return;

        User.findByTrueName({ term: value}).$promise
            .then(function(response) {
                vm.inviteCandidates = response
            })
    }

    vm.invite = function(){
        var members = _.map(vm.inviteMembers,function(item){
            return {userId: item.id};
        })

        Meeting.invite({meetingId: vm.meeting.meetingId},members, function (result) {
            if(result.code == 10000){
                window.location.reload();
            }else{
                alert('操作失败');
            }
        })
    }

    vm.openFormDetail = function (userId) {
        Meeting.formDetail({
            meetingId: vm.meeting.meetingId,
            userId: userId
        }).$promise.then(function (result) {
                $scope.member = {
                    "findDiyList" : [ {
                        "id" : 30,
                        "fieldName" : "手机",
                        "maxLength" : null,
                        "isRequired" : null,
                        "fieldFormat" : null,
                        "defaultValue" : null,
                        "multiple" : null,
                        "refId" : null,
                        "refType" : null,
                        "diyValue" : "bbbb"
                    }, {
                        "id" : 31,
                        "fieldName" : "邮箱",
                        "maxLength" : null,
                        "isRequired" : null,
                        "fieldFormat" : null,
                        "defaultValue" : null,
                        "multiple" : null,
                        "refId" : null,
                        "refType" : null,
                        "diyValue" : "ssss"
                    } ]
                };
                AsidePanel.open($scope, {
                    title: '报名详情',
                    contentTemplate: 'admin/meeting/formDetail.html'
                })
            })
    }
}