function BroadcastModel(API, $resource) {
    this.actions = {};

    this.actions.pushContent = {
        method: 'POST',
        url: API + '/console/2.0/app/push'
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
