"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";
import { MailIcon } from "../icons/icons";
import { RecoveryRequest } from "@/types/auth";
import { Controller, useForm } from "react-hook-form";

type Props = {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
  onRecoverySuccess: (recoveryBody: RecoveryRequest) => void;
};

export default function PasswordRecoveryModal({
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange,
  hideTrigger = false,
  onRecoverySuccess,
}: Props) {
  const disclosure = useDisclosure();

  const isOpen = controlledIsOpen ?? disclosure.isOpen;
  const onOpen = () => {
    if (controlledOnOpenChange) controlledOnOpenChange(true);
    else disclosure.onOpen();
  };
  const onOpenChange = controlledOnOpenChange ?? disclosure.onOpenChange;

  const { control, handleSubmit, formState, setValue, getValues } =
    useForm<RecoveryRequest>({
      defaultValues: {
        email: "",
      },
    });
  const { errors, isSubmitting } = formState;

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
                <Controller
                  control={control}
                  name="email"
                  rules={{ required: "Email is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                      }
                      label="Email"
                      variant="bordered"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-rose-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    onRecoverySuccess(getValues());
                    onClose();
                    control._reset();
                  }}
                  disabled={isSubmitting}
                >
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
