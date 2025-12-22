export const API_URL = 'https://talkook.com:8001';
//export const SOCKET_URL = "ws://127.0.0.1:3001/ws";
export const SOCKET_URL = 'wss://talkook.com:8001/ws';
// export const API_URL = "http://192.168.0.77:80";
//export const API_URL = "http://127.0.0.1:80";
// export const API_URL = "http://192.168.0.65:8000";
// export const SOCKET_URL = "ws://192.168.0.65:8000/ws";

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// auth
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

export const AUTH_ACCESS_TOKEN_PREFIXES = 'accessToken';
export const AUTH_REFRESH_TOKEN_PREFIXES = 'refreshToken';

export const AUTH_SEND_CODE_ADDRESS = '/api/v1/auth/verification/phone/send';
export const AUTH_VERIFY_CODE_ADDRESS =
  '/api/v1/auth/verification/phone/verify';
export const AUTH_REFRESH_TOKEN_ADDRESS = '/api/v1/auth/token/refresh';
//
export const AUTH_DELETE_ACCOUNT_ADDRESS = '/api/v1/auth/account/delete';
export const AUTH_DEACTIVE_ACCOUNT_ADDRESS = '/api/v1/auth/account/deactivate';

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// structure
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

export const PUBLIC_PHONE_SUFFIXES_ADDRESS =
  '/api/v1/config/meta/countries/phone-codes';
export const PUBLIC_AVAILABLE_COUNTRIES = '/api/v1/config/meta/countries';
export const PUBLIC_AVAILABLE_LANGUAGES_APP = '/api/v1/config/meta/languages';
export const PUBLIC_AVAILABLE_LINKS = '/api/v1/config/meta/links';
export const PUBLIC_AVAILABLE_THEME_APP = '/api/v1/config/meta/themes';
export const PUBLIC_AVAILABLE_TIMEZONES = '/api/v1/config/meta/timezones';
export const PUBLIC_AVAILABLE_DAILY_STUDY_LIMIT =
  '/api/v1/user/meta/study-goals';
export const PUBLIC_AVAILABLE_NATIVE_LANGUAGES =
  '/api/v1/user/meta/native-languages';
export const PUBLIC_AVAILABLE_LANGUAGE_LEVEL =
  '/api/v1/user/meta/proficiency-levels';
export const PUBLIC_AVAILABLE_TYPES = '/api/v1/user/meta/types'; //
export const PUBLIC_AVAILABLE_SUBSCRIPTION_TYPE =
  '/api/v1/billing/meta/subscription-plans';
//
export const PUBLIC_AVAILABLE_BOT_BASE = '/api/v1/courses/meta/ai-models';
export const PUBLIC_AVAILABLE_COURSE_TYPE = '/api/v1/courses/meta/types';
export const PUBLIC_AVAILABLE_TRAINING_TOPICS = '/api/v1/courses/meta/topics';
export const PUBLIC_AVAILABLE_TRAINING_LANGUAGES =
  '/api/v1/courses/meta/languages';
export const PUBLIC_AVAILABLE_LANGUAGE_LEVEL_CREATE =
  '/api/v1/courses/meta/difficulty-levels';
export const PUBLIC_AVAILABLE_TICKET_TYPE = '/api/v1/support/meta/ticket-types';
//

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////users
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

// export const PUBLIC_AVAILABLE_DEFAULT_CREATE_COURSE =
//   "/api/v1/users/courses/new/";

// Delete All Chats
export const USERS_DELETE_ALL_CHATS = '/api/v1/courses/all-following';

// Creators
export const USERS_CREATOR_TOTAL_DATA_HISTORY = '/api/v1/creator/stats/history';
export const USERS_CREATOR_TOTAL_DATA = '/api/v1/creator/stats/summary';
export const USERS_CREATOR_COURSE_DATA = '/api/v1/creator/stats/course';

// Enrolled Courses
export const USERS_ENROLLED_COURSE = '/api/v1/courses/enroll';

// Following Courses
export const USERS_FLOWING_COURSE = '/api/v1/courses/following';

// Discovery
export const USERS_DISCOVERY_COURSES = '/api/v1/courses/discover';

