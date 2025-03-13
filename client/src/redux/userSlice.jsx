import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, allUsers: [], allChats: [] },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setAllChats: (state, action) => {
      state.allChats = action.payload;
    },
  },
});

export const { setUser, setAllUsers, setAllChats } = userSlice.actions;
export default userSlice.reducer;
