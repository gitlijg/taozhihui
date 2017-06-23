function vnLinkBackComponent() {
    return {
        restrict: 'E',
        scope: {
            target: '@',
            option: '@'
        },
        templateUrl: 'components/vn-elements/vn-link-back/template.html',
        controller: 'vnLinkBackController as vm',
        bindToController: true
    }
}

function vnLinkBackController() {
    var vm = this
}
