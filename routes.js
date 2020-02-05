export default {
    // global
    HOME    : '/',
    LOGIN   : '/login',
    JOIN    : "/join",
    LOGOUT  : '/logout',
    SEARCH  : '/search',
    ERR     : '/error',

    // users
    USERS       : '/users',
    USER_DETAIL : id => {
        if(id) {
            return `/users/${id}`
        } else {
            return ERR
        }
    },
    USER_EDIT   : '/:id/edit',
    USER_LEAVE  : '/:id/leave',

    // contents

    CONTENTS         : '/contents',
    CONTENTS_UPLOAD  : '/contents/upload',
    EDIT             : '/:id/edit',
    UPLOAD           : '/upload',
    REPLY            : '/reply',
    LIKE             : '/like',
    CONTENTS_DETAIL  : id => {
        if (id) {
          return `/contents/detail/${id}`;
        } else {
          return ERR;
        }
    },
    CONTENTS_EDIT    : id => {
        if (id) {
          return `/contents/${id}/edit`;
        } else {
          return ERR;
        }
    },
    deleteContent    : id => {
        if (id) {
          return `/contents/${id}/delete`;
        } else {
          return ERR;
        }
    }
}