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
import PasswordRecoveryModal from "./PasswordRecoveryModal";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { LogInRequest, RecoveryRequest } from "@/types/auth";

type Props = {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
  onLogInSuccess: (loginreq: LogInRequest) => void;
  onRecoverySuccess: (recoveryBody: RecoveryRequest) => void;
};

export default function LogInModal({
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange,
  hideTrigger = false,
  onLogInSuccess,
  onRecoverySuccess,
}: Props) {
  const disclosure = useDisclosure();

  const isOpen = controlledIsOpen ?? disclosure.isOpen;
  const onOpen = () => {
    if (controlledOnOpenChange) controlledOnOpenChange(true);
    else disclosure.onOpen();
  };
  const onOpenChange = controlledOnOpenChange ?? disclosure.onOpenChange;

  const [forgotOpen, setForgotOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { control, handleSubmit, formState, getValues } = useForm<LogInRequest>(
    {
      defaultValues: {
        email: "",
        password: "",
      },
    }
  );
  const { errors, isSubmitting } = formState;

  const handleOpenForgotPassword = (e?: React.MouseEvent) => {
    e?.preventDefault();
    onOpenChange(false);
    setForgotOpen(true);
  };

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
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Controller
                  control={control}
                  name="email"
                  rules={{ required: "Email is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                      }
                      label="Email"
                      variant="bordered"
                      isRequired
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-rose-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
                <Controller
                  control={control}
                  name="password"
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      endContent={
                        <LockIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                      }
                      label="Password"
                      type="password"
                      variant="bordered"
                      isRequired
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-sm text-rose-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
                {serverError && (
                  <p className="text-sm text-rose-600 mt-2">{serverError}</p>
                )}
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link
                    color="primary"
                    href="#"
                    size="sm"
                    onClick={(e) => handleOpenForgotPassword(e)}
                  >
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => onLogInSuccess(getValues())}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Log In"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <PasswordRecoveryModal
        isOpen={forgotOpen}
        onOpenChange={setForgotOpen}
        hideTrigger
        onRecoverySuccess={onRecoverySuccess}
      />
    </>
  );
}
