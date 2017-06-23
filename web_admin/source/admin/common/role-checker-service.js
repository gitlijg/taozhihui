function RoleCheckerService() {
    var ADMIN_PATTERN    = /\badmin\b/i;
    var SUB_ADMIN_PATTERN = /\bsubadmin\b/i;
    var READONLY_PATTERN = /\breadonly\b/i;

    function RoleChecker(roleNames) {
        this.roles = roleNames

        this.isAdmin = (function() {
            return ADMIN_PATTERN.test(roleNames)
        }())

        this.isSubAdmin = (function() {
            return SUB_ADMIN_PATTERN.test(roleNames)
        }())

        this.isReadOnly = (function() {
            return READONLY_PATTERN.test(roleNames)
        }())
    }

    return RoleChecker
}
