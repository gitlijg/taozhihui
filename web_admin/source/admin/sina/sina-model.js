function SinaModel(API, $resource) {
    //this.url     = API + '/console/2.0/sina/list';
    this.params  = {}
    this.actions = {}

    this.actions.search = {
        url: API + '/console/2.0/sina/list',
        isArray:true
    }

    this.actions.setBindTeam = {
        url:API + '/console/2.0/sina/setBindTeam/:id'
    }
    this.actions.cancelBindTeam = {
        url:API + '/console/2.0/sina/cancelBindTeam/:id'
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
