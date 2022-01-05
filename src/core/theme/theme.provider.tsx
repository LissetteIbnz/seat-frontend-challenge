import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";

export const ThemeProvider: React.FC = ({ children }) => {
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      {children}
    </ChakraProvider>
  );
};
