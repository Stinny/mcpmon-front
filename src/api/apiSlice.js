import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Monitor'],
  endpoints: (builder) => ({
    getExample: builder.query({
      query: () => '/example',
    }),
    scanChannel: builder.mutation({
      query: (data) => ({
        url: '/scan',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: 'auth/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    // Monitor endpoints
    getMonitors: builder.query({
      query: (params) => {
        const queryString = params ? `?${new URLSearchParams(params)}` : '';
        return `monitors${queryString}`;
      },
      providesTags: ['Monitor'],
    }),
    getMonitor: builder.query({
      query: (id) => `monitors/${id}`,
      providesTags: (result, error, id) => [{ type: 'Monitor', id }],
    }),
    createMonitor: builder.mutation({
      query: (monitorData) => ({
        url: 'monitors',
        method: 'POST',
        body: monitorData,
      }),
      invalidatesTags: ['Monitor'],
    }),
    updateMonitor: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `monitors/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Monitor', id }, 'Monitor'],
    }),
    deleteMonitor: builder.mutation({
      query: (id) => ({
        url: `monitors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Monitor'],
    }),
    getMonitorStats: builder.query({
      query: (id) => `monitors/${id}/stats`,
    }),
    pauseMonitor: builder.mutation({
      query: (id) => ({
        url: `monitors/${id}/pause`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Monitor', id }, 'Monitor'],
    }),
    resumeMonitor: builder.mutation({
      query: (id) => ({
        url: `monitors/${id}/resume`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Monitor', id }, 'Monitor'],
    }),
    // Utility mutation for updating monitor cache from WebSocket
    updateMonitorCache: builder.mutation({
      queryFn: () => ({ data: null }),
      async onQueryStarted(monitorData, { dispatch, queryFulfilled }) {
        // Update the getMonitors cache
        dispatch(
          apiSlice.util.updateQueryData('getMonitors', undefined, (draft) => {
            if (draft && draft.data) {
              const index = draft.data.findIndex(
                (monitor) => monitor._id === monitorData._id
              );
              if (index !== -1) {
                // Update existing monitor
                draft.data[index] = {
                  ...draft.data[index],
                  ...monitorData,
                };
              }
            }
          })
        );

        // Update the specific monitor cache
        dispatch(
          apiSlice.util.updateQueryData('getMonitor', monitorData._id, (draft) => {
            if (draft) {
              Object.assign(draft, monitorData);
            }
          })
        );
      },
    }),
  }),
});

export const {
  useGetExampleQuery,
  useScanChannelMutation,
  useLoginMutation,
  useSignupMutation,
  useGetMonitorsQuery,
  useGetMonitorQuery,
  useCreateMonitorMutation,
  useUpdateMonitorMutation,
  useDeleteMonitorMutation,
  useGetMonitorStatsQuery,
  usePauseMonitorMutation,
  useResumeMonitorMutation,
  useUpdateMonitorCacheMutation,
} = apiSlice;
