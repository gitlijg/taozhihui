function Sorter(order, reverse) {
    this.order = order || 'id'
    this.reverse = reverse || false
    this.doneOnce = false
}

Sorter.prototype.reorder = function(order) {
    if (this.order === order) {
        if (this.doneOnce) {
            this.order = 'id'
            this.doneOnce = !this.doneOnce
        } else {
            this.reverse = !this.reverse
            this.doneOnce = !this.doneOnce
        }
    } else {
        this.order = order
        this.reverse = false
        this.doneOnce = false
    }
}

function SorterService() {
    return {
        init: function _SorterServiceInitialize(options) {
            return new Sorter(options.order, options.reverse)
        }
    }
}
