function MeetingRoomModel(API, $resource) {
    this.url     = ''
    this.params  = {}
    this.actions = {}

    this.actions.getLocations = {
        method: 'GET',
        url: API + '/console/2.0/meetingRoom/place/list',
        isArray: true
    }

    this.actions.saveLocation = {
        method: 'POST',
        url: API + '/console/2.0/meetingRoom/place/save',
    }

    this.actions.getRooms = {
        method: 'GET',
        url: API + '/console/2.0/meetingRoom/:id',
        isArray: true
    }

    this.actions.saveRoom = {
        method: 'POST',
        url: API + '/console/2.0/meetingRoom/save',
    }

    this.actions.search = {
        method: 'POST',
        url: API + '/console/2.0/meetingRoom/booklist',
        isArray: true
    }

    this.actions.cancelBook = {
        method: 'GET',
        url: API + '/console/2.0/meetingRoom/cancel/:bookId'
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
