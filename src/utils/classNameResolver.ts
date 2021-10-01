import { ThemeType } from "../types/globalTypes";

export function getClasses(prefix: string, theme: ThemeType, type?: string) {
  if (type === "icon") {
    if (prefix === "accent") {
      return theme === "dark"
        ? "purple"
        : theme === "light"
        ? "crimson"
        : "cyan";
    }
    if (prefix === "sb") {
      return theme === "dark"
        ? "purple"
        : theme === "light"
        ? "#fcfcfc"
        : "cyan";
    }
    if (prefix === "nb") {
      return theme === "dark"
        ? "#161414"
        : theme === "light"
        ? "#fcfcfc"
        : "cyan";
    }
    return theme === "dark"
      ? "#161414"
      : theme === "light"
      ? "#fcfcfc"
      : "#0B0640";
  }
  if (type === "cat") {
    return theme === "dark" ? "purple" : theme === "light" ? "magenta" : "cyan";
  }
  if (type === "btn") {
    return theme === "dark"
      ? `${prefix ? prefix + "-" : ""}accent-dark`
      : theme === "light"
      ? `${prefix ? prefix + "-" : ""}accent-light`
      : `${prefix ? prefix + "-" : ""}accent-neon`;
  }
  if (type === "text") {
    return theme === "dark"
      ? `${prefix ? prefix + "-" : ""}text-dark`
      : theme === "light"
      ? `${prefix ? prefix + "-" : ""}text-light`
      : `${prefix ? prefix + "-" : ""}text-neon`;
  }
  if (type === "neon") {
    return theme === "dark"
      ? `${prefix ? prefix + "-" : ""}primary-dark`
      : theme === "light"
      ? `${prefix ? prefix + "-" : ""}primary-light`
      : `${prefix ? prefix + "-" : ""}accent-neon`;
  }
  return theme === "dark"
    ? `${prefix ? prefix + "-" : ""}primary-dark`
    : theme === "light"
    ? `${prefix ? prefix + "-" : ""}primary-light`
    : `${prefix ? prefix + "-" : ""}primary-neon`;
}
