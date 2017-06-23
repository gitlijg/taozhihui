angular.module('customspace', [])

.config(function CustomspaceRoutes($stateProvider) {
    $stateProvider
        .state('customspace', {
        parent: 'admin',
        url: '/customspace?{type:string}',
        params:{
            type:{ value: 'A', squash: true }
        },
        views: {
            'main@admin': {
                templateUrl: 'admin/customspace/list.html',
                controller: 'CustomspaceController as vm'
            }
        }
    })

        .state('customspace-fieldCreate', {
        parent: 'admin',
        url: '/field?{tableId}',
        views: {
            'main@admin': {
                templateUrl: 'admin/customspace/fieldCreate.html',
                controller: 'FieldCreateController as vm'
            }
        }
    })
})

.service('Customspace', CustomspaceModel)

.controller('CustomspaceController', CustomspaceController)
.controller('FieldCreateController', FieldCreateController)
