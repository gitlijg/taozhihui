function SystemModel(API, $resource) {
    this.url = API + '/console/2.0/system'
    this.params = {}
    this.actions = {}

    this.actions.config = {
        method: 'GET',
        url: API + '/console/2.0/system/config'
    }

    this.actions.update = {
        method: 'POST',
        url: API + '/console/2.0/system/config/update'
    }

    this.actions.wechat = {
        method: 'GET',
        url: API + '/console/2.0/weixin/list',
        isArray: true
    }

    this.actions.wechatBind = {
        method: 'POST',
        url: API + '/console/2.0/weixin/bind'
    }

    this.actions.wechatUnbind = {
        method: 'GET',
        url: API + '/console/2.0/weixin/delete/:id'
    }

    this.actions.appList = {
        method: 'POST',
        url: API + '/console/2.0/app/list'
    }

    this.actions.publish = {
        method: 'POST',
        url: API + '/console/2.0/app/pub'
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
