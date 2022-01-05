import { chakra } from "@chakra-ui/react";

export const Root = chakra("div", {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "flex-start",
  },
});
