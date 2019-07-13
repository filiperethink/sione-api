export const API_MESSAGES = {
  generic: {
    error: 'invalid_request',
    notFound: 'cannot_found_by_id',
    nothingToUpdate: 'notthing_to_update',
  },
  auth: {
    unAuthorized: 'unauthorized',
    email: 'email_not_exists',
    tryAgain: 'try_again',
    error: 'auth_error',
  },
  users: {
    create: {
      success: 'created_succefully',
      error: 'cannot_create',
    },
    update: {
      success: 'updated_succefully',
      error: 'cannot_update',
    },
    remove: {
      success: 'removed_succefully',
      error: 'cannot_remove',
    },
    getById: {
      success: 'getById_succefully',
      error: 'cannot_getById',
    },
    getAll: {
      success: 'getAll_succefully',
      error: 'cannot_getAll',
    },
  },
  peladas: {
    getById: {
      success: 'get_by_id_succefully',
      error: 'cannot_get_by_id',
    },
    getAll: {
      success: 'get_all_succefully',
      error: 'cannot_get_all',
    },
    update: {
      success: 'updated_succefully',
      error: 'cannot_update',
    },
    remove: {
      success: 'removed_succefully',
      error: 'cannot_remove',
    },
    create: {
      success: 'created_succefully',
      error: {
        nameTaken: 'name_already_taken',
      },
    },
  },
};
