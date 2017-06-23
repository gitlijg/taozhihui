angular.module('meetingRoom', [])

.config(function MeetingRoomRoutes($stateProvider) {
    $stateProvider

    .state('meetingRoom', { abstract: true, parent: 'admin', url: '/meeting-rooms' })

    .state('meetingRoom.list', {
        url: '/?{id:int}',
        params: {
            id: { value: null, squash: true}
        },
        views: {
            'main@admin': {
                templateUrl: 'admin/meeting-room/list.html',
                controller: 'MeetingRoomController as vm',
                resolve: {
                    initialRequest: function(MeetingRoom, $stateParams) {
                        return {
                            locations: MeetingRoom.getLocations(),
                            rooms: $stateParams.id ? MeetingRoom.getRooms({
                                id: $stateParams.id
                            }) : undefined
                        }
                    }
                }
            }
        }
    })

    .state('meetingRoom.bookings', {
        url: '/bookings/{id:int}?{date:string}',
        views: {
            'main@admin': {
                templateUrl: 'admin/meeting-room/bookings.html',
                controller: 'MeetingBookingsController as vm',
                resolve: {
                    bookings: function(MeetingRoom, $stateParams,$filter) {
                        return MeetingRoom.search({ id: $stateParams.id ,bookDate: $stateParams.date? $stateParams.date: $filter('date')(Date.now(),'yyyy-MM-dd')})
                    }
                }
            }
        }
    })
})

.service('MeetingRoom', MeetingRoomModel)

.controller('MeetingRoomController', MeetingRoomController)
.controller('MeetingBookingsController', MeetingBookingsController)
