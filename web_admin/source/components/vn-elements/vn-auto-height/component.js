function vnAutoHeightComponent($window, $document, $rootScope) {
    return {
        restrict: 'A',
        link: vnAutoHeightLink
    }

    function vnAutoHeightLink(scope, element, attrs) {
        function _calculateElementHeight() {
            var documentHeight = $document[0].documentElement.clientHeight
            var spareAmount = attrs.spare || 0
            var target = angular.isDefined(attrs.parent) ? element[0].parentElement : element[0]
            var elementOffsetTop = target.offsetTop
            target.style.height = (documentHeight - elementOffsetTop - spareAmount) + 'px';
            target.style.overflowY = 'scroll'
        }

        $rootScope.$on(attrs.listenOn, _calculateElementHeight)
        angular.element($window).on('resize', _calculateElementHeight)
    }
}
