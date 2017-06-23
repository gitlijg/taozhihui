function UserModel(API, $resource) {
    this.url     = API + '/console/2.0/user/:id'
    this.params  = { id: '@id' }
    this.actions = {}

    this.actions.search = {
        method: 'POST',
        url: API + '/console/2.0/user/list'
    }

    this.actions.find = {
        method: 'GET',
        url: API + '/console/2.0/meeting/user/:id',
        isArray: true
    }

    this.actions.register = {
        method: 'POST',
        url: API + '/console/2.0/user/register'
    }

    this.actions.updateInfo = {
        method: 'POST',
        url: API + '/console/2.0/user/update/info'
    }

    this.actions.updatePassword = {
        method: 'POST',
        url: API + '/console/2.0/user/update/pwd'
    }

    this.actions.export = {
        method: 'GET',
        url: API + '/console/2.0/user/export'
    }

    this.actions.toggle = {
        method: 'GET',
        url: API + '/console/2.0/user/disable/:id/:isLock'
    }

    this.actions.getSelf = {
        method: 'GET',
        url: API + '/mobile/webUser/userDetail/0'
    }

    this.actions.integral = {
        method: 'POST',
        url: API + '/console/2.0/integral/total/maintain'
    }

    this.actions.findByTrueName = {
        method: 'GET',
        url: API + '/console/2.0/meeting/user',
        isArray: true
    }

    this.actions.updateRole = {
        method: 'POST',
        url: API + '/console/2.0/user/update/role'
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
