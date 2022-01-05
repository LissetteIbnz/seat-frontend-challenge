import * as React from "react";
import { Tr, TableRowProps, SystemStyleObject } from "@chakra-ui/react";

interface Props extends TableRowProps {
  sx?: SystemStyleObject;
  "data-testid"?: string;
}

export const RowComponent: React.FunctionComponent<Props> = (props) => {
  return <Tr {...props} data-testid={props["data-testid"]} />;
};