// Activities
export const USERS_BONUS_NEW = '/api/v1/user/bonus/current';
export const USERS_BONUS_HISTORY = '/api/v1/user/bonus/history';
export const USERS_SUBSCRIBE_NEW = '/api/v1/user/subscription';
export const USERS_DAILY_ACTIVITY_ADDRESS = '/api/v1/user/activities/daily';
export const USERS_PAST_ACTIVITIES_ADDRESS = '/api/v1/user/activities/history';

// Personal courses and their creation
export const USERS_SELF_MADE_COURSES = '/api/v1/courses/self-made';

// Tickets
export const USERS_CREATE_TICKET = '/api/v1/user/tickets';

// Profile and Settings
export const USERS_PROFILE = '/api/v1/user/profile';
export const USERS_SETTINGS = '/api/v1/user/settings';

// Details and Comments
export const USERS_COURSE_DETAILS = '/api/v1/courses/details';
export const USERS_COURSE_COMMENTS = '/api/v1/courses/comments';
export const USERS_COURSE_SELF_COMMENT = '/api/v1/courses/self-comments';

// Leitner System Endpoints
export const USERS_LEITNER_SETTINGS = '/api/v1/user/leitner/settings';
export const USERS_LEITNER_LISTS = '/api/v1/user/leitner/lists';
export const USERS_LEITNER_WORDS = '/api/v1/user/leitner/words';
export const USERS_LEITNER_WORDS_DUE = '/api/v1/user/leitner/words/due';
export const USERS_LEITNER_WORDS_PROGRESS =
  '/api/v1/user/leitner/words/progress';
export const USERS_LEITNER_AI_TRANSLATION =
  '/api/v1/user/leitner/ai-translation';
// Course Following`
export const USERS_COURSE_SETTINGS = '/api/v1/courses/following/settings';
export const USERS_COURSE_STRUCTURES = '/api/v1/courses/following/structure';

// Knowledge Base Statically
export const USERS_KNOWLEDGE_BASE_TUTORIAL_CONTENT_TYPE =
  '/api/v1/knowledge-base/meta/tutorial-content-types';
export const USERS_KNOWLEDGE_BASE_EXAM_CONTENT_TYPE =
  '/api/v1/knowledge-base/meta/exam-content-types';
export const USERS_KNOWLEDGE_BASE_TUTORIAL_GENERATOR_STYLE_TYPE =
  '/api/v1/knowledge-base/meta/tutorial-generator-style-types';
export const USERS_KNOWLEDGE_BASE_TUTORIAL_GENERATOR_LENGTH_TYPE =
  '/api/v1/knowledge-base/meta/tutorial-generator-length-types';
export const USERS_KNOWLEDGE_BASE_EXAM_GENERATOR_DIFFICULTY_TYPE =
  '/api/v1/knowledge-base/meta/exam-generator-difficulty-types';
export const USERS_KNOWLEDGE_BASE_AI_ASSISTANT_RESPONSE_STYLE_TYPE =
  '/api/v1/knowledge-base/meta/ai-assistant-response-style-types';
export const USERS_KNOWLEDGE_BASE_AI_ASSISTANT_INTERACTION_FREQUENCY_TYPE =
  '/api/v1/knowledge-base/meta/ai-assistant-interaction-frequency-types';

// Knowledge Base Dynamically
export const USERS_KNOWLEDGE_BASE = '/api/v1/knowledge-base/self-made';
export const USERS_KNOWLEDGE_BASE_STRUCTURE =
  '/api/v1/knowledge-base/structure';
export const USERS_KNOWLEDGE_BASE_CHAPTERS = '/api/v1/knowledge-base/chapter';
export const USERS_KNOWLEDGE_BASE_LESSONS = '/api/v1/knowledge-base/lesson';
export const USERS_KNOWLEDGE_BASE_TUTORIALS = '/api/v1/knowledge-base/tutorial';
export const USERS_KNOWLEDGE_BASE_EXAMS = '/api/v1/knowledge-base/exam';
export const USERS_KNOWLEDGE_BASE_TUTORIAL_GENERATOR =
  '/api/v1/knowledge-base/tutorial-generator';
export const USERS_KNOWLEDGE_BASE_EXAM_GENERATOR =
  '/api/v1/knowledge-base/exam-generator';
export const USERS_KNOWLEDGE_BASE_AI_ASSISTANT =
  '/api/v1/knowledge-base/ai-assistant';