//= =====================
// Auth Actions
//= =====================
export const AUTH_LOCAL_USER = 'auth_local_user',
  AUTH_AZURE_USER = 'auth_azure_user',
  UNAUTH_USER = 'unauth_user',
  AUTH_ERROR = 'auth_error',
  FORGOT_PASSWORD_REQUEST = 'forgot_password_request',
  RESET_PASSWORD_REQUEST = 'reset_password_request',
  PROTECTED_TEST = 'protected_test';

//= =====================
// User Profile Actions
//= =====================
export const FETCH_USER = 'fetch_user',
  ERROR_RESPONSE = 'error_response'; 

export const GET_DATA = 'get_data',
  PUT_DATA = 'put_data',
  POST_DATA = 'post_data';

//case types
export const SMALL_CLAIMS = 'smallClaims',
  GUARDIANSHIP = 'guardianship';

//party
export const PLAINTIFF = 'plaintiff',
  DEFENDANT = 'defendant';

//= =====================
// Page Actions
//= =====================
export const SEND_CONTACT_FORM = 'send_contact_form',
  STATIC_ERROR = 'static_error';

//case data
export const UPDATE_CASE = 'update_case',
  LOAD_TODOS = 'load_todos';

// page data
export const FETCH_PAGE_DATA = 'FETCH_PAGE_DATA';

// checklist 
export const GET_ALL_TASKS = "GET_ALL_TASKS";
export const POST_TASK = "POST_TASK";
export const CHANGE_STATUS = "CHANGE_STATUS";
export const LOAD_CHECKLIST = 'LOAD_CHECKLIST';

//redux example
export const SELECT_CHECKLIST = 'SELECT_CHECKLIST'
export const REQUEST_TASKS = 'REQUEST_TASKS'
export const INVALIDATE_CHECKLIST = 'INVALIDATE_CHECKLIST'
export const RECEIVE_TASKS = 'RECEIVE_TASKS'

//default language
export const DEFAULT_LANG = 'en-US';

//= ======================
// Contentful action types
//= ======================
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_PAGE = "FETCH_PAGE";
export const FETCH_ASSET = "FETCH_ASSET";
export const FETCH_PARTIES = "FETCH_PARTIES";
export const FETCH_FAQS = "FETCH_FAQS";
export const FETCH_FORMS = "FETCH_FORMS";
export const FETCH_FORM_LAYOUT = "FETCH_FORM_LAYOUT";
export const FETCH_FOOTER_LAYOUT = "FETCH_FOOTER_LAYOUT";
export const FETCH_MENU_LINKS = "FETCH_MENU_LINKS";
export const FETCH_FAQ_LAYOUT = "FETCH_FAQ_LAYOUT";
export const FETCH_FAQ_SUBCATEGORIES = "FETCH_FAQ_SUBCATEGORIES";
export const FETCH_CONTENT = "FETCH_CONTENT";
export const FETCH_CHECKLIST = "FETCH_CHECKLIST";
export const FETCH_SUBCONTENT = "FETCH_SUBCONTENT";
export const FETCH_CONTACT_LAYOUT = "FETCH_CONTACT_LAYOUT";
export const FETCH_RESOURCE_LINKS = "FETCH_RESOURCE_LINKS";
export const FETCH_STAGES = "FETCH_STAGES";
export const FETCH_VIDEOS = "FETCH_VIDEOS";
export const FETCH_VIDEO_LINKS = "FETCH_VIDEO_LINKS";
export const FETCH_VIDEO_CATEGORIES = "FETCH_VIDEO_CATEGORIES";
export const STORE_STAGE_ID = "STORE_STAGE_ID";
export const SAVE_ID = "SAVE_ID";
