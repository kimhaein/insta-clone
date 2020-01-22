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

    // contents

    CONTENTS          : "/contents",
    CONTENTS_UPLOAD    : '/contents/upload',
    UPLOAD            : '/upload',
    REPLY            : '/reply',
    CONTENTS_DETAIL : id => {
        if (id) {
          return `/contents/${id}`;
        } else {
          return ERR;
        }
    },
    editContent       : id => {
        if (id) {
          return `/contents/${id}/edit`;
        } else {
          return ERR;
        }
    },
    deleteContent     : id => {
        if (id) {
          return `/contents/${id}/delete`;
        } else {
          return ERR;
        }
    }
}