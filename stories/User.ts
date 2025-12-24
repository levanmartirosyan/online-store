import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserStore = {
  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
  };
  user: User | null;
  setTokens: (tokens: {
    accessToken: string | null;
    refreshToken: string | null;
  }) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  address: string;
  phone: string;
  role: string;
  zipcode: string;
  avatar: string;
  gender: string;
  cartID: string;
  verified: boolean;
  chatIds: string[];
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      tokens: { accessToken: null, refreshToken: null },
      user: null,
      setTokens: (tokens: {
        accessToken: string | null;
        refreshToken: string | null;
      }) =>
        set(() => ({
          tokens: tokens,
        })),
      setUser: (user: User) =>
        set(() => ({
          user,
        })),
      clearUser: () =>
        set(() => ({
          user: null,
          tokens: { accessToken: null, refreshToken: null },
        })),
    }),
    { name: "user-data" }
  )
);
