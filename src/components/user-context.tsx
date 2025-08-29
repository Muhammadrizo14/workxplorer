"use client";
import React, { createContext, useContext } from "react";
import {UserType} from "@/src/types/user.types";

const UserContext = createContext<UserType | null>(null);

export function UserProvider({ user, children }: { user: UserType | null; children: React.ReactNode }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
