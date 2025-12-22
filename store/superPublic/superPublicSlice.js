import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { LogoutAction } from "../auth/authSlice";

import {
  PUBLIC_PHONE_SUFFIXES_ADDRESS,
  PUBLIC_AVAILABLE_COUNTRIES,
  PUBLIC_AVAILABLE_DAILY_STUDY_LIMIT,
  PUBLIC_AVAILABLE_LANGUAGE_LEVEL,
  PUBLIC_AVAILABLE_LANGUAGES_APP,
  PUBLIC_AVAILABLE_LINKS,
  PUBLIC_AVAILABLE_THEME_APP,
  PUBLIC_AVAILABLE_TIMEZONES,
  PUBLIC_AVAILABLE_NATIVE_LANGUAGES,
  PUBLIC_AVAILABLE_TRAINING_LANGUAGES,
  PUBLIC_AVAILABLE_TRAINING_TOPICS,
  PUBLIC_AVAILABLE_SUBSCRIPTION_TYPE,
  PUBLIC_AVAILABLE_BOT_BASE,
  PUBLIC_AVAILABLE_COURSE_TYPE,
  PUBLIC_AVAILABLE_LANGUAGE_LEVEL_CREATE,
  PUBLIC_AVAILABLE_TICKET_TYPE,
  PUBLIC_AVAILABLE_TYPES,
} from "../../utils/baseUrls";

const REQUEST_TYPES2 = {
  phoneSuffixes: "PHONE_SUFFIXES",
  countries: "COUNTRIES",
  dailyStudyLimit: "DAILY_STUDY_LIMIT",
  languageLevel: "LANGUAGE_LEVEL",
  languagesApp: "LANGUAGES_APP",
  links: "LINKS",
  themeApp: "THEME_APP",
  timezones: "TIMEZONES",
  nativeLanguages: "NATIVE_LANGUAGES",
  trainingLanguages: "TRAINING_LANGUAGES",
  trainingTopics: "TRAINING_TOPICS",
  subscriptionType: "SUBSCRIPTION_TYPE",
  botBase: "BOT_BASE",
  courseType: "COURSE_TYPE",
  languageLevelCreate: "LANGUAGE_LEVEL_CREATE",
  ticketType: "TICKET_TYPE",
  userType: "USER_TYPE",
};
// Define constants for request types
const REQUEST_TYPES = {
  PHONE_SUFFIXES: "phoneSuffixes",
  COUNTRIES: "countries",
  DAILY_STUDY_LIMIT: "dailyStudyLimit",
  LANGUAGE_LEVEL: "languageLevel",
  LANGUAGES_APP: "languagesApp",
  LINKS: "links",
  THEME_APP: "themeApp",
  TIMEZONES: "timezones",
  NATIVE_LANGUAGES: "nativeLanguages",
  TRAINING_LANGUAGES: "trainingLanguages",
  TRAINING_TOPICS: "trainingTopics",
  SUBSCRIPTION_TYPE: "subscriptionType",
  BOT_BASE: "botBase",
  COURSE_TYPE: "courseType",
  LANGUAGE_LEVEL_CREATE: "languageLevelCreate",
  TICKET_TYPE: "ticketType",
  USER_TYPE: "userType",
};

// Define mapping for endpoints
const ENDPOINT_MAP = {
  [REQUEST_TYPES.PHONE_SUFFIXES]: PUBLIC_PHONE_SUFFIXES_ADDRESS,
  [REQUEST_TYPES.COUNTRIES]: PUBLIC_AVAILABLE_COUNTRIES,
  [REQUEST_TYPES.DAILY_STUDY_LIMIT]: PUBLIC_AVAILABLE_DAILY_STUDY_LIMIT,
  [REQUEST_TYPES.LANGUAGE_LEVEL]: PUBLIC_AVAILABLE_LANGUAGE_LEVEL,
  [REQUEST_TYPES.LANGUAGES_APP]: PUBLIC_AVAILABLE_LANGUAGES_APP,
  [REQUEST_TYPES.LINKS]: PUBLIC_AVAILABLE_LINKS,
  [REQUEST_TYPES.THEME_APP]: PUBLIC_AVAILABLE_THEME_APP,
  [REQUEST_TYPES.TIMEZONES]: PUBLIC_AVAILABLE_TIMEZONES,
  [REQUEST_TYPES.NATIVE_LANGUAGES]: PUBLIC_AVAILABLE_NATIVE_LANGUAGES,
  [REQUEST_TYPES.TRAINING_LANGUAGES]: PUBLIC_AVAILABLE_TRAINING_LANGUAGES,
  [REQUEST_TYPES.TRAINING_TOPICS]: PUBLIC_AVAILABLE_TRAINING_TOPICS,
  [REQUEST_TYPES.SUBSCRIPTION_TYPE]: PUBLIC_AVAILABLE_SUBSCRIPTION_TYPE,
  [REQUEST_TYPES.BOT_BASE]: PUBLIC_AVAILABLE_BOT_BASE,
  [REQUEST_TYPES.COURSE_TYPE]: PUBLIC_AVAILABLE_COURSE_TYPE,
  [REQUEST_TYPES.LANGUAGE_LEVEL_CREATE]: PUBLIC_AVAILABLE_LANGUAGE_LEVEL_CREATE,
  [REQUEST_TYPES.TICKET_TYPE]: PUBLIC_AVAILABLE_TICKET_TYPE,
  [REQUEST_TYPES.USER_TYPE]: PUBLIC_AVAILABLE_TYPES,
};

