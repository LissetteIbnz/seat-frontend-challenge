import * as React from "react";
import { fireEvent, render, RenderOptions, RenderResult } from "@testing-library/react";
import { ThemeProvider } from "./core/theme";
import { StylesProvider } from "@chakra-ui/react";

type RenderProps = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">,
) => RenderResult;

const WrapperProviders: React.FC = ({ children }) => (
  <StylesProvider value={{}}>
    <ThemeProvider>{children}</ThemeProvider>
  </StylesProvider>
);

const customRender: RenderProps = (ui, renderOptions) =>
  render(ui, { wrapper: WrapperProviders, ...renderOptions });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };

export const changeInput = (input: HTMLInputElement | HTMLTextAreaElement, value: string) =>
  fireEvent.change(input, { target: { value } });
