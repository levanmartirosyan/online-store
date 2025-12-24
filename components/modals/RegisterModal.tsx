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
  DatePicker,
} from "@heroui/react";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  MailIcon,
  PersonIcon,
  PhoneIcon,
  HomeIcon,
  MapPinIcon,
  LinkIcon,
} from "../icons/icons";
import { useState } from "react";
import MySelect from "../form-items/MySelect";
import { useForm } from "react-hook-form";
import { RegisterRequest } from "@/types/auth";

export default function RegisterModal({
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange,
  hideTrigger = false,
}: {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
}) {
  const disclosure = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const isOpen = controlledIsOpen ?? disclosure.isOpen;
  const onOpen = () => {
    if (controlledOnOpenChange) controlledOnOpenChange(true);
    else disclosure.onOpen();
  };
  const onOpenChange = controlledOnOpenChange ?? disclosure.onOpenChange;

  const genders = [
    { key: "MALE", label: "Male" },
    { key: "FEMALE", label: "Female" },
    { key: "OTHER", label: "Other" },
  ];

  const [serverError, setServerError] = useState<string | null>(null);
  const { control, handleSubmit, formState } = useForm<RegisterRequest>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      age: 0,
      address: "",
      phone: "",
      zipcode: "",
      avatar: "",
      gender: "",
    },
  });

  const { errors, isSubmitting } = formState;

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Sign Up</ModalHeader>
              <ModalBody>
                <Input
                  endContent={
                    <PersonIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                  }
                  label="First Name"
                  placeholder="Enter your first name"
                  variant="bordered"
                  type="text"
                  isRequired
                />
                <Input
                  endContent={
                    <PersonIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                  }
                  label="Last Name"
                  placeholder="Enter your last name"
                  variant="bordered"
                  type="text"
                  isRequired
                />
                <Input
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  type="email"
                  isRequired
                />
                <Input
                  className="w-full "
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-solid outline-transparent"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                />

                <DatePicker
                  label="Birth date"
                  variant="bordered"
                  showMonthAndYearPickers
                  isRequired
                />

                <Input
                  endContent={
                    <HomeIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                  }
                  label="Address"
                  placeholder="Enter your address"
                  type="text"
                  variant="bordered"
                  isRequired
                />
                <Input
                  endContent={
                    <PhoneIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                  }
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  variant="bordered"
                  minLength={9}
                  maxLength={9}
                  isRequired
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    const allowed = [
                      "Backspace",
                      "ArrowLeft",
                      "ArrowRight",
                      "Delete",
                      "Tab",
                    ];
                    if (allowed.includes(e.key)) return;
                    if (!/^[0-9]$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
                    const paste = (
                      e.clipboardData || (window as any).clipboardData
                    ).getData("text");
                    if (!/^[0-9]+$/.test(paste)) {
                      e.preventDefault();
                    }
                  }}
                />
                <Input
                  endContent={
                    <MapPinIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                  }
                  label="Zip Code"
                  placeholder="Enter your zip code"
                  type="text"
                  variant="bordered"
                  isRequired
                />
                <Input
                  endContent={
                    <LinkIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                  }
                  label="Avatar Url"
                  placeholder="Enter your avatar url"
                  type="text"
                  variant="bordered"
                  isRequired
                />
                <MySelect
                  options={genders}
                  label="Select Gender"
                  variant="bordered"
                  isRequired={true}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                    isRequired
                  >
                    Agree to terms and conditions
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
