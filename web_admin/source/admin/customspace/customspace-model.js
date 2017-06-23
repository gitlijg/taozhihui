function CustomspaceModel(API, $resource) {
    this.params = { id: '@id' };
    this.actions = {};

    this.actions.list = {
        url: API + '/console/2.0/survey/table/list/:type',
        isArray:true
    };

    this.actions.create = {
        method:'POST',
        url: API + '/console/2.0/survey/table/create'
    };

    //问题创建
    this.actions.fieldCreate = {
        method:'POST',
        url: API + '/console/2.0/survey/field/create'
    };

    //问题列表
    this.actions.fieldList = {
        url: API + '/console/2.0/survey/field/list/:tableId',
        isArray:true
    };

    //删除问题
    this.actions.fieldDelete = {
        url: API + '/console/2.0/survey/field/delete/:id'
    };

    //发布
    this.actions.publish = {
        url: API + '/console/2.0/survey/publish/:id'
    };

    //关闭
    this.actions.close = {
        url: API + '/console/2.0/survey/close/:id'
    };

    //修改问卷
    this.actions.update = {
        method:'POST',
        url: API + '/console/2.0/survey/table/update'
    };

    return $resource.call(this, this.url, this.params, this.actions)

}
