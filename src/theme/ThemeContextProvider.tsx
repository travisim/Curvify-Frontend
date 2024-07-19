import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { ReactNode, createContext, useMemo, useState } from "react";
import React from "react";

type ThemeContextType = {
  switchColorMode: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextType>({
  switchColorMode: () => {},
});

export function ThemeContextProvider({ children }: ThemeProviderProps) {
  // Initialize theme mode from localStorage or default to "light"
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode === "dark" ? "dark" : "light";
  });

  const switchColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode); // Save new mode to localStorage
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={{ switchColorMode }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
}
