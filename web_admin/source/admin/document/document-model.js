function DocumentModel(API, $resource) {
    this.params = { id: '@id' };
    this.actions = {};

    this.actions.folderList = {
        url: API + '/console/2.0/document/folderList'
    };

    this.actions.updateFolder = {
        url: API + '/console/2.0/document/updateFolder',
        method:'POST'
    };

    this.actions.fileList = {
        url: API + '/console/2.0/document/fileList/:id',
        isArray:true
    };

    this.actions.addFileToFolder = {
        url: API + '/mobile/document/addFileToFolder/:folderId/:fileId'
    };


    return $resource.call(this, this.url, this.params, this.actions)
}