export const superPublicMultipleData = createAsyncThunk(
  "superPublic/multiple-data",
  async (
    {
      requests = Object.keys(REQUEST_TYPES).reduce((acc, key) => {
        acc[key] = {
          shouldFetch: false,
          params: {},
          method: "GET", // Default method is GET
        };
        return acc;
      }, {}),
    } = {},
    thunkAPI
  ) => {
    try {
      const apiRequests = [];
      const requestTypes = [];

      Object.entries(requests).forEach(([type, config]) => {
        if (config.shouldFetch) {
          const endpoint = ENDPOINT_MAP[type];
          if (endpoint) {
            const method = config.method?.toUpperCase() || "GET";
            const requestConfig = {
              params: config.params,
              data: config.data, // For POST/PUT/PATCH requests
            };

            let apiRequest;
            switch (method) {
              case "GET":
                apiRequest = api.get(endpoint, requestConfig);
                break;
              case "POST":
                apiRequest = api.post(endpoint, config.data, requestConfig);
                break;
              case "PUT":
                apiRequest = api.put(endpoint, config.data, requestConfig);
                break;
              case "PATCH":
                apiRequest = api.patch(endpoint, config.data, requestConfig);
                break;
              case "DELETE":
                apiRequest = api.delete(endpoint, requestConfig);
                break;
              default:
                apiRequest = api.get(endpoint, requestConfig);
            }

            apiRequests.push(apiRequest);
            requestTypes.push(type);
          }
        }
      });

      const responses = await Promise.all(apiRequests);
      return createResponseObject(responses, requestTypes);
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

// Helper functions
const createResponseObject = (responses, requestTypes) => {
  return responses.reduce((acc, response, index) => {
    const type = requestTypes[index];
    // If the response is a single object (not an array), store it directly
    if (
      response.data &&
      typeof response.data === "object" &&
      !Array.isArray(response.data)
    ) {
      acc[type] = response.data;
    } else {
      // If it's an array or other type, store it as is
      acc[type] = response.data;
    }
    return acc;
  }, {});
};

const handleError = (error, thunkAPI) => {
  if (error.response) {
    return thunkAPI.rejectWithValue(error.response.data);
  } else if (error.request) {
    return thunkAPI.rejectWithValue("No response from server");
  } else {
    return thunkAPI.rejectWithValue(error.message);
  }
};

// Define initialState
const initialState = {
  // Direct access fields (for backward compatibility and default GET access)
  phoneSuffixes: [],
  countries: [],
  dailyStudyLimit: [],
  languageLevel: [],
  languagesApp: [],
  links: [],
  themeApp: [],
  timezones: [],
  nativeLanguages: [],
  trainingLanguages: [],
  trainingTopics: [],
  subscriptionType: [],
  botBase: [],
  courseType: [],
  languageLevelCreate: [],
  ticketType: [],
  userType: [],
  // New data states for each request type and method combination
  dataStates: Object.keys(REQUEST_TYPES).reduce((acc, key) => {
    acc[key] = {
      GET: null,
      POST: null,
      PUT: null,
      PATCH: null,
      DELETE: null,
    };
    return acc;
  }, {}),

  // Loading states for each request type and method combination
  loadingStates: Object.keys(REQUEST_TYPES).reduce((acc, key) => {
    acc[key] = {
      GET: false,
      POST: false,
      PUT: false,
      PATCH: false,
      DELETE: false,
    };
    return acc;
  }, {}),
  // Error states for each request type and method combination
  errorStates: Object.keys(REQUEST_TYPES).reduce((acc, key) => {
    acc[key] = {
      GET: false,
      POST: false,
      PUT: false,
      PATCH: false,
      DELETE: false,
    };
    return acc;
  }, {}),
  // Message states for each request type and method combination
  messages: Object.keys(REQUEST_TYPES).reduce((acc, key) => {
    acc[key] = {
      GET: null,
      POST: null,
      PUT: null,
      PATCH: null,
      DELETE: null,
    };
    return acc;
  }, {}),
};

// Define slice
const SuperPublicSlice = createSlice({
  name: "superPublic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Listen for auth logout action to clear any user-specific data
      .addCase(LogoutAction, (state) => {
        // Note: Most superPublic data is static and doesn't need to be cleared
        // But we can clear any user-specific data here if needed in the future
        // For now, we'll keep the data as it's mostly static reference data
      })
      .addCase(superPublicMultipleData.pending, (state, action) => {
        // Update loading state for each request type that should be fetched
        Object.entries(action.meta.arg.requests).forEach(([type, config]) => {
          if (config.shouldFetch && state.loadingStates[REQUEST_TYPES2[type]]) {
            const method = config.method?.toUpperCase() || "GET";
            state.loadingStates[REQUEST_TYPES2[type]][method] = true;
            state.errorStates[REQUEST_TYPES2[type]][method] = false;
            state.messages[REQUEST_TYPES2[type]][method] = null;
          }
        });
      })
      .addCase(superPublicMultipleData.fulfilled, (state, action) => {
        // Update states for each request type that was fetched
        Object.entries(action.meta.arg.requests).forEach(([type, config]) => {
          if (config.shouldFetch && state.loadingStates[REQUEST_TYPES2[type]]) {
            const method = config.method?.toUpperCase() || "GET";

            // Handle DELETE operations
            if (method === "DELETE") {
              const deleteResponse = action.payload[type];
              let deletedItemId;

              // Try to get the deleted item ID from different possible response structures
              if (deleteResponse?.id) {
                deletedItemId = deleteResponse.id;
              } else if (deleteResponse?.data?.id) {
                deletedItemId = deleteResponse.data.id;
              } else if (config.params?.id) {
                deletedItemId = config.params.id;
              } else if (
                typeof deleteResponse === "number" ||
                typeof deleteResponse === "string"
              ) {
                deletedItemId = deleteResponse;
              }

              // If we have an ID to work with
              if (deletedItemId !== undefined) {
                // Update direct access field if it's an array
                if (Array.isArray(state[type])) {
                  state[type] = state[type].filter((item) => {
                    return (
                      item.id !== deletedItemId &&
                      item._id !== deletedItemId &&
                      item.Id !== deletedItemId
                    );
                  });
                }

                // Update GET method data if it's an array
                const getMethodData =
                  state.dataStates[REQUEST_TYPES2[type]]["GET"];
                if (Array.isArray(getMethodData)) {
                  state.dataStates[REQUEST_TYPES2[type]]["GET"] =
                    getMethodData.filter((item) => {
                      return (
                        item.id !== deletedItemId &&
                        item._id !== deletedItemId &&
                        item.Id !== deletedItemId
                      );
                    });
                }
              }

              // Update method-specific state for DELETE
              state.dataStates[REQUEST_TYPES2[type]][method] =
                action.payload[type];
            }
            // Handle other methods (GET, POST, PUT, PATCH)
            else {
              if (action.payload && action.payload[type]) {
                // Update direct access field for GET requests
                if (method === "GET") {
                  state[type] = action.payload[type];
                }
                // Update method-specific state
                state.dataStates[REQUEST_TYPES2[type]][method] =
                  action.payload[type];
              }
            }

            state.loadingStates[REQUEST_TYPES2[type]][method] = false;
            state.errorStates[REQUEST_TYPES2[type]][method] = false;
            state.messages[REQUEST_TYPES2[type]][method] =
              "Data loaded successfully";
          }
        });
      })
      .addCase(superPublicMultipleData.rejected, (state, action) => {
        // Update error states for each request type that was attempted
        Object.entries(action.meta.arg.requests).forEach(([type, config]) => {
          if (config.shouldFetch && state.loadingStates[REQUEST_TYPES2[type]]) {
            const method = config.method?.toUpperCase() || "GET";
            state.loadingStates[REQUEST_TYPES2[type]][method] = false;
            state.errorStates[REQUEST_TYPES2[type]][method] = true;
            if (typeof action.payload === "object" && action.payload !== null) {
              state.messages[REQUEST_TYPES2[type]][method] =
                action.payload.message || "An unknown error occurred";
            } else if (typeof action.payload === "string") {
              state.messages[REQUEST_TYPES2[type]][method] = action.payload;
            } else {
              state.messages[REQUEST_TYPES2[type]][method] =
                "An unknown error occurred";
            }
          }
        });
      });
  },
});

export default SuperPublicSlice.reducer;