import { create } from "zustand";

export const authSteps = [
  "phoneNumber",
  "password",
  "verify",
  "registration",
] as const;
export type AuthSteps = (typeof authSteps)[number];
export type AuthIntent = "registration" | "signIn";

interface AuthStoreState {
  isOpenAuthDialog: boolean;
  step: AuthSteps;
  phoneNumber: string;
  intent: AuthIntent | null;
}

export const useAuthStore = create<AuthStoreState>()((_set) => ({
  isOpenAuthDialog: false,
  step: "phoneNumber",
  phoneNumber: "",
  intent: null,
}));

export const openAuthDialog = () =>
  useAuthStore.setState({ isOpenAuthDialog: true });
export const closeAuthDialog = () =>
  useAuthStore.setState(useAuthStore.getInitialState());
export const setAuthStep = (step: AuthSteps) => useAuthStore.setState({ step });
export const setPhoneNumber = (phoneNumber: string) =>
  useAuthStore.setState({ phoneNumber });
export const setAuthIntent = (intent: AuthIntent) =>
  useAuthStore.setState({ intent });

export const resetAuth = () => {
  useAuthStore.setState(useAuthStore.getInitialState());
};
