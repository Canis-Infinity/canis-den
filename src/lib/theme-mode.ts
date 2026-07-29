export type ThemeMode = "light" | "dark"

export function getPreferredTheme(): ThemeMode | "none" {
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light"
  }

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark"
  }

  return "none"
}

export function getNextTheme(currentTheme: string | undefined): ThemeMode {
  if (currentTheme === "light") {
    return "dark"
  }

  if (currentTheme === "dark") {
    return "light"
  }

  const preferredTheme = getPreferredTheme()

  if (preferredTheme === "dark") {
    return "light"
  }

  return "dark"
}
