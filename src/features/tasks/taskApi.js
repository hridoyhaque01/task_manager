import { apiSlice } from "../api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/projects",
    }),
    getTasks: builder.query({
      query: () => "/tasks",
    }),
    getTask: builder.query({
      query: (id) => `/tasks/${id}`,
    }),
    getTeams: builder.query({
      query: () => "/team",
    }),
    changeStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: { status: status },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        const patchStatus = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            const darftTask = draft?.find(
              // eslint-disable-next-line eqeqeq
              (draftItem) => draftItem.id == arg.id
            );
            darftTask.status = arg.status;
          })
        );
        // optimistic cache update end

        try {
          await queryFulfilled;
        } catch (err) {
          patchStatus.undo();
        }
      },
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: `/tasks`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // pessimistically add task
        try {
          const res = await queryFulfilled;
          const { data } = res || {};
          if (data?.id) {
            dispatch(
              apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                draft.push(data);
              })
            );
          }
        } catch (err) {}
      },
    }),
    editTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // pessimistically add task
        try {
          const res = await queryFulfilled;
          const { data: updatedData } = res || {};

          if (updatedData?.id) {
            dispatch(
              apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                const index = draft.findIndex(
                  (task) => task.id === updatedData.id
                );
                if (index !== -1) {
                  draft[index] = updatedData;
                }
              })
            );
            dispatch(
              apiSlice.util.updateQueryData(
                "getTask",
                arg.id.toString(),
                (draft) => updatedData
              )
            );
          }
        } catch (err) {}
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        // optimistic cache delete start
        const deleteResult = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            return draft?.filter((draftItem) => draftItem.id !== id);
          })
        );
        // optimistic cache delete end

        try {
          await queryFulfilled;
        } catch (err) {
          deleteResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetTasksQuery,
  useGetTeamsQuery,
  useChangeStatusMutation,
  useDeleteTaskMutation,
  useAddTaskMutation,
  useGetTaskQuery,
  useEditTaskMutation,
} = taskApi;
