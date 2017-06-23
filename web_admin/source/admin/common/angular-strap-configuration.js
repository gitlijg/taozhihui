function ngStrapConfiguration(
    $asideProvider,
    $datepickerProvider,
    $timepickerProvider,
    $dropdownProvider,
    $modalProvider,
    $popoverProvider,
    $tooltipProvider,
    $typeaheadProvider
) {
    angular.extend($asideProvider.defaults, {
        animation: 'am-fade-and-slide-right',
        backdrop:  'static',
        container: 'body',
        placement: 'right',
        templateUrl:  'components/angular-strap/aside.html'
    })

    angular.extend($datepickerProvider.defaults, {
        animation:       'am-flip-x',
        autoclose:       true,
        dateFormat:      'yyyy年M月d日',
        dateType:        'string',
        iconLeft:        'fa fa-fw fa-chevron-left',
        iconRight:       'fa fa-fw fa-chevron-right',
        modelDateFormat: 'yyyy-MM-dd',
        startWeek:       1
    })

    angular.extend($timepickerProvider.defaults, {
        animation:       'am-flip-x',
        autoclose:       true,
        timeFormat:      'HH:mm',
        timeType:        'string',
        iconUp:        'fa fa-fw fa-chevron-up',
        iconDown:       'fa fa-fw fa-chevron-down',
        modelTimeFormat: 'HH:mm:ss'
    })

    angular.extend($dropdownProvider.defaults, {
        animation: 'am-fade-and-slide-top',
        container: 'body',
        placement: 'bottom',
        templateUrl:  'components/angular-strap/dropdown.html'
    })

    angular.extend($modalProvider.defaults, {
        animation: 'am-flip-x',
        container: 'body',
        templateUrl:  'components/angular-strap/modal.html'
    })

    angular.extend($popoverProvider.defaults, {
        animation: 'am-fade-and-slide-top',
        autoClose: true,
        delay:     { show: 200, hide: 200 },
        placement: 'left'
    })

    angular.extend($tooltipProvider.defaults, {
        delay:     { show: 1000, hide: 100 },
        placement: 'left'
    })

    angular.extend($typeaheadProvider.defaults, {
        animation: 'am-fade-and-slide-bottom',
        limit:     50,
        minLength: 0
    });
}
