import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * Important: DO NOT USE IN PRODUCTION
 * In this example the user's email is being persisted in Web Browser's state and Local Storage.
 * In an ideal application the user's email should be securely stored in your server side.
 * Your web application should use a secure non-enumerable identifiers to refers to the state
 */
interface UserState {
  emailAddress: string;
}
export function getPersistedEmail(): string {
  try {
    return window.localStorage.getItem("demo_app_persisted_state_email") || "";
  } catch (err) {
    return "";
  }
}

// Define the initial state using that type
const initialState: UserState = {
  emailAddress: getPersistedEmail(),
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<string>) => {
      state.emailAddress = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
