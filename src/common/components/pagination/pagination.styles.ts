import { chakra } from "@chakra-ui/react";

export const Wrapper = chakra("div", {
  baseStyle: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-between",

    ul: {
      display: "flex",
      alignItems: "center",
      padding: 0,
      margin: 0,
    },

    li: {
      display: "inline-block",
      marginRight: "0.5rem",
      marginLeft: "0.5rem",
      cursor: "pointer",

      a: {
        color: "gray.900",
        display: "flex",
        alignItems: "center",
        "&:hover": {
          color: "gray.700",
        },
      },

      "&.selected a": {
        fontWeight: "bold",
      },
    },
  },
});
