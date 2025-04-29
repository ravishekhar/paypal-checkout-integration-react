import { TextInputField } from "evergreen-ui";
import type { RootState } from "~/data/store";
import React from "react";
import { useAppDispatch, useAppSelector } from "~/data/hooks";
import { setUser } from "~/data/userSlice";

export default function UserEmail() {
  const userEmailAddress = useAppSelector(
    (state: RootState) => state.user.emailAddress,
  );
  const dispatch = useAppDispatch();
  return (
    <TextInputField
      label="Enter your email"
      required
      type="email"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUser(e.currentTarget.value));
      }}
      description="Your email address is required to send details about your purchase."
      placeholder="abc@example.com"
      value={userEmailAddress}
    />
  );
}
