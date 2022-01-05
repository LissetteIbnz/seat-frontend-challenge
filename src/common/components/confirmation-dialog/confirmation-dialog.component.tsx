import * as React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SystemStyleObject,
} from "@chakra-ui/react";

interface LabelProps {
  acceptButton: string;
  closeButton: string;
}

interface Props {
  isOpen: boolean;
  labels: LabelProps;
  onAccept: VoidFunction;
  onClose: VoidFunction;
  sx?: SystemStyleObject;
  title: string | React.ReactNode;
}

export const ConfirmationDialogComponent: React.FunctionComponent<Props> = ({
  isOpen,
  labels,
  onAccept,
  onClose,
  title,
  children,
  sx,
}) => {
  const handleAccept = () => {
    onAccept();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent sx={sx}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button onClick={onClose} variant="ghost" mr={2}>
            {labels.closeButton}
          </Button>
          <Button onClick={handleAccept} colorScheme="red">
            {labels.acceptButton}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
