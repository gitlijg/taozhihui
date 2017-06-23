function ImageModel(API, $resource) {
    this.params = { id: '@id' };
    this.actions = {};

    this.actions.queryfolder = {
        method: 'POST',
        url: API + '/console/2.0/imageFolder/queryfolder'
    },

    this.actions.addImageFolder = {
        method: 'POST',
        url: API + '/console/2.0/imageFolder/addImageFolder'
    },

    this.actions.updateImageFolder = {
        method: 'POST',
        url: API + '/console/2.0/imageFolder/updateImageFolder'
    },

    this.actions.delete = {
        url: API + '/console/imageFolder/deleteImageFolder/:id'
    },

    this.actions.imagesByFolder = {
        url: API + '/console/2.0/imageFolder/imagesByFolder/:folderId'
    },

    this.actions.addImage = {
        method: 'POST',
        url: API + '/console/2.0/imageFolder/addImage'
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
