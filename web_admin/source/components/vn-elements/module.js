angular.module('vn.elements', [])

.directive('vnAutoHeight', vnAutoHeightComponent)

.directive('vnPageHeading', vnPageHeadingComponent)
.controller('vnPageHeadingController', vnPageHeadingController)

.directive('vnLinkBack', vnLinkBackComponent)
.controller('vnLinkBackController', vnLinkBackController)
