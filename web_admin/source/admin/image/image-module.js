angular.module('image', [])

.config(function ImageRoutes($stateProvider) {
    $stateProvider

    .state('image', {
        parent: 'admin',
        url: '/image',
        views: {
            'main': {
                templateUrl: 'admin/image/list.html',
                controller: 'ImageController as vm'
            }
        }
    })

    .state('image-photos', {
        parent: 'admin',
        url: '/photos?{folderId:int}',
        views: {
            'main': {
                templateUrl: 'admin/image/photos.html',
                controller: 'PhotosController as vm'
            }
        }
    })
})

.service('Image', ImageModel)

.controller('ImageController', ImageController)
.controller('PhotosController', PhotosController)
