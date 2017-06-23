function vnPageHeadingComponent() {
    return {
        restrict: 'E',
        scope: {
            heading:    '@',
            subHeading: '@'
        },
        templateUrl: 'components/vn-elements/vn-page-heading/template.html',
        controller: 'vnPageHeadingController as vm',
        bindToController: true
    }
}

function vnPageHeadingController() {
    var vm = this
}
