function ApiCodeInterceptorConfiguration($httpProvider) {
    function ApiCodeInterceptor($window, $injector, $q) {
        return {
            'response': function ApiCodeResponseInterceptor(response) {
                if (response.data.code) {
                    response.data.code = $window.parseInt(response.data.code)

                    if (response.data.code === 11111 || response.data.code === 10011) {
                        $injector.get('$state').go('session.signin')
                    }

                    if (response.data.code !== 10000) {
                        return $q.reject({
                            code:       response.data.code,
                            type:       'error',
                            classNames: ['alert', 'alert-danger'],
                            message:    response.data.msg
                        })
                    }
                }

                return response
            }
        }
    }

    $httpProvider.interceptors.push(ApiCodeInterceptor)
}
