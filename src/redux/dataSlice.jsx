import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  keyword: "",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,

  reducers: {
    createDataFunc: (state, action) => {
      state.data.push(action.payload);
    },
    sortingDataFunc: (state, action) => {
      const sortedData = [...state.data].sort((a, b) => {
        return action.payload === "asc"
          ? a.price - b.price
          : action.payload === "desc"
          ? b.price - a.price
          : 0;
      });
      state.data = sortedData;
    },
    deleteDataFunc: (state, action) => {
      state.data = state.data.filter((dt) => dt.id !== action.payload);
    },
    updateDataFunc: (state, action) => {
      state.data = state.data.map((dt) =>
        dt.id === action.payload.id ? { ...dt, ...action.payload } : dt
      );
    },
    searchDataFunc: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createDataFunc,
  deleteDataFunc,
  updateDataFunc,
  sortingDataFunc,
  searchDataFunc,
} = dataSlice.actions;

export default dataSlice.reducer;
