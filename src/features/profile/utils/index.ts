import type { CustomerProfileData } from "../types";

export const formatCurrency = (value: number) =>
  `${new Intl.NumberFormat("fa-IR").format(Math.round(value / 10))} تومان`;

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export const getProfileCompletion = (profile: CustomerProfileData) => {
  const hasRealEmail = !profile.user.email.endsWith("@dormire.com");
  const completed = [
    profile.user.name.trim().length >= 3,
    Boolean(profile.user.phoneNumber && profile.user.phoneNumberVerified),
    Boolean(hasRealEmail && profile.user.emailVerified),
    profile.addresses.length > 0,
  ].filter(Boolean).length;

  return completed * 25;
};

export const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
};
