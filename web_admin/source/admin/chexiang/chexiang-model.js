function ChexiangModel(API, $resource) {
    this.actions = {}

    this.actions.search = {
        method: 'POST',
        url: API + '/console/2.0/chexiang/user/list'
    }

    this.actions.unbind = {
        url: API + '/console/2.0/chexiang/user/unbind/:userId'
    }

    this.actions.bindAccount = {
        method: 'POST',
        url: API + '/console/2.0/chexiang/user/save'
    }

    this.actions.shop = {
        method: 'POST',
        url: API + '/console/2.0/chexiang/shop/list'
    }

    this.actions.shopDetail = {
        url: API + '/console/2.0/chexiang/shop/:id'
    }


    return $resource.call(this, '',{}, this.actions)
}
