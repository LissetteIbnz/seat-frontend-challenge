import * as React from "react";
import { chakra } from "@chakra-ui/react";

export const Form = (props: React.HTMLAttributes<HTMLFormElement>) => (
  <chakra.form
    width="100%"
    display="flex"
    flexDirection="column"
    maxWidth={["100%", "100%", "100%", "70%"]}
    sx={{
      background: "white",
      padding: "2rem",
      borderRadius: "md",
    }}
    {...props}
  />
);
