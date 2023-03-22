import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  search: "",
};

const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    addProjects: (state, action) => {
      state.projects.push(action.payload);
    },
    removeProjects: (state, action) => {
      state.projects = state.projects.filter(
        (prevStatus) => prevStatus !== action.payload
      );
    },
    addSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { addProjects, removeProjects, addSearch } = filterSlice.actions;
