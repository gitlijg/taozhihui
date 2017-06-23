function ProposalOptionsController(
    options,
    Proposal,
    $scope,
    $state,
    $stateParams
) {
    var vm = this

    options.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.optionList = response

        vm.selectOptionGroup(0)
    })

    vm.selectOptionGroup = function(index) {
        vm.currentGroup = index
        vm.currentOptions = vm.optionList[index].option
    }

    vm.saveOption = function(option) {
        var params = _.pick(option, [
            'id', 'optionField', 'optionOrder', 'optionKey', 'optionValue'
        ])

        Proposal.saveOption(params).$promise
        .then(function(response) { $state.reload() })
        .catch(console.error.bind(console))
    }

    vm.addOption = function() {
        var newOption = {
            optionField: vm.optionList[vm.currentGroup]['key'],
            optionOrder: vm.currentOptions.length + 1
        }
        vm.currentOptions.push(newOption)
    }

    vm.deleteOption = function(option, index) {
        if (option.id) {
            Proposal.deleteOption({ id: option.id }).$promise
            .then(function(response) { $state.reload() })
            .catch(console.error.bind(console))
        } else vm.currentOptions.splice(index, 1)
    }
}
