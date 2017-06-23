angular.module('document', [])

.config(function DocumentRoutes($stateProvider) {
    $stateProvider

    .state('document', {
        parent: 'admin',
        url: '/document',
        views: {
            'main': {
                templateUrl: 'admin/document/list.html',
                controller: 'DocumentController as vm'
            }
        }
    })

    .state('document-file', {
            parent: 'admin',
            url: '/file?{folderId:int}',
            views: {
                'main': {
                    templateUrl: 'admin/document/files.html',
                    controller: 'FileController as vm'
                }
            }
        })
})

.service('Document', DocumentModel)

.controller('DocumentController', DocumentController)
.controller('FileController', FileController)
