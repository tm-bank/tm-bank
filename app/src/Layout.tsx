import { ReactNode } from "react";
import { ThemeProvider } from "./components/theme-provider";

export function Layout({children}: {children: ReactNode | ReactNode[]}) {
    return (
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
    )
}