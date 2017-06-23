angular.module('proposal', [])

.config(function ProposalRoutes($stateProvider) {
    $stateProvider

    .state('proposal', { abstract: true, parent: 'admin', url: '/proposal' })

    .state('proposal.roles', {
        url: '/roles',
        views: {
            'main@admin': {
                templateUrl: 'admin/proposal/roles.html',
                controller: 'ProposalRolesController as vm',
                resolve: {
                    userRoles: function(Proposal) {
                        return Proposal.userRole().$promise.then(function(response) {
                            return _(response).partition(function(value) {
                                return value.departmentId === 0
                            })
                        })
                    },
                    departments: function(Department, AdminInfo) {
                        return Department.search({
                            orgId: AdminInfo.currentAdmin.userInfo.orgId
                        })
                    }
                }
            }
        }
    })

    .state('proposal.options', {
        url: '/options',
        views: {
            'main@admin': {
                templateUrl: 'admin/proposal/options.html',
                controller: 'ProposalOptionsController as vm',
                resolve: {
                    options: function(Proposal) { return Proposal.options() }
                }
            }
        }
    })

    .state('proposal.export', {
        url: '/export',
        views: {
            'main@admin': {
                templateUrl: 'admin/proposal/export.html',
                controller: 'ProposalExportController as vm'
            }
        }
    })
})

.service('Proposal', ProposalModel)

.controller('ProposalRolesController', ProposalRolesController)
.controller('ProposalOptionsController', ProposalOptionsController)
.controller('ProposalExportController', ProposalExportController)
