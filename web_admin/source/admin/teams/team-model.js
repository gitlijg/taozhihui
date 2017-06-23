function TeamModel(API, $resource) {
    this.url = API + '/console/2.0/team/:id'
    this.params = {}
    this.actions = {}

    this.actions.search = {
        method: 'POST',
        url: API + '/console/2.0/team/list'
    }

    this.actions.create = this.actions.update = {
        method: 'POST',
        url: API + '/console/2.0/team/save'
    }

    this.actions.delete = {
        method: 'GET',
        url: API + '/console/2.0/team/delete/:id'
    }

    var constructor = $resource.call(this, this.url, this.params, this.actions)

    constructor.prototype.groupUserListByID = function() {
        return _.map(this.userList, function(value) { return { id: value.id } })
    }

    constructor.prototype.flattenUserListID = function() {
        return _.map(this.userList, function(value) { return value.id })
    }

    return constructor
}
