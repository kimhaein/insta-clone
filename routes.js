export default {
    // global
    HOME    : '/',
    LOGIN   : '/login',
    LOGOUT  : '/logout',
    SEARCH  : '/search',
    ERR     : '/error',
    CONTENT : id => {
        if(id) {
            return `/content/${id}`
        } else {
            return ERR
        }
    },

    // users
    USERS       : '/users',
    USER_DETAIL : id => {
        if(id) {
            return `/users/${id}`
        } else {
            return ERR
        }
    },
    USER_EDIT   : '/edit',
}