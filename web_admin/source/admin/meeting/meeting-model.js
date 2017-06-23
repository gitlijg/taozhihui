function MeetingModel(API, $resource) {
    this.url     = API + '/console/2.0/meeting/:id'
    this.params  = { id: '@id' }
    this.actions = {}

    this.actions.saveWallLoop = {
        method: 'POST',
        url: API + '/console/2.0/system/setWallLoopTime'
    }

    this.actions.save = {
        method: 'POST',
        url: API + '/console/2.0/meeting/save'
    }

    this.actions.delete = {
        method: 'GET',
        url: API + '/console/2.0/meeting/delete/:id'
    }

    this.actions.search = {
        method: 'POST',
        url: API + '/console/2.0/meeting/list'
    }

    this.actions.searchMember = {
        url: API + '/console/2.0/meeting/members/:meetingId'
    }

    this.actions.formDetail = {
        url: API + '/console/2.0/meeting/diyValue/:meetingId/:userId'
    }

    this.actions.getRQCode = {
        url: API + '/console/2.0/meeting/matrix/:id'
    }

    this.actions.meetingWall = {
        url: API + '/console/2.0/system/meetingWall'
    }

    this.actions.invite = {
        url: API + '/console/2.0/meeting/invite/:meetingId',
        method: 'POST'
    }

    return $resource.call(this, this.url, this.params, this.actions)

}
