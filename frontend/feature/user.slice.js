import { createSlice } from "@reduxjs/toolkit";

// create a slice
export const userSlice = createSlice({
    name: "user",
    initialState: {
        userId: null,
    },
    reducers: {
        getUser: (state, action) => {
            state.userId = action.payload;
        },
    },
});
// export the action
export const { getUser } = userSlice.actions;

// export default the store
export default userSlice.reducer;
