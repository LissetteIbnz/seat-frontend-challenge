import { Flex } from "@chakra-ui/react";

export const AppLayout: React.FC = (props) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="100vh"
    width="100%"
    paddingBlock={8}
    paddingInline={[4, "14rem"]}
    background={`linear-gradient(45deg, #4158d0, #c850c0);`}
    {...props}
  />
);
