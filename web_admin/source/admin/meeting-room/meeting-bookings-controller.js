function MeetingBookingsController(
    bookings,
    $stateParams,
    $state,
    MeetingRoom
) {
    var vm = this

    vm.queryParams = _.clone($stateParams);

    bookings.$promise.then(function(response) {
        vm.bookings = response[0].bookInfo
    })

    vm.search = function(){
        $state.go($state.$current,vm.queryParams)
    }

    vm.cancle = function(book){
        MeetingRoom.cancelBook({bookId: book.bookId}).$promise.then(function(){
            book.disabled = 1;
        })
    }
}
