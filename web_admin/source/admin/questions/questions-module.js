angular.module('questions', [])

.config(function QuestionsRoutes($stateProvider) {
    $stateProvider.state('questions', {
        parent: 'admin',
        url: '/questions?{query:string}&{name:string}&{page:int}&{size:int}',
        params: {
            query: null,
            name: null,
            page: { value: 1, squash: true },
            size: { value: 10, squash: true }
        },
        views: {
            'main@admin': {
                templateUrl: 'admin/questions/list.html',
                controller: 'QuestionsController as vm',
                resolve: {
                    initialList: function(Question, $stateParams) {
                        return Question.search({
                            questionContent: $stateParams.query,
                            createName: $stateParams.name,
                            pageInfo: {
                                pageSize: $stateParams.size,
                                pageNumber: $stateParams.page
                            }
                        })
                    }
                }
            }
        }
    })
})

.service('Question', QuestionModel)

.controller('QuestionsController', QuestionsController)
