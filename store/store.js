import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./auth/authSlice";
// import loadingSlice from "./loading/loadingSlice";
// import SuperUserSlice from "./superUser/superUserSlice";
import SuperPublicSlice from "./superPublic/superPublicSlice";
import themeSlice from "./theme/themeSlice";
// import { dashboardStreamingApi } from "./dashboardStreamingApi";

const Store = configureStore({
  reducer: {
    auth: AuthSlice,
    superPublic: SuperPublicSlice,
    theme: themeSlice,
    // loading: loadingSlice,
   // superUser: SuperUserSlice,
    // superPublic: SuperPublicSlice,
    // [dashboardStreamingApi.reducerPath]: dashboardStreamingApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(dashboardStreamingApi.middleware),
});

export default Store;