function StatsModel(API, $resource) {
    this.url     = API + '/console/2.0/statistics'
    this.params  = {}
    this.actions = {}

    this.actions.userActions = {
        method: 'POST',
        url: API + '/console/2.0/statistics/queryUserLog'
    }

    this.actions.export = {
        method: 'GET',
        url: API + '/console/2.0/statistics/userLog/export',
    }

    this.actions.deleteActions = {
        method: 'GET',
        url: API + '/console/2.0/statistics/deleteActionLogsByOrg'
    }

    this.actions.deleteAllActions = {
        method: 'GET',
        url: API + '/console/2.0/statistics/deleteActionLogs'
    }

    this.actions.system = {
        method: 'POST',
        url: API + '/console/2.0/statistics/querySysLog'
    }

    this.actions.deleteSystemLogs = {
        method: 'GET',
        url: API + '/console/2.0/statistics/deleteErrorLogsByOrg'
    }

    this.actions.deleteAllSystemLogs = {
        method: 'GET',
        url: API + '/console/2.0/statistics/deleteErrorLogs'
    }

    this.actions.vphs = {
        method: 'POST',
        url: API + '/console/2.0/statistics/groupUserVisitsHours'
    }

    this.actions.exportBM = {
        method: 'GET',
        url: API + '/console/2.0/user/export/moderator/:start/:end'
    }

    this.actions.sessions = {
        method: 'GET',
        url: API + '/console/2.0/sessions',
        isArray: true
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
