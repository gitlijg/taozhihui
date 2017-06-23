function ReplaceFilter() {
    return function ReplaceFilterFunction(input, pattern, substitution) {
        if (_.isString(input) && (input.search(new RegExp(pattern, 'i')) !== -1))
            return input.replace(pattern, substitution)

        return input
    }
}
