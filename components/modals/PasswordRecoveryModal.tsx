"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@heroui/react";
import { LockIcon, MailIcon } from "../icons/icons";

export default function PasswordRecoveryModal({
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange,
  hideTrigger = false,
}: {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
}) {
  const disclosure = useDisclosure();

  const isOpen = controlledIsOpen ?? disclosure.isOpen;
  const onOpen = () => {
    if (controlledOnOpenChange) controlledOnOpenChange(true);
    else disclosure.onOpen();
  };
  const onOpenChange = controlledOnOpenChange ?? disclosure.onOpenChange;

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Password Recovery
              </ModalHeader>
              <ModalBody>
                <Input
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                  }
                  label="Email"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Recover
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
