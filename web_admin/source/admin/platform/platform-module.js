angular.module('platform', [])

.config(function PlatformRoute($stateProvider) {
    $stateProvider

    .state('platform', { abstract: true, parent: 'admin', url: '/platform' })

    .state('organizations', {
        parent: 'platform',
        url: '^/organizations?{page:int}&{size:int}',
        params: {
            page: { value: 1, squash: true },
            size: { value: 10, squash: true }
        },
        views: {
            'main@admin': {
                templateUrl: 'admin/platform/organizations/list.html',
                controller: 'OrganizationsController as vm',
                resolve: {
                    organizations: function(AdminInfo, Organization, $stateParams) {
                        if (/\badmin\b/i.test(AdminInfo.currentAdmin.roleNames)) {
                            return Organization.search({
                                pageInfo: {
                                    pageNumber: $stateParams.page,
                                    pageSize: $stateParams.size
                                }
                            })
                        } else {
                            return Organization.search({ id: AdminInfo.currentAdmin.orgId })
                        }
                    }
                }
            }
        }
    })

    .state('departments', {
        parent: 'platform',
        url: '^/organizations/:organizationID/departments',
        views: {
            'main@admin': {
                templateUrl: 'admin/platform/departments/list.html',
                controller: 'DepartmentsController as vm',
                resolve: {
                    requests: function($stateParams, Organization, Department) {
                        return {
                            organization: Organization.get({
                                id: $stateParams.organizationID
                            }).$promise,
                            departments: Department.search({
                                orgId: $stateParams.organizationID,
                                pageInfo: { pageSize: 1000 }
                            }).$promise
                        }
                    }
                }
            }
        }
    })

    .state('departments.user', {
        url: '/:departmentID',
        views: {
            'main@admin': {
                templateUrl: 'admin/platform/departments/user.html',
                controller: 'DepartmentUserController as vm',
                resolve: {
                    requests: function($stateParams, Department) {
                        return {
                            department: Department.get({
                                id: $stateParams.departmentID
                            }).$promise,
                            users: Department.users({
                                departmentId: $stateParams.departmentID,
                                pageInfo: { pageSize: 50 }
                            }).$promise
                        }
                    }
                }
            }
        }
    })

    .state('roles', {
        parent: 'platform',
        url: '^/roles',
        views: {
            'main@admin': {
                templateUrl: 'admin/platform/roles/list.html',
                controller: 'RolesController as vm',
                resolve: {
                    roles: function(Role) {
                        return Role.search({ pageInfo: { pageSize: 50 } })
                    }
                }
            }
        }
    })
})

.service('Organization', OrganizationModel)
.service('Department', DepartmentModel)
.service('Role', RoleModel)

.controller('OrganizationsController', OrganizationsController)
.controller('DepartmentsController', DepartmentsController)
.controller('DepartmentUserController', DepartmentUserController)
.controller('RolesController', RolesController)
