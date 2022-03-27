import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { persistState } from "../store";

export const Api = createApi({
  reducerPath: "missionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5002",
  }),
  tagTypes: ["Post", "User"],
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (initialPost) => ({
        url: "/login",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
        credentials: "include",
      }),
    }),
    updateUser: builder.mutation({
      query: (initialPost) => ({
        url: "/update/user",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
    }),
    createUser: builder.mutation({
      query: (initialPost) => ({
        url: "/create/user",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
    }),
    updateSetting: builder.mutation({
      query: (initialPost) => ({
        url: "/update/setting",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
    }),
    createSetting: builder.mutation({
      query: (initialPost) => ({
        url: "/create/setting",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
    }),
    deleteSetting: builder.mutation({
      query: (id) => ({
        url: "/delete/setting/" + id,
        method: "DELETE",
      }),
    }),
    getSetting: builder.query<any[], void>({
      query: (id) => "/get/setting" + id,
    }),
    getMission: builder.query<any[], void>({
      query: (id) => "/get/mission/" + id,
    }),
    getMissions: builder.query<any[], void>({
      query: () => "/get/all/mission",
    }),
    getMissionsHours: builder.query<any[], void>({
      query: () => "/mission/hours",
    }),
    getMissionsNombre: builder.query<any[], void>({
      query: () => "/mission/nombre",
    }),
    createMission: builder.mutation({
      query: (initialPost) => ({
        url: "/create/mission",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
    }),
    deleteMission: builder.mutation({
      query: (id) => ({
        url: "/create/mission" + id,
        method: "DELETE",
      }),
    }),
  }),
});

export const settingApi = createApi({
  reducerPath: "settingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5002",
    prepareHeaders: (headers, { getState }) => {
      const {
        auth: { token: token },
      } = getState() as persistState;
      if (token) {
        console.log(token);
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  refetchOnReconnect: true,
  tagTypes: ["Setting"],
  endpoints: (builder) => ({
    updateSetting: builder.mutation({
      query: (initialPost) => ({
        url: "/update/setting",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
       }),
      invalidatesTags: ["Setting"],
    }),
    createSetting: builder.mutation({
      query: (initialPost) => ({
        url: "/create/setting",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
       }),
      invalidatesTags: ["Setting"],
    }),
    getSetting: builder.query<any[], void>({
      query: (id) => "/get/setting" + id,
      providesTags: ["Setting"],
    }),
  }),
});

export const missionApi = createApi({
  reducerPath: "missionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5002",
    prepareHeaders: (headers, { getState }) => {
      const {
        auth: { token: token },
      } = getState() as persistState;
      if (token) {
        console.log(token);
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
    
  }),
  tagTypes: ["Mission"],
  endpoints: (builder) => ({
    getMission: builder.query<any[], void>({
      query: (id) => "/get/mission/" + id,
    }),
    getMissions: builder.query<any[], void>({
      query: () => "/get/all/mission",
      providesTags: ["Mission"],
    }),
    getMissionsHours: builder.query<any[], void>({
      query: () => "/mission/hours",
      providesTags: ["Mission"],
    }),
    getMissionsNombre: builder.query<any[], void>({
      query: () => "/mission/nombre",
      providesTags: ["Mission"],
    }),
    createMission: builder.mutation({
      query: (initialPost) => ({
        url: "/create/mission",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
      invalidatesTags: ["Mission"],
    }),
    deleteMission: builder.mutation({
      query: (id) => ({
        url: "/create/mission" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Mission"],
    }),
  }),
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5002"
  }),
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (initialPost) => ({
        url: "/login",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
    }),
    updateUser: builder.mutation({
      query: (initialPost) => ({
        url: "/update/user",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
    }),
    createUser: builder.mutation({
      query: (initialPost) => ({
        url: "/create/user",
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;

export const {
  useCreateMissionMutation,
  useDeleteMissionMutation,
  useGetMissionQuery,
  useGetMissionsHoursQuery,
  useGetMissionsNombreQuery,
  useGetMissionsQuery,
} = missionApi;

export const {
  useCreateSettingMutation,
  useGetSettingQuery,
  useUpdateSettingMutation,
} = settingApi;
