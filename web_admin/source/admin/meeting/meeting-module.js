angular.module('meeting', [])

    .config(function MeetingRoutes($stateProvider) {
        $stateProvider

            .state('meeting', {abstract: true, parent: 'admin', url: '/meeting'})

            .state('meeting.list', {
                url: '/list?{page:int}&{size:int}&{meetingName:string}',
                params: {
                    page: {value: 1, squash: true},
                    size: {value: 10, squash: true}
                },
                views: {
                    'main@admin': {
                        templateUrl: 'admin/meeting/list.html',
                        controller: 'MeetingsController as vm',
                        resolve: {
                            initialList: function (Meeting, $stateParams) {
                                return Meeting.search({
                                    meetingName: $stateParams.meetingName,
                                    pageInfo: {
                                        pageSize: $stateParams.size,
                                        pageNumber: $stateParams.page
                                    }
                                })
                            }
                        }
                    }
                }
            })

            .state('meeting.members', {
                url: '/members/:meetingId',
                views: {
                    'main@admin': {
                        templateUrl: 'admin/meeting/members.html',
                        controller: 'MeetingMembersController as vm',
                        resolve: {
                            initialList: function (Meeting, $stateParams) {
                                return Meeting.searchMember({
                                    meetingId: $stateParams.meetingId
                                })
                            }
                        }
                    }
                }
            })

            .state('meeting.wall', {
                url: '/wall',
                views: {
                    'main@admin': {
                        templateUrl: 'admin/meeting/wall.html',
                        controller: 'MeetingWallController as vm',
                        resolve: {
                            config: function (Meeting) {
                                return Meeting.meetingWall()
                            }
                        }
                    }
                }
            })
    })

    .service('Meeting', MeetingModel)

    .controller('MeetingsController', MeetingsController)

    .controller('MeetingWallController', MeetingWallController)

    .controller('MeetingMembersController',MeetingMembersController)
