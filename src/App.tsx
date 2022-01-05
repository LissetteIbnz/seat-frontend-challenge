import { AppLayout } from "core/layouts";
import { RouterComponent } from "core/router";
import { ThemeProvider } from "core/theme";

export const App = () => {
  return (
    <ThemeProvider>
      <AppLayout>
        <RouterComponent />
      </AppLayout>
    </ThemeProvider>
  );
};
